"use client"

import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import { adjustStock } from "@/server/admin/inventory"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { useState } from "react"

function StockAdjustDialog({ product, trigger }) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(adjustStock, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(`Stock updated for ${product.name}`)
      setOpen(false)
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state, product.name])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
          <DialogDescription>
            Set the new stock quantity for <strong>{product.name}</strong> (SKU: {product.sku}).
            Current stock: <strong>{product.stockUnits}</strong> units.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="productId" value={product.id} />
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newStockUnits">New Stock (base units)</Label>
              <Input
                id="newStockUnits"
                name="newStockUnits"
                type="number"
                min="0"
                defaultValue={product.stockUnits}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Stock"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { StockAdjustDialog }
