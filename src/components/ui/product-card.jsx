"use client";

import React from 'react'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './card'
import { Button } from './button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import WishlistButton from '@/components/blocks/wishlist-button'

/**
 * ProductCard Component
 * 
 * A good looking product card for an ecommerce store.
 * 
 * @param {Object} props
 * @param {Object} [props.product] - Product data object
 * @param {string} props.product.id
 * @param {string} props.product.title
 * @param {string} props.product.description
 * @param {number} props.product.price
 * @param {number} [props.product.originalPrice]
 * @param {string} props.product.image
 * @param {number} [props.product.rating]
 * @param {number} [props.product.reviews]
 * @param {boolean} [props.product.isSale]
 * @param {string} [props.className]
 */
export default function ProductCard({
  product = {
    id: "1",
    title: "Smart Thermostat Pro",
    description: "Automate your home climate with AI-driven temperature control.",
    price: 199.99,
    originalPrice: 249.99,
    image: "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
    rating: 4.5,
    reviews: 128,
    isSale: true
  },
  className
}) {
  const { title, description, price, originalPrice, image, rating, reviews, isSale } = product

  return (
    <Link href={`/product/${product.id}`} passHref>
    <Card className={cn("group overflow-hidden rounded-lg border-muted bg-card transition-all hover:shadow-md", className)}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Product Image */}
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {isSale && (
            <span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <WishlistButton
          product={product}
          variant="icon"
          className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      <CardHeader className="px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-lg font-bold">{title}</CardTitle>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4 fill-current", i < Math.floor(rating || 0) ? "text-yellow-400" : "text-muted-foreground/30")}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        <CardDescription className="line-clamp-2 text-sm mt-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">PKR {price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              PKR {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 pt-0">
        <Button className="w-full gap-2" size="default">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    </Link>
  )
}
