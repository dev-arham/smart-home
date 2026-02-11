"use client"

import { DataTable } from "@/components/admin/data-table"
import { StatusBadge } from "@/components/admin/status-badge"
import { CategoryActions } from "./category-actions"

const columns = [
  {
    key: "name",
    header: "Name",
    cell: (row) => (
      <div style={{ paddingLeft: `${(row.depth || 0) * 24}px` }}>
        <span className="font-medium">{row.name}</span>
        {row.parent_name && (
          <span className="text-muted-foreground text-xs ml-2">
            ({row.parent_name})
          </span>
        )}
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
    key: "sort_order",
    header: "Order",
    className: "text-center",
    cell: (row) => <span className="text-center block">{row.sort_order}</span>,
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
    cell: (row) => <CategoryActions category={row} />,
  },
]

function CategoriesTable({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No categories found. Create your first category."
    />
  )
}

export { CategoriesTable }
