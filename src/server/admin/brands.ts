"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { brands, products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { createBrandSchema, updateBrandSchema } from "@/lib/validations/admin.validations";

export async function createBrand(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = createBrandSchema.safeParse({
    ...raw,
    isActive: raw.isActive === "on" || raw.isActive === "true",
    logoUrl: raw.logoUrl || null,
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
      .insert(brands)
      .values(parsed.data)
      .returning({ id: brands.id });

    revalidatePath("/admin/brands");
    return { success: true, id: row.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create brand.";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "A brand with this slug already exists." };
    }
    return { success: false, error: message };
  }
}

export async function updateBrand(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = updateBrandSchema.safeParse({
    ...raw,
    isActive: raw.isActive === "on" || raw.isActive === "true",
    logoUrl: raw.logoUrl || null,
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
    await db.update(brands).set(data).where(eq(brands.id, id));
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update brand.";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "A brand with this slug already exists." };
    }
    return { success: false, error: message };
  }
}

export async function deleteBrand(id: string) {
  await requireAdmin();

  try {
    const [usage] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(products)
      .where(eq(products.brandId, id));

    if (usage.count > 0) {
      return {
        success: false,
        error: `Cannot delete: brand has ${usage.count} product(s).`,
      };
    }

    await db.delete(brands).where(eq(brands.id, id));
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete brand.";
    return { success: false, error: message };
  }
}
