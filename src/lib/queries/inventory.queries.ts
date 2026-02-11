import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { StockInfo } from "@/lib/models/product.model";

// ---------------------------------------------------------------------------
// Conversion helper
// ---------------------------------------------------------------------------

/**
 * Calculate the number of base units per sell unit.
 *  - "unit"   → 1
 *  - "box"    → unitsPerBox
 *  - "carton" → unitsPerBox × boxesPerCarton
 */
export function getConversionFactor(
  sellType: "unit" | "box" | "carton",
  unitsPerBox: number,
  boxesPerCarton: number
): number {
  switch (sellType) {
    case "unit":
      return 1;
    case "box":
      return unitsPerBox;
    case "carton":
      return unitsPerBox * boxesPerCarton;
  }
}

// ---------------------------------------------------------------------------
// Stock queries
// ---------------------------------------------------------------------------

/**
 * Get current stock information for a product.
 */
export async function getStockInfo(productId: string): Promise<StockInfo | null> {
  const [row] = await db
    .select({
      stockUnits: products.stockUnits,
      sellType: products.sellType,
      unitsPerBox: products.unitsPerBox,
      boxesPerCarton: products.boxesPerCarton,
      lowStockThreshold: products.lowStockThreshold,
    })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!row) return null;

  const factor = getConversionFactor(row.sellType, row.unitsPerBox, row.boxesPerCarton);
  const availableInSellUnits = Math.floor(row.stockUnits / factor);

  return {
    stockUnits: row.stockUnits,
    sellType: row.sellType,
    unitsPerBox: row.unitsPerBox,
    boxesPerCarton: row.boxesPerCarton,
    availableInSellUnits,
    isLowStock: row.stockUnits <= row.lowStockThreshold,
  };
}

// ---------------------------------------------------------------------------
// Result type for stock mutations
// ---------------------------------------------------------------------------

type StockResult = {
  success: boolean;
  remainingStockUnits: number;
  error?: string;
};

// ---------------------------------------------------------------------------
// Deduct stock (single product, transaction-safe)
// ---------------------------------------------------------------------------

/**
 * Deduct stock for a single product within a serialised transaction.
 *
 * Uses `SELECT … FOR UPDATE` to acquire a row-level lock, preventing
 * concurrent deductions from overselling. PostgreSQL MVCC ensures that
 * regular (non-locking) product reads are NOT blocked.
 *
 * The quantity is expressed in the product's configured sell type:
 *   quantity=2 on a sellType="box" with unitsPerBox=6 deducts 12 base units.
 */
export async function deductStock(
  productId: string,
  quantity: number
): Promise<StockResult> {
  if (quantity <= 0) {
    return { success: false, remainingStockUnits: 0, error: "Quantity must be positive" };
  }

  return db.transaction(async (tx) => {
    // Step 1: lock the row
    const rows = await tx.execute<{
      stock_units: number;
      sell_type: "unit" | "box" | "carton";
      units_per_box: number;
      boxes_per_carton: number;
    }>(sql`
      SELECT stock_units, sell_type, units_per_box, boxes_per_carton
      FROM products
      WHERE id = ${productId}
      FOR UPDATE
    `);

    const row = rows.rows[0];
    if (!row) {
      return { success: false, remainingStockUnits: 0, error: "Product not found" };
    }

    const stockUnits = Number(row.stock_units);
    const unitsPerBox = Number(row.units_per_box);
    const boxesPerCarton = Number(row.boxes_per_carton);
    const sellType = row.sell_type;

    // Step 2: compute deduction
    const factor = getConversionFactor(sellType, unitsPerBox, boxesPerCarton);
    const unitsToDeduct = quantity * factor;

    // Step 3: check availability
    if (unitsToDeduct > stockUnits) {
      const availableInSellUnits = Math.floor(stockUnits / factor);
      return {
        success: false,
        remainingStockUnits: stockUnits,
        error: `Insufficient stock. Requested ${quantity} ${sellType}(s) (${unitsToDeduct} units) but only ${availableInSellUnits} ${sellType}(s) (${stockUnits} units) available.`,
      };
    }

    // Step 4: deduct
    const newStockUnits = stockUnits - unitsToDeduct;

    await tx
      .update(products)
      .set({ stockUnits: newStockUnits, updatedAt: new Date() })
      .where(eq(products.id, productId));

    return { success: true, remainingStockUnits: newStockUnits };
  });
}

