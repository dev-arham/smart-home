"use server";

import { eq, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { attributes, categoryAttributes, productAttributes } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/admin";

// ── Validation helpers ────────────────────────────────────────────────

const DATA_TYPES = ["text", "number", "boolean", "select"] as const;

function validateAttribute(raw: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const name = String(raw.name ?? "").trim();
  const dataType = String(raw.dataType ?? "").trim();

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!DATA_TYPES.includes(dataType as (typeof DATA_TYPES)[number])) {
    errors.dataType = "Please select a valid data type.";
  }
  return {
    errors,
    data: { name, dataType },
    valid: Object.keys(errors).length === 0,
  };
}

// ── Create ────────────────────────────────────────────────────────────

export async function createAttribute(
  _prevState: unknown,
  formData: FormData
) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const { errors, data, valid } = validateAttribute(raw);

  if (!valid) {
    return { success: false, errors };
  }

  try {
    const [row] = await db
      .insert(attributes)
      .values({ name: data.name, dataType: data.dataType })
      .returning({ id: attributes.id });

    revalidatePath("/admin/attributes");
    return { success: true, id: row.id };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create attribute.";
    return { success: false, error: message };
  }
}

// ── Update ────────────────────────────────────────────────────────────

export async function updateAttribute(
  _prevState: unknown,
  formData: FormData
) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const id = String(raw.id ?? "").trim();
  const { errors, data, valid } = validateAttribute(raw);

  if (!id) {
    return { success: false, error: "Missing attribute ID." };
  }
  if (!valid) {
    return { success: false, errors };
  }

  try {
    await db
      .update(attributes)
      .set({ name: data.name, dataType: data.dataType, updatedAt: new Date() })
      .where(eq(attributes.id, id));

    revalidatePath("/admin/attributes");
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update attribute.";
    return { success: false, error: message };
  }
}

// ── Delete ────────────────────────────────────────────────────────────

export async function deleteAttribute(id: string) {
  await requireAdmin();

  try {
    // Check if the attribute is used by any products
    const [usage] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(productAttributes)
      .where(eq(productAttributes.attributeId, id));

    if (usage.count > 0) {
      return {
        success: false,
        error: `Cannot delete: attribute is used by ${usage.count} product(s).`,
      };
    }

    await db.delete(attributes).where(eq(attributes.id, id));
    revalidatePath("/admin/attributes");
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete attribute.";
    return { success: false, error: message };
  }
}

// ── Assign attribute to category ──────────────────────────────────────

export async function assignAttributeToCategory(
  _prevState: unknown,
  formData: FormData
) {
  await requireAdmin();

  const attributeId = String(formData.get("attributeId") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const isRequired = formData.get("isRequired") === "on";

  if (!attributeId || !categoryId) {
    return { success: false, error: "Attribute and category are required." };
  }

  try {
    await db
      .insert(categoryAttributes)
      .values({ attributeId, categoryId, isRequired });

    revalidatePath("/admin/attributes");
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to assign attribute.";
    // Handle unique constraint violation
    if (message.includes("unique") || message.includes("duplicate")) {
      return {
        success: false,
        error: "This attribute is already assigned to the selected category.",
      };
    }
    return { success: false, error: message };
  }
}

// ── Remove attribute from category ────────────────────────────────────

export async function removeAttributeFromCategory(
  attributeId: string,
  categoryId: string
) {
  await requireAdmin();

  try {
    await db
      .delete(categoryAttributes)
      .where(
        and(
          eq(categoryAttributes.attributeId, attributeId),
          eq(categoryAttributes.categoryId, categoryId)
        )
      );

    revalidatePath("/admin/attributes");
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to remove assignment.";
    return { success: false, error: message };
  }
}
