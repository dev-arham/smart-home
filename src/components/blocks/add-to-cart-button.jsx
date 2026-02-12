"use client";

import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addTocart } from "@/store/cartSlice";

export default function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
  showText = true,
  children,
}) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addTocart({
        id: product.id,
        title: product.title || product.name,
        price: product.price,
        image: product.image || product.thumbnailUrl,
      })
    );

    toast.success("Product added to cart", {
      id: `cart-${product.id}`,
      description: product.title || product.name,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
    >
      {children ? (
        children
      ) : (
        <>
          {showIcon && <ShoppingCart className="w-4 h-4 mr-2" />}
          {showText && "Add to Cart"}
        </>
      )}
    </Button>
  );
}