// ---------------------------------------------------------------------------
// Restore stock (e.g. order cancellation)
// ---------------------------------------------------------------------------

/**
 * Restore stock for a single product. Mirror of `deductStock`.
 */
export async function restoreStock(
  productId: string,
  quantity: number
): Promise<StockResult> {
  if (quantity <= 0) {
    return { success: false, remainingStockUnits: 0, error: "Quantity must be positive" };
  }

  return db.transaction(async (tx) => {
    const rows = await tx.execute<{
      stock_units: number;
      sell_type: "unit" | "box" | "carton";
      units_per_box: number;
      boxes_per_carton: number;
    }>(sql`
      SELECT stock_units, sell_type, units_per_box, boxes_per_carton
      FROM products
      WHERE id = ${productId}
      FOR UPDATE
    `);

    const row = rows.rows[0];
    if (!row) {
      return { success: false, remainingStockUnits: 0, error: "Product not found" };
    }

    const stockUnits = Number(row.stock_units);
    const unitsPerBox = Number(row.units_per_box);
    const boxesPerCarton = Number(row.boxes_per_carton);

    const factor = getConversionFactor(row.sell_type, unitsPerBox, boxesPerCarton);
    const unitsToRestore = quantity * factor;
    const newStockUnits = stockUnits + unitsToRestore;

    await tx
      .update(products)
      .set({ stockUnits: newStockUnits, updatedAt: new Date() })
      .where(eq(products.id, productId));

    return { success: true, remainingStockUnits: newStockUnits };
  });
}

// ---------------------------------------------------------------------------
// Batch deduct (cart checkout — all-or-nothing)
// ---------------------------------------------------------------------------

/**
 * Deduct stock for multiple products in a single transaction.
 *
 * If ANY item has insufficient stock, the entire transaction rolls back —
 * no partial deductions. Items are sorted by productId before locking to
 * prevent deadlocks when concurrent checkouts overlap.
 */
export async function deductStockBatch(
  items: Array<{ productId: string; quantity: number }>
): Promise<{ success: boolean; errors: Record<string, string> }> {
  if (items.length === 0) {
    return { success: true, errors: {} };
  }

  // Sort by productId for consistent lock ordering (deadlock prevention)
  const sorted = [...items].sort((a, b) => a.productId.localeCompare(b.productId));

  return db.transaction(async (tx) => {
    const errors: Record<string, string> = {};

    for (const { productId, quantity } of sorted) {
      if (quantity <= 0) {
        errors[productId] = "Quantity must be positive";
        continue;
      }

      const rows = await tx.execute<{
        stock_units: number;
        sell_type: "unit" | "box" | "carton";
        units_per_box: number;
        boxes_per_carton: number;
      }>(sql`
        SELECT stock_units, sell_type, units_per_box, boxes_per_carton
        FROM products
        WHERE id = ${productId}
        FOR UPDATE
      `);

      const row = rows.rows[0];
      if (!row) {
        errors[productId] = "Product not found";
        continue;
      }

      const stockUnits = Number(row.stock_units);
      const unitsPerBox = Number(row.units_per_box);
      const boxesPerCarton = Number(row.boxes_per_carton);

      const factor = getConversionFactor(row.sell_type, unitsPerBox, boxesPerCarton);
      const unitsToDeduct = quantity * factor;

      if (unitsToDeduct > stockUnits) {
        const available = Math.floor(stockUnits / factor);
        errors[productId] = `Insufficient stock: ${available} ${row.sell_type}(s) available`;
        continue;
      }

      await tx
        .update(products)
        .set({ stockUnits: stockUnits - unitsToDeduct, updatedAt: new Date() })
        .where(eq(products.id, productId));
    }

    // Any errors → throw to trigger full rollback
    if (Object.keys(errors).length > 0) {
      throw new BatchDeductionError(errors);
    }

    return { success: true, errors: {} };
  }).catch((err) => {
    if (err instanceof BatchDeductionError) {
      return { success: false, errors: err.errors };
    }
    throw err;
  });
}

/**
 * Custom error for batch deduction failures.
 * Thrown inside the transaction to trigger rollback, then caught outside.
 */
class BatchDeductionError extends Error {
  constructor(public errors: Record<string, string>) {
    super("Batch stock deduction failed");
    this.name = "BatchDeductionError";
  }
}
