"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { placeOrder } from "@/server/orders";
import { clearCart } from "@/store/cartSlice";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(placeOrder, null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 250;
  const total = subtotal + shipping;

  const itemsPayload = useMemo(
    () =>
      cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        sellType: item.sellType ?? "unit",
      })),
    [cartItems]
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      dispatch(clearCart());
      toast.success("Order Confirmed", {
        description: "Your order has been placed successfully.",
        position: "top-right",
      });
    //   router.push(`/order-success?orderNumber=${state.orderNumber}`);
    } else if (state.error) {
      toast.error("Order Failed", {
        description: state.error,
        position: "top-right",
      });
      console.error("Order placement failed:", state.error);
    }
  }, [state, dispatch, router]);

  const fieldErrors = state?.fieldErrors;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 mt-30">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form action={formAction}>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(itemsPayload)}
          />
          <input type="hidden" name="shippingFee" value="250" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>
                    Enter your details to complete your order
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      placeholder="Sufyan"
                      type="text"
                      required
                    />
                    {fieldErrors?.customerName && (
                      <p className="text-sm text-destructive">
                        {fieldErrors.customerName[0]}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+92 300 1234567"
                      type="tel"
                      required
                    />
                    {fieldErrors?.phone && (
                      <p className="text-sm text-destructive">
                        {fieldErrors.phone[0]}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="123 Main Street, Karachi, Pakistan"
                      rows={3}
                      required
                    />
                    {fieldErrors?.address && (
                      <p className="text-sm text-destructive">
                        {fieldErrors.address[0]}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="New York"
                      type="text"
                      required
                    />
                    {fieldErrors?.city && (
                      <p className="text-sm text-destructive">
                        {fieldErrors.city[0]}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any special instructions for your order..."
                      rows={3}
                    />
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Method</h3>
                    <div className="space-y-2">
                      <Label htmlFor="payment">Select Payment Method</Label>
                      <Select defaultValue="Cash On Delivery">
                        <SelectTrigger id="payment">
                          <SelectValue placeholder="Choose a payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash On Delivery">
                            Cash On Delivery
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Cart Items */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <div key={item.id} className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold text-sm">
                              Rs {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No items in cart
                      </p>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <>
                      <Separator />

                      {/* Totals */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>Rs {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Shipping:</span>
                          <span>Rs 250</span>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>Rs {total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Confirm Order Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isPending || cartItems.length === 0}
                      >
                        {isPending ? "Placing Order..." : "Confirm Order"}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
