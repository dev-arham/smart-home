"use client"

import Link from "next/link"
import { Eye, Check, X, Truck } from "lucide-react"
import { toast } from "sonner"

import {
  confirmOrder,
  cancelOrder,
  markDelivered,
} from "@/server/orders"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

function OrderActions({ order }) {
  async function handleConfirm() {
    const result = await confirmOrder(order.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success("Order confirmed. Stock has been deducted.")
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
  }

  async function handleDeliver() {
    const result = await markDelivered(order.id)
    if (!result.success) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    toast.success("Order marked as delivered.")
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/orders/${order.id}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>

      {order.status === "pending" && (
        <ConfirmDialog
          trigger={
            <Button variant="ghost" size="icon" className="text-blue-600">
              <Check className="h-4 w-4" />
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
            <Button variant="ghost" size="icon" className="text-green-600">
              <Truck className="h-4 w-4" />
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
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
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

export { OrderActions }
