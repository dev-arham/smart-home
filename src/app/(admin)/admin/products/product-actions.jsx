"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { deleteProduct, toggleProductActive, toggleProductFeatured } from "@/server/admin/products"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

function ProductActions({ product }) {
  async function handleDelete() {
    const result = await deleteProduct(product.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success("Product deleted successfully.")
  }

  async function handleToggleActive(checked) {
    const result = await toggleProductActive(product.id, checked)
    if (!result.success) {
      toast.error(result.error)
    }
  }

  async function handleToggleFeatured(checked) {
    const result = await toggleProductFeatured(product.id, checked)
    if (!result.success) {
      toast.error(result.error)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/products/${product.id}/edit`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <ConfirmDialog
        trigger={
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
        title="Delete Product"
        description={`Are you sure you want to delete "${product.name}"? This will also remove all attribute values.`}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export { ProductActions }
