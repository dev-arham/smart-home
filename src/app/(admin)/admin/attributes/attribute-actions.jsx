"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { deleteAttribute } from "@/server/admin/attributes"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

function AttributeActions({ attribute }) {
  async function handleDelete() {
    const result = await deleteAttribute(attribute.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success("Attribute deleted successfully.")
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" className="size-8" asChild>
        <Link href={`/admin/attributes/${attribute.id}/edit`}>
          <Pencil className="size-4" />
        </Link>
      </Button>
      <ConfirmDialog
        trigger={
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <Trash2 className="size-4" />
          </Button>
        }
        title="Delete attribute?"
        description={`This will permanently delete "${attribute.name}". This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </div>
  )
}

export { AttributeActions }
