"use client";

import { useSelector } from "react-redux";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250; // Fixed shipping cost
  const total = subtotal + shipping; // Add tax/shipping logic here if needed

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your details to complete your order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Sufyan"
                    type="text"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+92 300 1234567"
                    type="tel"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main Street, Karachi, Pakistan"
                    rows={3}
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    type="text"
                  />
                </div>

                <Separator />

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <div className="space-y-2">
                    <Label htmlFor="payment">Select Payment Method</Label>
                    <Select>
                      <SelectTrigger id="payment">
                        <SelectValue placeholder="Choose a payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Cash On Delivery</SelectItem>
                       
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
                            <p className="font-medium text-sm">{item.title}</p>
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
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        // Handler to be implemented
                      }}
                    >
                      Confirm Order
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
