"use client"

import { DataTable } from "@/components/admin/data-table"
import { AttributeActions } from "./attribute-actions"
import { Badge } from "@/components/ui/badge"

const DATA_TYPE_LABELS = {
  text: "Text",
  number: "Number",
  boolean: "Boolean",
  select: "Select",
}

const columns = [
  {
    key: "name",
    header: "Name",
    cell: (row) => (
      <span className="font-medium">{row.name}</span>
    ),
  },
  {
    key: "data_type",
    header: "Data Type",
    cell: (row) => (
      <Badge variant="outline">
        {DATA_TYPE_LABELS[row.data_type] || row.data_type}
      </Badge>
    ),
  },
  {
    key: "category_count",
    header: "Categories",
    className: "text-center",
    cell: (row) => (
      <span className="text-muted-foreground">{row.category_count}</span>
    ),
  },
  {
    key: "product_count",
    header: "Products",
    className: "text-center",
    cell: (row) => (
      <span className="text-muted-foreground">{row.product_count}</span>
    ),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    cell: (row) => <AttributeActions attribute={row} />,
  },
]

function AttributesTable({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No attributes found. Create your first attribute."
    />
  )
}

export { AttributesTable }
