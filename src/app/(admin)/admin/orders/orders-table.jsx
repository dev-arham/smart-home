"use client"

import Link from "next/link"
import { DataTable } from "@/components/admin/data-table"
import { StatusBadge } from "@/components/admin/status-badge"
import { OrderActions } from "./order-actions"

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const columns = [
  {
    key: "orderNumber",
    header: "Order",
    cell: (row) => (
      <Link
        href={`/admin/orders/${row.id}`}
        className="font-medium text-primary hover:underline">
        {row.orderNumber}
      </Link>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.shippingAddress?.customerName}</div>
        <div className="text-muted-foreground text-xs">{row.shippingAddress?.phone}</div>
      </div>
    ),
  },
  {
    key: "items",
    header: "Items",
    className: "text-center",
    cell: (row) => (
      <span className="font-mono">{row.orderItems?.length ?? 0}</span>
    ),
  },
  {
    key: "totalAmount",
    header: "Total",
    className: "text-right",
    cell: (row) => (
      <span className="font-mono">Rs {Number(row.totalAmount).toLocaleString()}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "createdAt",
    header: "Date",
    cell: (row) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.createdAt)}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    cell: (row) => <OrderActions order={row} />,
  },
]

function OrdersTable({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No orders found."
    />
  )
}

export { OrdersTable }
