import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { orders, orderItems, shippingAddresses } from "@/lib/db/schema";

// --- Base types ---

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

export type OrderItem = InferSelectModel<typeof orderItems>;
export type NewOrderItem = InferInsertModel<typeof orderItems>;

export type ShippingAddress = InferSelectModel<typeof shippingAddresses>;
export type NewShippingAddress = InferInsertModel<typeof shippingAddresses>;

// --- Composite types ---

export type OrderWithItems = Order & {
  shippingAddress: ShippingAddress;
  orderItems: Array<
    OrderItem & {
      product: {
        id: string;
        name: string;
        slug: string;
        thumbnailUrl: string | null;
      };
    }
  >;
};

// --- Input types for service functions ---

export type CreateOrderItemInput = {
  productId: string;
  quantity: number;
  sellType: "unit" | "box" | "carton";
};

export type CreateOrderInput = {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: CreateOrderItemInput[];
  userId?: string | null;
  notes?: string;
  shippingFee?: number;
};

// --- Action result type ---

export type OrderActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  orderId?: string;
  orderNumber?: string;
};

// --- Filters ---

export type OrderFilters = {
  userId?: string;
  status?: "pending" | "confirmed" | "delivered" | "cancelled";
  search?: string;
  page?: number;
  pageSize?: number;
};
