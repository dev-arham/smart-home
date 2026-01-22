"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

// Static cart data
const initialCartItems = [
  {
    id: "1",
    title: "Smart WiFi Thermostat Pro",
    description: "AI-powered temperature control with voice assistant compatibility and energy-saving features.",
    price: 15999.00,
    originalPrice: 19999.00,
    image: "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
    quantity: 1,
    inStock: true,
    isSale: true,
    category: "Smart Climate"
  },
  {
    id: "2",
    title: "Smart LED Ceiling Light",
    description: "Dimmable RGB smart ceiling light with app control and scheduling features.",
    price: 8499.00,
    originalPrice: 9999.00,
    image: "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
    quantity: 2,
    inStock: true,
    isSale: true,
    category: "Smart Lighting"
  }
];

function CartItem({ item, onRemove, onUpdateQuantity }) {
  const { id, title, description, price, originalPrice, image, quantity, inStock, isSale, category } = item;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const itemTotal = price * quantity;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg border-muted">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Product Image */}
          <div className="relative w-full sm:w-40 md:w-48 aspect-square sm:aspect-auto sm:h-40 md:h-48 bg-muted overflow-hidden shrink-0">
            <Link href={`/product/${id}`}>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 192px"
              />
            </Link>
            
            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {isSale && discount > 0 && (
                <Badge variant="destructive" className="shadow-sm">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {category}
                </p>
                <Link href={`/product/${id}`}>
                  <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors line-clamp-1">
                    {title}
                  </h3>
                </Link>
                
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 hidden sm:block">
                  {description}
                </p>

                {/* Stock Status */}
                <div className="mt-2">
                  {inStock ? (
                    <span className="text-xs text-green-600 font-medium">✓ In Stock</span>
                  ) : (
                    <span className="text-xs text-destructive font-medium">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onRemove(id)}
                aria-label="Remove from cart"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Price and Quantity */}
            <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Qty:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => onUpdateQuantity(id, quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">PKR {itemTotal.toLocaleString()}</span>
                </div>
                {quantity > 1 && (
                  <span className="text-xs text-muted-foreground">
                    PKR {price.toLocaleString()} each
                  </span>
                )}
                {originalPrice && originalPrice > price && (
                  <span className="text-xs text-muted-foreground line-through">
                    PKR {(originalPrice * quantity).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleRemove = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal - promoDiscount + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <ShoppingCart className="h-7 w-7 text-primary" />
                Shopping Cart
              </h1>
              <p className="text-muted-foreground mt-1">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-28">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span className="font-medium">PKR {subtotal.toLocaleString()}</span>
                    </div>
                    
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-medium text-green-600">
                          -PKR {totalSavings.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {promoApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Promo (SAVE10)</span>
                        <span className="font-medium text-green-600">
                          -PKR {promoDiscount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `PKR ${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl">PKR {total.toLocaleString()}</span>
                    </div>

                    {totalSavings > 0 && (
                      <p className="text-xs text-green-600 text-right">
                        You're saving PKR {(totalSavings + promoDiscount).toLocaleString()}!
                      </p>
                    )}
                  </div>

                  {/* Promo Code */}
                  <div className="mt-6">
                    <label className="text-sm font-medium mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                        disabled={promoApplied}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                      >
                        {promoApplied ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>
                    )}
                  </div>

                  <Button className="w-full mt-6 gap-2" size="lg">
                    Proceed to Checkout
                  </Button>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Add PKR {(5000 - subtotal).toLocaleString()} more for free shipping
                    </p>
                  )}

                  {/* Trust Badges */}
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Secure Checkout</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Easy Returns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start shopping and discover amazing smart home products!
            </p>
            <Button asChild size="lg">
              <Link href="/">
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
