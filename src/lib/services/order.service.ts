import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  orders,
  orderItems,
  shippingAddresses,
  products,
  user,
} from "@/lib/db/schema";
import { getConversionFactor } from "@/lib/queries/inventory.queries";
import { generateOrderNumber } from "@/lib/utils/order-number";
import type {
  CreateOrderInput,
  OrderActionResult,
} from "@/lib/models/order.model";

/**
 * Extract a human-readable message from drizzle/pg errors.
 * Drizzle wraps the original pg DatabaseError in `cause`.
 */
function extractDbError(err: unknown, fallback: string): string {
  if (err instanceof Error) {
    // drizzle-orm stores the original pg error in .cause
    const cause = (err as Error & { cause?: Error }).cause;
    if (cause?.message) return cause.message;

    // If the message looks like a raw query dump, return the fallback instead
    if (err.message.startsWith("Failed query:")) return fallback;
    return err.message;
  }
  return fallback;
}

// ---------------------------------------------------------------------------
// createOrder — pending, no stock deduction
// ---------------------------------------------------------------------------

export async function createOrder(
  input: CreateOrderInput,
): Promise<OrderActionResult> {
  const {
    customerName,
    phone,
    address,
    city,
    items,
    userId = null,
    notes = "",
    shippingFee = 250,
  } = input;

  return db
    .transaction(async (tx) => {
      // Verify userId exists in the user table before using it as a FK
      let verifiedUserId: string | null = null;
      if (userId) {
        const [existingUser] = await tx
          .select({ id: user.id })
          .from(user)
          .where(eq(user.id, userId))
          .limit(1);
        verifiedUserId = existingUser ? existingUser.id : null;
      }

      // Step 1: Create shipping address
      const [shippingAddr] = await tx
        .insert(shippingAddresses)
        .values({ userId: verifiedUserId, customerName, phone, address, city })
        .returning({ id: shippingAddresses.id });

      // Step 2: Snapshot product data and compute line totals
      const sortedItems = [...items].sort((a, b) =>
        a.productId.localeCompare(b.productId),
      );

      let subtotal = 0;
      const itemValues: Array<{
        orderId: string;
        productId: string;
        sellType: "unit" | "box" | "carton";
        quantity: number;
        unitPrice: string;
        snapshotUnitsPerBox: number;
        snapshotBoxesPerCarton: number;
        lineTotal: string;
      }> = [];

      for (const item of sortedItems) {
        const [product] = await tx
          .select({
            id: products.id,
            price: products.price,
            isActive: products.isActive,
            unitsPerBox: products.unitsPerBox,
            boxesPerCarton: products.boxesPerCarton,
            stockUnits: products.stockUnits,
          })
          .from(products)
          .where(eq(products.id, item.productId))
          .limit(1);

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        if (!product.isActive) {
          throw new Error(`Product is not available: ${item.productId}`);
        }

        const basePrice = Number(product.price);
        const factor = getConversionFactor(
          item.sellType,
          product.unitsPerBox,
          product.boxesPerCarton,
        );
        const unitPrice = basePrice * factor;
        const lineTotal = unitPrice * item.quantity;

        // Soft availability check (real deduction happens on confirm)
        const availableUnits = Math.floor(product.stockUnits / factor);
        if (item.quantity > availableUnits) {
          throw new Error(
            `Insufficient stock for product ${item.productId}: ` +
              `requested ${item.quantity} ${item.sellType}(s), ` +
              `available ${availableUnits}`,
          );
        }

        subtotal += lineTotal;

        itemValues.push({
          orderId: "", // placeholder — set after order insert
          productId: item.productId,
          sellType: item.sellType,
          quantity: item.quantity,
          unitPrice: unitPrice.toFixed(2),
          snapshotUnitsPerBox: product.unitsPerBox,
          snapshotBoxesPerCarton: product.boxesPerCarton,
          lineTotal: lineTotal.toFixed(2),
        });
      }

      const totalAmount = subtotal + shippingFee;

      // Step 3: Insert order (retry once on order-number collision)
      let orderNumber = generateOrderNumber();
      let orderRow: { id: string; orderNumber: string };

      try {
        [orderRow] = await tx
          .insert(orders)
          .values({
            orderNumber,
            userId: verifiedUserId,
            shippingAddressId: shippingAddr.id,
            status: "pending",
            subtotal: subtotal.toFixed(2),
            shippingFee: shippingFee.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
            notes: notes || null,
          })
          .returning({ id: orders.id, orderNumber: orders.orderNumber });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "";
        if (message.includes("unique") || message.includes("duplicate")) {
          orderNumber = generateOrderNumber();
          [orderRow] = await tx
            .insert(orders)
            .values({
              orderNumber,
              userId: verifiedUserId,
              shippingAddressId: shippingAddr.id,
              status: "pending",
              subtotal: subtotal.toFixed(2),
              shippingFee: shippingFee.toFixed(2),
              totalAmount: totalAmount.toFixed(2),
              notes: notes || null,
            })
            .returning({ id: orders.id, orderNumber: orders.orderNumber });
        } else {
          throw err;
        }
      }

      // Step 4: Insert order items
      await tx.insert(orderItems).values(
        itemValues.map((v) => ({ ...v, orderId: orderRow.id })),
      );

      return {
        success: true as const,
        orderId: orderRow.id,
        orderNumber: orderRow.orderNumber,
      };
    })
    .catch((err) => {
      const message = extractDbError(err, "Failed to create order.");
      return { success: false as const, error: message };
    });
}

