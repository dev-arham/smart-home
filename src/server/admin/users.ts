"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { userProfile } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { updateUserRoleSchema, toggleUserActiveSchema } from "@/lib/validations/admin.validations";

export async function updateUserRole(_prevState: unknown, formData: FormData) {
  const admin = await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = updateUserRoleSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { profileId, role } = parsed.data;

  // Guard: can't change own role
  const profile = await db.query.userProfile.findFirst({
    where: eq(userProfile.id, profileId),
  });

  if (profile?.userId === admin.userId) {
    return { success: false, error: "You cannot change your own role." };
  }

  try {
    await db
      .update(userProfile)
      .set({ role, updatedAt: new Date() })
      .where(eq(userProfile.id, profileId));

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update role.";
    return { success: false, error: message };
  }
}

export async function toggleUserActive(profileId: string, isActive: boolean) {
  const admin = await requireAdmin();

  // Guard: can't deactivate self
  const profile = await db.query.userProfile.findFirst({
    where: eq(userProfile.id, profileId),
  });

  if (profile?.userId === admin.userId) {
    return { success: false, error: "You cannot deactivate your own account." };
  }

  try {
    await db
      .update(userProfile)
      .set({ isActive, updatedAt: new Date() })
      .where(eq(userProfile.id, profileId));

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle user status.";
    return { success: false, error: message };
  }
}
