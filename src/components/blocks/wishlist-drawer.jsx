"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart, Star, Sparkles, X, ExternalLink, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '../ui/sheet';
import { cn } from '@/lib/utils';

// Static wishlist data
const initialWishlistItems = [
  {
    id: "1",
    title: "Smart WiFi Thermostat Pro",
    price: 15999.00,
    originalPrice: 19999.00,
    image: "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
    rating: 4.5,
    inStock: true,
    isSale: true,
  },
  {
    id: "2",
    title: "Smart LED Ceiling Light",
    price: 8499.00,
    originalPrice: 9999.00,
    image: "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
    rating: 4.8,
    inStock: true,
    isSale: true,
  }
];

function WishlistProductCard({ item, onRemove, onAddToCart, index }) {
  const { id, title, price, originalPrice, image, rating, inStock, isSale } = item;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const [isRemoving, setIsRemoving] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(id), 300);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    onAddToCart(item);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div 
      className={cn(
        "group relative flex gap-4 p-4 rounded-xl border bg-linear-to-r from-card to-card/80",
        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
        "transition-all duration-300 ease-out",
        isRemoving && "opacity-0 scale-95 -translate-x-4"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'slideIn 0.4s ease-out forwards'
      }}
    >
      {/* Decorative gradient accent */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Product Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0 ring-1 ring-border/50 group-hover:ring-primary/30 transition-all duration-300">
        <Link href={`/product/${id}`} className="block h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="96px"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <ExternalLink className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
        {isSale && discount > 0 && (
          <Badge className="absolute top-1.5 left-1.5 text-[10px] px-1.5 py-0.5 bg-linear-to-r from-red-500 to-rose-500 border-0 shadow-md">
            -{discount}%
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-[10px] font-medium uppercase tracking-wider">Sold Out</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="relative flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link href={`/product/${id}`}>
            <h4 className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors duration-200">
              {title}
            </h4>
          </Link>
          
          {/* Rating with glow effect */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5 transition-all duration-200",
                    i < Math.floor(rating || 0) 
                      ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" 
                      : "fill-muted text-muted-foreground/20"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">({rating})</span>
          </div>

          {/* Price with better styling */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-bold text-base bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
              PKR {price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-muted-foreground/70 line-through decoration-red-400/50">
                PKR {originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions with improved styling */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            size="sm"
            className={cn(
              "h-8 text-xs flex-1 gap-1.5 font-medium transition-all duration-300",
              addedToCart 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20"
            )}
            disabled={!inStock || addedToCart}
            onClick={handleAddToCart}
          >
            {addedToCart ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-200"
            onClick={handleRemove}
            aria-label="Remove from wishlist"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function WishlistDrawer({ children }) {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [open, setOpen] = useState(false);

  const handleRemove = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item.title);
    // In a real app, this would add to cart state/context
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    console.log('Added all to cart:', inStockItems.map(item => item.title));
    // In a real app, this would add all in-stock items to cart
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice || item.price) - item.price, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0 border-l-primary/10">
        {/* Custom Header with gradient */}
        <div className="relative overflow-hidden">
          {/* Background gradient decoration */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-rose-500/10 to-transparent rounded-full blur-2xl" />
          
          <SheetHeader className="relative p-6 pb-4">
            <SheetTitle className="flex items-center gap-3 text-xl">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r rounded-full blur-md opacity-50 animate-pulse" />
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-rose-500 to-pink-500 shadow-lg">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
              </div>
              <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">My Wishlist</span>
            </SheetTitle>
            <SheetDescription className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </SheetDescription>
          </SheetHeader>
          
          {/* Stats bar */}
          {wishlistItems.length > 0 && (
            <div className="relative mx-6 mb-4 p-3 rounded-xl bg-linear-to-r from-muted/80 to-muted/50 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Value</span>
                  <span className="font-bold text-lg">PKR {totalValue.toLocaleString()}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">You Save</span>
                    <span className="font-bold text-lg text-green-500">PKR {totalSavings.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {wishlistItems.length > 0 ? (
          <>
            {/* Wishlist Items with custom scrollbar */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <div className="space-y-3 p-6">
                <style jsx global>{`
                  @keyframes slideIn {
                    from {
                      opacity: 0;
                      transform: translateX(20px);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0);
                    }
                  }
                `}</style>
                {wishlistItems.map((item, index) => (
                  <WishlistProductCard
                    key={item.id}
                    item={item}
                    index={index}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            {/* Premium Footer */}
            <div className="relative border-t bg-linear-to-t from-muted/50 to-transparent">
              <div className="p-6 space-y-4">
                <Button 
                  className="w-full gap-2 h-12 text-base font-semibold bg-linear-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5" 
                  size="lg"
                  onClick={handleAddAllToCart}
                  disabled={!wishlistItems.some(item => item.inStock)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add All to Cart
                </Button>
                
                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Free Shipping 5K+
                  </div>
                  <div className="w-px h-3 bg-border" />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Enhanced Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="relative mb-6">
              {/* Animated background rings */}
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-linear-to-r from-rose-500/20 to-pink-500/20 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-2 w-20 h-20 rounded-full bg-linear-to-r from-rose-500/10 to-pink-500/10 animate-pulse" />
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-r from-muted to-muted/50 border-2 border-dashed border-muted-foreground/20">
                <Heart className="h-10 w-10 text-muted-foreground/50" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-62.5 leading-relaxed">
              Tap the heart icon on products you love to save them here for later.
            </p>
            <Button 
              asChild 
              className="gap-2 bg-linear-to-r from-primary to-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              <Link href="/">
                <Sparkles className="h-4 w-4" />
                Discover Products
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
