"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { deleteCategory } from "@/server/admin/categories"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

function CategoryActions({ category }) {
  async function handleDelete() {
    const result = await deleteCategory(category.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success("Category deleted successfully.")
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/categories/${category.id}/edit`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <ConfirmDialog
        trigger={
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
        title="Delete Category"
        description={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export { CategoryActions }
