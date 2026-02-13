"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWhishlist, clearWhishlist } from '@/store/whishlistSlice';
import { addTocart } from '@/store/cartSlice';
import { toast } from 'sonner';
import { Heart, Trash2, ShoppingCart, Sparkles, ExternalLink, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '../ui/sheet';
import { cn } from '@/lib/utils';

function WishlistProductCard({ item, onRemove, onAddToCart }) {
  const { id, title, price, image } = item;
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
        "group relative flex gap-4 p-4 rounded-xl border bg-card",
        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
        "transition-all duration-300 ease-out",
        isRemoving && "opacity-0 scale-95 -translate-x-4"
      )}
    >
      {/* Decorative linear accent */}
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
      </div>

      {/* Product Details */}
      <div className="relative flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link href={`/product/${id}`}>
            <h4 className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors duration-200">
              {title}
            </h4>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-bold text-base">
              PKR {price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            size="sm"
            className={cn(
              "h-8 text-xs flex-1 gap-1.5 font-medium transition-all duration-300",
              addedToCart 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20"
            )}
            disabled={addedToCart}
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
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.whishlist.items);
  const [open, setOpen] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeFromWhishlist(id));
    toast.success("Removed from wishlist", { position: "top-right" });
  };

  const handleAddToCart = (item) => {
    dispatch(addTocart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    }));
    toast.success(`${item.title} added to cart`, { position: "top-right" });
  };

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    
    wishlistItems.forEach((item) => {
      dispatch(addTocart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      }));
    });
    
    dispatch(clearWhishlist());
    toast.success(`${wishlistItems.length} items added to cart`, { position: "top-right" });
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0 border-l-primary/10">
        {/* Header with linear */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-blue-700/10 via-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-blue-900/10 to-transparent rounded-full blur-2xl" />
          
          <SheetHeader className="relative p-6 pb-4">
            <SheetTitle className="flex items-center gap-3 text-xl">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-blue-900 rounded-full blur-md opacity-50 animate-pulse" />
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-blue-700 to-blue-900 shadow-lg">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
              </div>
              <span>My Wishlist</span>
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
              </div>
            </div>
          )}
        </div>

        <Separator />

        {wishlistItems.length > 0 ? (
          <>
            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-3 p-6">
                {wishlistItems.map((item) => (
                  <WishlistProductCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="relative border-t bg-linear-to-t from-muted/50 to-transparent">
              <div className="p-6 space-y-4">
                <Button 
                  className="w-full gap-2 h-12 text-base font-semibold bg-linear-to-r from-blue-700 to-blue-900 hover:from-blue-700 hover:to-blue-900 shadow-lg shadow-blue-700/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-700/30 hover:-translate-y-0.5" 
                  size="lg"
                  onClick={handleAddAllToCart}
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
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                    Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-linear-to-r from-blue-700/20 to-blue-900/20 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-2 w-20 h-20 rounded-full bg-linear-to-r from-blue-700/10 to-blue-900/10 animate-pulse" />
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
              className="gap-2 bg-linear-to-r from-blue-700 to-blue-900 hover:from-blue-700 hover:to-blue-900 shadow-md shadow-blue-700/20 hover:shadow-lg hover:shadow-blue-700/25 transition-all duration-300"
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
