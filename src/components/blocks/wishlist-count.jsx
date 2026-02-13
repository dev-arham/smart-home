"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WishlistDrawer from "@/components/blocks/wishlist-drawer";

/**
 * WishlistCount Component
 * Displays a heart icon with wishlist item count badge that opens the wishlist drawer
 * For use in header/navbar
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 */
export default function WishlistCount({ className }) {
  const wishlistItems = useSelector((state) => state.whishlist.items);
  const count = wishlistItems.length;

  return (
    <WishlistDrawer>
      <Button
        variant="ghost"
        size="icon"
        className={cn("relative cursor-pointer", className)}
      >
        <Heart className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
            {count > 99 ? "99+" : count}
          </span>
        )}
        <span className="sr-only">
          Wishlist ({count} {count === 1 ? "item" : "items"})
        </span>
      </Button>
    </WishlistDrawer>
  );
}
