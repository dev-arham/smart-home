"use client"

import { DataTable } from "@/components/admin/data-table"
import { StatusBadge } from "@/components/admin/status-badge"
import { InventoryActions } from "./inventory-actions"

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
            className="h-8 w-8 rounded-md object-cover"
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
    key: "stockUnits",
    header: "Stock (units)",
    className: "text-center",
    cell: (row) => <span className="font-mono block text-center">{row.stockUnits}</span>,
  },
  {
    key: "sellType",
    header: "Sell Type",
    className: "text-center",
    cell: (row) => <span className="capitalize block text-center">{row.sellType}</span>,
  },
  {
    key: "conversion",
    header: "Conversion",
    className: "text-center",
    cell: (row) => {
      if (row.sellType === "unit") return <span className="block text-center">-</span>
      if (row.sellType === "box") return <span className="block text-center">{row.unitsPerBox} u/box</span>
      return <span className="block text-center">{row.unitsPerBox} u/box, {row.boxesPerCarton} b/ctn</span>
    },
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => {
      if (row.stockUnits === 0) return <StatusBadge status="out-of-stock" />
      if (row.stockUnits <= row.lowStockThreshold) return <StatusBadge status="low-stock" />
      return <StatusBadge status="in-stock" />
    },
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    cell: (row) => <InventoryActions product={row} />,
  },
]

function InventoryTable({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No products in inventory."
    />
  )
}

export { InventoryTable }
