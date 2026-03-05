"use client"

import { DataTable } from "@/components/admin/data-table"
import { StatusBadge } from "@/components/admin/status-badge"
import { UserActions } from "./user-actions"
import { Badge } from "@/components/ui/badge"


const columns = [
  {
    key: "name",
    header: "User",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="text-muted-foreground text-xs">{row.email}</div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    cell: (row) => (
      <Badge variant="outline" className="capitalize">
        {row?.role ?? "customer"}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    header: "Joined",
    cell: (row) => (
      <span className="text-muted-foreground text-sm">
        {new Date(row.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    cell: (row) =>
      row ? (
        <UserActions
          user={row}
          profile={row}
        />
      ) : (
        <span className="text-muted-foreground text-xs">No profile</span>
      ),
  },
]

function UsersTable({ data = [] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No users found."
    />
  )
}

export { UsersTable }
