"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { adjustStockSchema } from "@/lib/validations/admin.validations";

/**
 * Adjust stock for a single product using SELECT ... FOR UPDATE
 * to prevent concurrent modification issues.
 */
export async function adjustStock(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = adjustStockSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { productId, newStockUnits } = parsed.data;

  try {
    await db.transaction(async (tx) => {
      // Lock the row
      await tx.execute(sql`
        SELECT id FROM products WHERE id = ${productId} FOR UPDATE
      `);

      // Set absolute stock value
      await tx
        .update(products)
        .set({ stockUnits: newStockUnits, updatedAt: new Date() })
        .where(eq(products.id, productId));
    });

    revalidatePath("/admin/inventory");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to adjust stock.";
    return { success: false, error: message };
  }
}
