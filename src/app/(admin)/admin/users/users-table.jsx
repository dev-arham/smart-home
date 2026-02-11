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
        <div className="font-medium">{row.user.name}</div>
        <div className="text-muted-foreground text-xs">{row.user.email}</div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    cell: (row) => (
      <Badge variant="outline" className="capitalize">
        {row.user_profile?.role ?? "customer"}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => (
      <StatusBadge
        status={row.user_profile?.isActive !== false ? "active" : "inactive"}
      />
    ),
  },
  {
    key: "createdAt",
    header: "Joined",
    cell: (row) => (
      <span className="text-muted-foreground text-sm">
        {new Date(row.user.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    cell: (row) =>
      row.user_profile ? (
        <UserActions
          user={row.user}
          profile={row.user_profile}
        />
      ) : (
        <span className="text-muted-foreground text-xs">No profile</span>
      ),
  },
]

function UsersTable({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No users found."
    />
  )
}

export { UsersTable }
