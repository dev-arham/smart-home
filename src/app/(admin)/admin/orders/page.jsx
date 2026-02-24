import Link from "next/link"
import { getOrders } from "@/lib/queries/order.queries"
import { PageHeader } from "@/components/admin/page-header"
import { OrdersTable } from "./orders-table"
import { Card, CardContent } from "@/components/ui/card"

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const search = params?.search || ""
  const status = params?.status || undefined

  const { data: orders, total, totalPages } = await getOrders({
    page,
    search,
    status,
    pageSize: 10,
  })

  const statusFilter = status || "all"

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description={`${total} order${total !== 1 ? "s" : ""}${status ? ` (${status})` : ""}.`}
      />

      <div className="flex items-center gap-2">
        {["all", "pending", "confirmed", "delivered", "cancelled"].map((s) => (
          <Link
            key={s}
            href={`/admin/orders${s !== "all" ? `?status=${s}` : ""}${search ? `${s !== "all" ? "&" : "?"}search=${search}` : ""}`}
            className={`rounded-md px-3 py-1.5 text-sm ${
              statusFilter === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <OrdersTable data={orders} />
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/orders?page=${page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
              className="text-sm underline">
              Previous
            </Link>
          )}
          <span className="text-muted-foreground text-sm">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/admin/orders?page=${page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
              className="text-sm underline">
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
