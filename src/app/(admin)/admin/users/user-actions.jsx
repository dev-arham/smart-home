"use client"

import { useTransition } from "react"
import { toast } from "sonner"

import { updateUserRole } from "@/server/admin/users"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function UserActions({ user, profile }) {
  const [isPending, startTransition] = useTransition()

  function handleRoleChange(newRole) {
    const formData = new FormData()
    formData.set("profileId", profile.id)
    formData.set("role", newRole)

    startTransition(async () => {
      const result = await updateUserRole(null, formData)
      if (result.success) {
        toast.success(`Role updated to ${newRole}`)
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Select
        defaultValue={profile.role}
        onValueChange={handleRoleChange}
        disabled={isPending}>
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="customer">Customer</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export { UserActions }
