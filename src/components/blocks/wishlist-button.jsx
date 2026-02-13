"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToWhishlist, removeFromWhishlist } from "@/store/whishlistSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WishlistButton Component
 * A reusable toggle button for adding/removing products from wishlist
 *
 * @param {Object} props
 * @param {Object} props.product - Product object with id, title, price, image
 * @param {string} [props.variant] - Button variant: "icon" | "full" (default: "full")
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.size] - Button size: "sm" | "default" | "lg" | "icon"
 */
export default function WishlistButton({
  product,
  variant = "full",
  className,
  size = "default",
}) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.whishlist.items);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWhishlist(product.id));
    } else {
      dispatch(
        addToWhishlist({
          id: product.id,
          title: product.title || product.name,
          price: product.price,
          image: product.image,
        })
      );
      toast.success("Added to wishlist", { position: "top-right" });
    }
  };

  if (variant === "icon") {
    return (
      <Button
        variant="secondary"
        size="icon"
        onClick={handleToggleWishlist}
        className={cn(
          "h-8 w-8 rounded-full transition-all duration-300",
          isWishlisted 
            ? "bg-rose-500 hover:bg-rose-600 border-rose-500" 
            : "bg-transparent hover:bg-muted",
          className
        )}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            isWishlisted ? "fill-white text-white" : "text-muted-foreground"
          )}
        />
      </Button>
    );
  }

  return (
    <Button
      variant={isWishlisted ? "secondary" : "outline"}
      size={size}
      onClick={handleToggleWishlist}
      className={cn(
        "gap-2 transition-all duration-300",
        isWishlisted 
          ? "bg-rose-500 hover:bg-rose-600 text-white border-rose-500" 
          : "bg-transparent",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4",
          isWishlisted ? "fill-white text-white" : ""
        )}
      />
      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
    </Button>
  );
}