// ---------------------------------------------------------------------------
// confirmOrder — deduct stock
// ---------------------------------------------------------------------------

export async function confirmOrder(
  orderId: string,
): Promise<OrderActionResult> {
  return db
    .transaction(async (tx) => {
      // Step 1: Lock order row
      const orderRows = await tx.execute<{
        id: string;
        status: string;
      }>(sql`
        SELECT id, status
        FROM orders
        WHERE id = ${orderId}
        FOR UPDATE
      `);

      const order = orderRows.rows[0];
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.status !== "pending") {
        throw new Error(
          `Cannot confirm order: current status is "${order.status}", expected "pending"`,
        );
      }

      // Step 2: Fetch order items (sorted by product_id for deadlock prevention)
      const itemRows = await tx.execute<{
        id: string;
        product_id: string;
        sell_type: "unit" | "box" | "carton";
        quantity: number;
        snapshot_units_per_box: number;
        snapshot_boxes_per_carton: number;
      }>(sql`
        SELECT id, product_id, sell_type, quantity,
               snapshot_units_per_box, snapshot_boxes_per_carton
        FROM order_items
        WHERE order_id = ${orderId}
        ORDER BY product_id
      `);

      // Step 3: Deduct stock for each item
      for (const item of itemRows.rows) {
        const productRows = await tx.execute<{
          stock_units: number;
        }>(sql`
          SELECT stock_units
          FROM products
          WHERE id = ${item.product_id}
          FOR UPDATE
        `);

        const product = productRows.rows[0];
        if (!product) {
          throw new Error(`Product not found: ${item.product_id}`);
        }

        const factor = getConversionFactor(
          item.sell_type,
          Number(item.snapshot_units_per_box),
          Number(item.snapshot_boxes_per_carton),
        );
        const unitsToDeduct = Number(item.quantity) * factor;
        const currentStock = Number(product.stock_units);

        if (unitsToDeduct > currentStock) {
          const available = Math.floor(currentStock / factor);
          throw new Error(
            `Insufficient stock for product ${item.product_id}: ` +
              `need ${unitsToDeduct} units, have ${currentStock} ` +
              `(${available} ${item.sell_type}(s) available)`,
          );
        }

        await tx
          .update(products)
          .set({
            stockUnits: currentStock - unitsToDeduct,
            updatedAt: new Date(),
          })
          .where(eq(products.id, item.product_id));
      }

      // Step 4: Update order status
      await tx
        .update(orders)
        .set({ status: "confirmed", updatedAt: new Date() })
        .where(eq(orders.id, orderId));

      return { success: true as const, orderId };
    })
    .catch((err) => {
      const message = extractDbError(err, "Failed to confirm order.");
      return { success: false as const, error: message };
    });
}

