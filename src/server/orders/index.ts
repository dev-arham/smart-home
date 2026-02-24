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
import { auth } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Place order (guest or authenticated)
// ---------------------------------------------------------------------------

export async function placeOrder(_prevState: unknown, formData: FormData) {
  const session = await auth.getSession();
  const userId = session?.data?.user?.id ?? null;
  console.log("user id ",userId)

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
