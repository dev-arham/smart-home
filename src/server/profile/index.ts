"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateProfileSchema } from "@/lib/validations/admin.validations";
import { headers } from "next/headers";

/**
 * Get the current user's profile.
 * Creates a profile row if one doesn't exist yet (for users who signed up before profiles were added).
 */
export async function getProfile() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) return null;
  return session.user;
}

export async function updateProfile(_prevState: unknown, formData: FormData) {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    return { success: false, error: "Not authenticated." };
  }

  const raw = {
    fullName: formData.get("fullName") as string,
    phone: formData.get("phone") as string,
    avatarUrl: formData.get("avatarUrl") as string,
    marketingOptIn: formData.get("marketingOptIn") as string,
  };

  const parsed = updateProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const userId = session.user.id;

  // TODO: implement update user

  // Upsert: update if exists, create if not
  // const [existing] = await db
  //   .select({ id: userProfile.id })
  //   .from(userProfile)
  //   .where(eq(userProfile.userId, userId))
  //   .limit(1);

  // if (existing) {
  //   await db
  //     .update(userProfile)
  //     .set({
  //       fullName: parsed.data.fullName,
  //       phone: parsed.data.phone || null,
  //       avatarUrl: parsed.data.avatarUrl || null,
  //       marketingOptIn: parsed.data.marketingOptIn,
  //       updatedAt: new Date(),
  //     })
  //     .where(eq(userProfile.userId, userId));
  // } else {
  //   await db.insert(userProfile).values({
  //     userId,
  //     fullName: parsed.data.fullName,
  //     phone: parsed.data.phone || null,
  //     avatarUrl: parsed.data.avatarUrl || null,
  //     marketingOptIn: parsed.data.marketingOptIn,
  //   });
  // }

  revalidatePath("/profile");
  return { success: true };
}