// ---------------------------------------------------------------------------
// cancelOrder — restore stock if was confirmed
// ---------------------------------------------------------------------------

export async function cancelOrder(
  orderId: string,
): Promise<OrderActionResult> {
  return db
    .transaction(async (tx) => {
      // Step 1: Lock order row
      const orderRows = await tx.execute<{
        id: string;
        status: string;
      }>(sql`
        SELECT id, status
        FROM orders
        WHERE id = ${orderId}
        FOR UPDATE
      `);

      const order = orderRows.rows[0];
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.status !== "pending" && order.status !== "confirmed") {
        throw new Error(
          `Cannot cancel order: current status is "${order.status}". ` +
            `Only pending or confirmed orders can be cancelled.`,
        );
      }

      const wasConfirmed = order.status === "confirmed";

      // Step 2: Restore stock if order was confirmed
      if (wasConfirmed) {
        const itemRows = await tx.execute<{
          product_id: string;
          sell_type: "unit" | "box" | "carton";
          quantity: number;
          snapshot_units_per_box: number;
          snapshot_boxes_per_carton: number;
        }>(sql`
          SELECT product_id, sell_type, quantity,
                 snapshot_units_per_box, snapshot_boxes_per_carton
          FROM order_items
          WHERE order_id = ${orderId}
          ORDER BY product_id
        `);

        for (const item of itemRows.rows) {
          const productRows = await tx.execute<{
            stock_units: number;
          }>(sql`
            SELECT stock_units
            FROM products
            WHERE id = ${item.product_id}
            FOR UPDATE
          `);

          const product = productRows.rows[0];
          if (!product) {
            throw new Error(
              `Product not found during stock restore: ${item.product_id}`,
            );
          }

          const factor = getConversionFactor(
            item.sell_type,
            Number(item.snapshot_units_per_box),
            Number(item.snapshot_boxes_per_carton),
          );
          const unitsToRestore = Number(item.quantity) * factor;
          const newStock = Number(product.stock_units) + unitsToRestore;

          await tx
            .update(products)
            .set({ stockUnits: newStock, updatedAt: new Date() })
            .where(eq(products.id, item.product_id));
        }
      }

      // Step 3: Update order status
      await tx
        .update(orders)
        .set({ status: "cancelled", updatedAt: new Date() })
        .where(eq(orders.id, orderId));

      return { success: true as const, orderId };
    })
    .catch((err) => {
      const message = extractDbError(err, "Failed to cancel order.");
      return { success: false as const, error: message };
    });
}

// ---------------------------------------------------------------------------
// markOrderDelivered
// ---------------------------------------------------------------------------

export async function markOrderDelivered(
  orderId: string,
): Promise<OrderActionResult> {
  return db
    .transaction(async (tx) => {
      const orderRows = await tx.execute<{
        id: string;
        status: string;
      }>(sql`
        SELECT id, status
        FROM orders
        WHERE id = ${orderId}
        FOR UPDATE
      `);

      const order = orderRows.rows[0];
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.status !== "confirmed") {
        throw new Error(
          `Cannot mark as delivered: current status is "${order.status}", expected "confirmed"`,
        );
      }

      await tx
        .update(orders)
        .set({ status: "delivered", updatedAt: new Date() })
        .where(eq(orders.id, orderId));

      return { success: true as const, orderId };
    })
    .catch((err) => {
      const message = extractDbError(err, "Failed to mark order as delivered.");
      return { success: false as const, error: message };
    });
}
