"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import {
  createOrderSchema,
  confirmOrderSchema,
  cancelOrderSchema,
  deliverOrderSchema,
} from "@/lib/validations/order.validations";
import {
  createOrder as createOrderService,
  confirmOrder as confirmOrderService,
  cancelOrder as cancelOrderService,
  markOrderDelivered as markOrderDeliveredService,
} from "@/lib/services/order.service";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { headers } from "next/headers";

// ---------------------------------------------------------------------------
// Place order (guest or authenticated)
// ---------------------------------------------------------------------------

export async function placeOrder(_prevState: unknown, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const sessionUser = session?.user ?? null;
  let userId: string | null = null;

  if (sessionUser?.id && sessionUser?.email) {
    // Try to insert the Neon Auth user into our local user table.
    // onConflictDoNothing handles conflicts on BOTH the id PK and the email
    // unique constraint, so the insert silently fails when the same email
    // already exists with a different id (e.g. from the old auth system).
    const [inserted] = await db
      .insert(user)
      .values({
        id: sessionUser.id,
        name: sessionUser.name ?? sessionUser.email,
        email: sessionUser.email,
      })
      .onConflictDoNothing()
      .returning({ id: user.id });

    if (inserted) {
      // New row was created — use the Neon Auth id directly
      userId = inserted.id;
    } else {
      // Conflict: the email (or id) already exists with a different key.
      // Look up the existing user by email so the order is linked correctly.
      const [existing] = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.email, sessionUser.email))
        .limit(1);

      userId = existing?.id ?? null;
    }
  }

  let items;
  try {
    items = JSON.parse(formData.get("items") as string);
  } catch {
    return { success: false, error: "Invalid items data." };
  }

  const raw = {
    customerName: formData.get("customerName") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    notes: (formData.get("notes") as string) || "",
    shippingFee: formData.get("shippingFee") || "250",
    items,
  };

  const parsed = createOrderSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await createOrderService({
    ...parsed.data,
    userId,
  });

  if (result.success) {
    revalidatePath("/orders");
    revalidatePath("/admin/orders");
  }

  return result;
}

// ---------------------------------------------------------------------------
// Admin: Confirm order
// ---------------------------------------------------------------------------

export async function confirmOrder(orderId: string) {
  await requireAdmin();

  const parsed = confirmOrderSchema.safeParse({ orderId });
  if (!parsed.success) {
    return { success: false, error: "Invalid order ID." };
  }

  const result = await confirmOrderService(parsed.data.orderId);

  if (result.success) {
    revalidatePath("/admin/orders");
    revalidatePath("/admin/inventory");
  }

  return result;
}

// ---------------------------------------------------------------------------
// Admin: Cancel order
// ---------------------------------------------------------------------------

export async function cancelOrder(orderId: string) {
  await requireAdmin();

  const parsed = cancelOrderSchema.safeParse({ orderId });
  if (!parsed.success) {
    return { success: false, error: "Invalid order ID." };
  }

  const result = await cancelOrderService(parsed.data.orderId);

  if (result.success) {
    revalidatePath("/admin/orders");
    revalidatePath("/admin/inventory");
  }

  return result;
}

// ---------------------------------------------------------------------------
// Admin: Mark delivered
// ---------------------------------------------------------------------------

export async function markDelivered(orderId: string) {
  await requireAdmin();

  const parsed = deliverOrderSchema.safeParse({ orderId });
  if (!parsed.success) {
    return { success: false, error: "Invalid order ID." };
  }

  const result = await markOrderDeliveredService(parsed.data.orderId);

  if (result.success) {
    revalidatePath("/admin/orders");
  }

  return result;
}
