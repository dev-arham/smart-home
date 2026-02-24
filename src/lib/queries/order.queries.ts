import { eq, and, desc, sql, ilike, or, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import type { OrderWithItems, OrderFilters } from "@/lib/models/order.model";
import type { PaginatedResult } from "@/lib/models/product.model";

// ---------------------------------------------------------------------------
// Get order by ID (with items + address)
// ---------------------------------------------------------------------------

export async function getOrderById(
  orderId: string,
): Promise<OrderWithItems | null> {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      shippingAddress: true,
      orderItems: {
        with: {
          product: {
            columns: {
              id: true,
              name: true,
              slug: true,
              thumbnailUrl: true,
            },
          },
        },
      },
    },
  });

  return (order as unknown as OrderWithItems) ?? null;
}

// ---------------------------------------------------------------------------
// Get order by order number
// ---------------------------------------------------------------------------

export async function getOrderByOrderNumber(
  orderNumber: string,
): Promise<OrderWithItems | null> {
  const order = await db.query.orders.findFirst({
    where: eq(orders.orderNumber, orderNumber),
    with: {
      shippingAddress: true,
      orderItems: {
        with: {
          product: {
            columns: {
              id: true,
              name: true,
              slug: true,
              thumbnailUrl: true,
            },
          },
        },
      },
    },
  });

  return (order as unknown as OrderWithItems) ?? null;
}

// ---------------------------------------------------------------------------
// Get orders (paginated, filtered)
// ---------------------------------------------------------------------------

export async function getOrders(
  filters: OrderFilters,
): Promise<PaginatedResult<OrderWithItems>> {
  const { userId, status, search, page = 1, pageSize = 10 } = filters;

  const conditions: SQL[] = [];

  if (userId) {
    conditions.push(eq(orders.userId, userId));
  }
  if (status) {
    conditions.push(eq(orders.status, status));
  }
  if (search) {
    conditions.push(
      or(ilike(orders.orderNumber, `%${search}%`))!,
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ count: total }] = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(orders)
    .where(whereClause);

  const totalPages = Math.ceil(total / pageSize);
  const offset = (page - 1) * pageSize;

  if (total === 0) {
    return { data: [], total, page, pageSize, totalPages };
  }

  const orderIdRows = await db
    .select({ id: orders.id })
    .from(orders)
    .where(whereClause)
    .orderBy(desc(orders.createdAt))
    .limit(pageSize)
    .offset(offset);

  const orderIds = orderIdRows.map((r) => r.id);

  if (orderIds.length === 0) {
    return { data: [], total, page, pageSize, totalPages };
  }

  const fullOrders = await db.query.orders.findMany({
    where: sql`${orders.id} IN (${sql.join(
      orderIds.map((id) => sql`${id}`),
      sql`, `,
    )})`,
    with: {
      shippingAddress: true,
      orderItems: {
        with: {
          product: {
            columns: {
              id: true,
              name: true,
              slug: true,
              thumbnailUrl: true,
            },
          },
        },
      },
    },
  });

  // Preserve sort order from the ID query
  const idOrder = new Map(orderIds.map((id, i) => [id, i]));
  fullOrders.sort((a, b) => (idOrder.get(a.id) ?? 0) - (idOrder.get(b.id) ?? 0));

  return {
    data: fullOrders as unknown as OrderWithItems[],
    total,
    page,
    pageSize,
    totalPages,
  };
}
