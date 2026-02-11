"use client"

import { DataTable } from "@/components/admin/data-table"
import { StatusBadge } from "@/components/admin/status-badge"
import { ProductActions } from "./product-actions"

const columns = [
  {
    key: "name",
    header: "Product",
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.thumbnailUrl && (
          <img
            src={row.thumbnailUrl}
            alt={row.name}
            className="h-10 w-10 rounded-md object-cover"
          />
        )}
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-muted-foreground text-xs">{row.sku}</div>
        </div>
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    cell: (row) => row.category?.name ?? "-",
  },
  {
    key: "brand",
    header: "Brand",
    cell: (row) => row.brand?.name ?? "-",
  },
  {
    key: "price",
    header: "Price",
    className: "text-right",
    cell: (row) => (
      <span className="font-mono">R{Number(row.price).toFixed(2)}</span>
    ),
  },
  {
    key: "stockUnits",
    header: "Stock",
    className: "text-center",
    cell: (row) => (
      <div className="text-center">
        <span className="font-mono">{row.stockUnits}</span>
        {row.stockUnits <= row.lowStockThreshold && (
          <StatusBadge
            status={row.stockUnits === 0 ? "out-of-stock" : "low-stock"}
            className="ml-2"
          />
        )}
      </div>
    ),
  },
  {
    key: "isActive",
    header: "Status",
    cell: (row) => <StatusBadge status={row.isActive ? "active" : "inactive"} />,
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    cell: (row) => <ProductActions product={row} />,
  },
]

function ProductsTable({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No products found. Create your first product."
    />
  )
}

export { ProductsTable }
