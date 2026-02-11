"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products, productAttributes } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { createProductSchema, updateProductSchema } from "@/lib/validations/admin.validations";

export async function createProduct(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  // Handle multi-value fields
  const images = formData.getAll("images").filter((v) => typeof v === "string" && v.trim() !== "") as string[];
  const attrKeys = Array.from(formData.keys()).filter((k) => k.startsWith("attr_"));

  const parsed = createProductSchema.safeParse({
    ...raw,
    categoryId: raw.categoryId || null,
    brandId: raw.brandId || null,
    isActive: raw.isActive === "on" || raw.isActive === "true",
    isFeatured: raw.isFeatured === "on" || raw.isFeatured === "true",
    thumbnailUrl: raw.thumbnailUrl || null,
    compareAtPrice: raw.compareAtPrice || null,
    images,
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
      .insert(products)
      .values(parsed.data)
      .returning({ id: products.id });

    // Insert product attributes
    if (attrKeys.length > 0) {
      const attrValues = attrKeys
        .map((key) => ({
          productId: row.id,
          attributeId: key.replace("attr_", ""),
          value: String(formData.get(key) ?? ""),
        }))
        .filter((a) => a.value.trim() !== "");

      if (attrValues.length > 0) {
        await db.insert(productAttributes).values(attrValues);
      }
    }

    revalidatePath("/admin/products");
    return { success: true, id: row.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create product.";
    if (message.includes("unique") || message.includes("duplicate")) {
      if (message.includes("slug")) {
        return { success: false, error: "A product with this slug already exists." };
      }
      if (message.includes("sku")) {
        return { success: false, error: "A product with this SKU already exists." };
      }
      return { success: false, error: "Duplicate value detected." };
    }
    return { success: false, error: message };
  }
}

export async function updateProduct(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const images = formData.getAll("images").filter((v) => typeof v === "string" && v.trim() !== "") as string[];
  const attrKeys = Array.from(formData.keys()).filter((k) => k.startsWith("attr_"));

  const parsed = updateProductSchema.safeParse({
    ...raw,
    categoryId: raw.categoryId || null,
    brandId: raw.brandId || null,
    isActive: raw.isActive === "on" || raw.isActive === "true",
    isFeatured: raw.isFeatured === "on" || raw.isFeatured === "true",
    thumbnailUrl: raw.thumbnailUrl || null,
    compareAtPrice: raw.compareAtPrice || null,
    images,
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
    await db.update(products).set(data).where(eq(products.id, id));

    // Re-insert product attributes (delete all + insert)
    await db.delete(productAttributes).where(eq(productAttributes.productId, id));

    if (attrKeys.length > 0) {
      const attrValues = attrKeys
        .map((key) => ({
          productId: id,
          attributeId: key.replace("attr_", ""),
          value: String(formData.get(key) ?? ""),
        }))
        .filter((a) => a.value.trim() !== "");

      if (attrValues.length > 0) {
        await db.insert(productAttributes).values(attrValues);
      }
    }

    revalidatePath("/admin/products");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update product.";
    if (message.includes("unique") || message.includes("duplicate")) {
      if (message.includes("slug")) {
        return { success: false, error: "A product with this slug already exists." };
      }
      if (message.includes("sku")) {
        return { success: false, error: "A product with this SKU already exists." };
      }
    }
    return { success: false, error: message };
  }
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  try {
    await db.delete(productAttributes).where(eq(productAttributes.productId, id));
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete product.";
    return { success: false, error: message };
  }
}

export async function toggleProductActive(id: string, isActive: boolean) {
  await requireAdmin();

  try {
    await db.update(products).set({ isActive }).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle product status.";
    return { success: false, error: message };
  }
}

export async function toggleProductFeatured(id: string, isFeatured: boolean) {
  await requireAdmin();

  try {
    await db.update(products).set({ isFeatured }).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle featured status.";
    return { success: false, error: message };
  }
}
