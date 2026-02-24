import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  sellType: z.enum(["unit", "box", "carton"]),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(150),
  phone: z.string().min(1, "Phone is required").max(20),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required").max(100),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional().default(""),
  shippingFee: z.coerce.number().min(0).default(250),
});

export const orderIdSchema = z.object({
  orderId: z.string().uuid(),
});

export const confirmOrderSchema = orderIdSchema;
export const cancelOrderSchema = orderIdSchema;
export const deliverOrderSchema = orderIdSchema;
