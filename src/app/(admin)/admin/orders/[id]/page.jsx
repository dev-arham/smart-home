import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getOrderById } from "@/lib/queries/order.queries"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { OrderDetailActions } from "./order-detail-actions"

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {order.orderNumber}
            </h1>
            <p className="text-muted-foreground text-sm">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <OrderDetailActions order={order} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer & Shipping */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
            <CardDescription>Customer and delivery information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">
                {order.shippingAddress.customerName}
              </p>
              <p className="text-muted-foreground text-sm">
                {order.shippingAddress.phone}
              </p>
            </div>
            <div>
              <p className="text-sm">{order.shippingAddress.address}</p>
              <p className="text-sm">{order.shippingAddress.city}</p>
            </div>
            {order.userId && (
              <p className="text-muted-foreground text-xs">
                Registered user
              </p>
            )}
            {!order.userId && (
              <p className="text-muted-foreground text-xs">
                Guest checkout
              </p>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Payment method: Cash on Delivery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono">
                Rs {Number(order.subtotal).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-mono">
                Rs {Number(order.shippingFee).toLocaleString()}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between font-medium">
              <span>Total</span>
              <span className="font-mono">
                Rs {Number(order.totalAmount).toLocaleString()}
              </span>
            </div>
            {order.notes && (
              <div className="border-t pt-3">
                <p className="text-sm font-medium">Notes</p>
                <p className="text-muted-foreground text-sm">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>
            Items ({order.orderItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Sell Type</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Line Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.product?.thumbnailUrl && (
                        <img
                          src={item.product.thumbnailUrl}
                          alt={item.product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium">
                          {item.product?.name ?? "Deleted product"}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {item.snapshotUnitsPerBox} units/box,{" "}
                          {item.snapshotBoxesPerCarton} boxes/carton
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{item.sellType}</span>
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    Rs {Number(item.unitPrice).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    Rs {Number(item.lineTotal).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
