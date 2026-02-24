"use client"

import { Check, X, Truck } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import {
  confirmOrder,
  cancelOrder,
  markDelivered,
} from "@/server/orders"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

function OrderDetailActions({ order }) {
  const router = useRouter()

  async function handleConfirm() {
    const result = await confirmOrder(order.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success("Order confirmed. Stock has been deducted.")
    router.refresh()
  }

  async function handleCancel() {
    const result = await cancelOrder(order.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success(
      order.status === "confirmed"
        ? "Order cancelled. Stock has been restored."
        : "Order cancelled."
    )
    router.refresh()
  }

  async function handleDeliver() {
    const result = await markDelivered(order.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success("Order marked as delivered.")
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      {order.status === "pending" && (
        <ConfirmDialog
          trigger={
            <Button variant="default" size="sm">
              <Check className="mr-1 h-4 w-4" />
              Confirm
            </Button>
          }
          title="Confirm Order"
          description={`Confirm order ${order.orderNumber}? Stock will be deducted for all items.`}
          confirmLabel="Confirm"
          destructive={false}
          onConfirm={handleConfirm}
        />
      )}

      {order.status === "confirmed" && (
        <ConfirmDialog
          trigger={
            <Button variant="default" size="sm">
              <Truck className="mr-1 h-4 w-4" />
              Mark Delivered
            </Button>
          }
          title="Mark as Delivered"
          description={`Mark order ${order.orderNumber} as delivered?`}
          confirmLabel="Deliver"
          destructive={false}
          onConfirm={handleDeliver}
        />
      )}

      {(order.status === "pending" || order.status === "confirmed") && (
        <ConfirmDialog
          trigger={
            <Button variant="outline" size="sm">
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          }
          title="Cancel Order"
          description={`Cancel order ${order.orderNumber}?${
            order.status === "confirmed"
              ? " Stock will be restored for all items."
              : ""
          }`}
          confirmLabel="Cancel Order"
          onConfirm={handleCancel}
        />
      )}
    </div>
  )
}

export { OrderDetailActions }
