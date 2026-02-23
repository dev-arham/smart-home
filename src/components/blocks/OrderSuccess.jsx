import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const items = [
  {
    id: 1,
    title: "Product Name",
    price: 40,
    quantity: 1,
    image: "/product.png",
  },
  {
    id: 2,
    title: "Product Name",
    price: 40,
    quantity: 2,
    image: "/product.png",
  },
];

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* SVG Icon Placeholder */}
        {/* <div className="w-32 h-32 flex items-center justify-center mb-6"> */}
          {/* SVG ICON WILL BE PLACED HERE */}
          {/* <Image
            src="/ORDER CONFIRMED LOWER THIRD.gif"
            alt="Order Success Icon"
            width={150}
            height={150}
          />
        </div> */}

        {/* Heading + Subtext */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Order Confirmed 🎉
        </h1>
        <p className="mt-2 text-muted-foreground text-center">
          Your order has been placed successfully
        </p>

        <Separator className="my-8" />

        {/* Order Details Card */}
        <Card className="w-full rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="text-right font-medium">#ORD-12345</span>

              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-right font-medium">$120</span>

              <span className="text-muted-foreground">Payment Method</span>
              <span className="text-right font-medium">Cash on Delivery</span>

              <span className="text-muted-foreground">Delivery Address</span>
              <span className="text-right font-medium">
                123 Main Street, Apt 4B, New York, NY 10001
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Items List Card */}
        <Card className="w-full rounded-xl shadow-md mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Items Ordered</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-sm">
                    ${item.price * item.quantity}
                  </p>
                </div>
                {index < items.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="flex-1">
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href="/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
