"use client"

import { DataTable } from "@/components/admin/data-table"
import { StatusBadge } from "@/components/admin/status-badge"
import { BrandActions } from "./brand-actions"

const columns = [
  {
    key: "name",
    header: "Name",
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.logo_url && (
          <img
            src={row.logo_url}
            alt={row.name}
            className="h-8 w-8 rounded-md object-cover"
          />
        )}
        <span className="font-medium">{row.name}</span>
      </div>
    ),
  },
  { key: "slug", header: "Slug" },
  {
    key: "product_count",
    header: "Products",
    className: "text-center",
    cell: (row) => <span className="text-center block">{row.product_count}</span>,
  },
  {
    key: "is_active",
    header: "Status",
    cell: (row) => (
      <StatusBadge status={row.is_active ? "active" : "inactive"} />
    ),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    cell: (row) => <BrandActions brand={row} />,
  },
]

function BrandsTable({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No brands found. Create your first brand."
    />
  )
}

export { BrandsTable }
