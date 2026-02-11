"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { createCategorySchema, updateCategorySchema } from "@/lib/validations/admin.validations";

export async function createCategory(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = createCategorySchema.safeParse({
    ...raw,
    parentId: raw.parentId || null,
    isActive: raw.isActive === "on" || raw.isActive === "true",
    imageUrl: raw.imageUrl || null,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const [row] = await db
      .insert(categories)
      .values(parsed.data)
      .returning({ id: categories.id });

    revalidatePath("/admin/categories");
    return { success: true, id: row.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create category.";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "A category with this slug already exists." };
    }
    return { success: false, error: message };
  }
}

export async function updateCategory(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = updateCategorySchema.safeParse({
    ...raw,
    parentId: raw.parentId || null,
    isActive: raw.isActive === "on" || raw.isActive === "true",
    imageUrl: raw.imageUrl || null,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = parsed.data;

  try {
    await db.update(categories).set(data).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update category.";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "A category with this slug already exists." };
    }
    return { success: false, error: message };
  }
}

export async function deleteCategory(id: string) {
  await requireAdmin();

  try {
    // Guard 1: Check for child categories
    const [children] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(categories)
      .where(eq(categories.parentId, id));

    if (children.count > 0) {
      return {
        success: false,
        error: `Cannot delete: category has ${children.count} subcategory(ies). Remove them first.`,
      };
    }

    // Guard 2: Check for products
    const [prods] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(products)
      .where(eq(products.categoryId, id));

    if (prods.count > 0) {
      return {
        success: false,
        error: `Cannot delete: category has ${prods.count} product(s). Move them first.`,
      };
    }

    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete category.";
    return { success: false, error: message };
  }
}
