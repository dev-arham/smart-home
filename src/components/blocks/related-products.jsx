'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, ShoppingCart, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useFadeIn } from '@/hooks/use-fade-in'

const RELATED_PRODUCTS = [
    {
        id: 1,
        name: "Phase Selector 32A",
        tagline: "4 Position Phase Selector",
        image: "/images/products/AQUA 32A 4 POSITION PHASE SELECTOR.jpg",
        price: 2500,
        originalPrice: 3200,
        isNew: true,
    },
    {
        id: 2,
        name: "Phase Selector 50A",
        tagline: "4 Position Phase Selector",
        image: "/images/products/AQUA 50A 4 POSITION PHASE SELECTOR.jpg",
        price: 3500,
        originalPrice: 4200,
        isNew: true,
    },
    {
        id: 3,
        name: "Aqua Capacitor",
        tagline: "High quality capacitor",
        image: "/images/products/AQUA CAPACITOR 10.jpg",
        price: 850,
        originalPrice: 1100,
        isNew: false,
    },
    {
        id: 4,
        name: "COB Down Light 12W",
        tagline: "4000K Warm White Moveable",
        image: "/images/products/AQUA COB DOWN LIGHT 12-WATT 4000K WARM WHITE C-9 ( Moveable ).jpg",
        price: 1800,
        originalPrice: 2400,
        isNew: true,
    },
    {
        id: 5,
        name: "Desk Pop-up Sockets",
        tagline: "Silver with USB & Type-C",
        image: "/images/products/Aqua Desk Pop-up Lifting Sockets Silver 1-Speaker+2-MF+2USB+2C-Type.jpg",
        price: 4500,
        originalPrice: 5500,
        isNew: true,
    },
    {
        id: 6,
        name: "LED Down Light 12W",
        tagline: "3000K Warm White",
        image: "/images/products/AQUA LED DOWN LIGHT 12 WATT 3000K WARM.jpg",
        price: 1200,
        originalPrice: 1600,
        isNew: false,
    },
]

const ProductItem = ({ product }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

    return (
        <div className="group h-full">
            <Card className="relative overflow-hidden border border-gray-100 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgb(250,252,255)] py-0 rounded-none h-full flex flex-col">
                {/* New Badge */}
                {product.isNew && (
                    <Badge variant="secondary" className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-0.5 sm:gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500" />
                        New
                    </Badge>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                    <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-500 text-white border-red-500 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                        -{discount}%
                    </Badge>
                )}

                {/* Product Info - Top */}
                <CardContent className="p-2 sm:p-3 md:p-4 text-center max-sm:mt-6">
                    {/* Tagline */}
                    <p className="text-gray-500 text-[10px] sm:text-xs md:text-[14px] font-medium mb-0.5 line-clamp-1">
                        {product.tagline}
                    </p>

                    {/* Product Name */}
                    <Link href={`/product/${product.id}`}>
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-[22px] font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>
                </CardContent>

                {/* Product Image Container */}
                <Link href={`/product/${product.id}`} className="block flex-1">
                    <div className="relative bg-white h-[120px] sm:h-40 md:h-[200px] lg:h-[220px] overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-3 sm:p-4 md:p-6 group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </Link>

                {/* Price & Actions - Bottom */}
                <CardContent className="p-2 sm:p-3 md:p-4 text-center mt-auto">
                    {/* Price Section */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">
                            Rs. {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 line-through">
                                Rs. {product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button 
                            size="sm" 
                            className="bg-linear-to-r from-blue-500 to-blue-800 rounded-full hover:bg-primary/90 text-white shadow-lg text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 h-7 sm:h-8"
                            onClick={(e) => {
                                e.preventDefault()
                                console.log('Added to cart:', product.name)
                            }}
                        >
                            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                            <span className="hidden sm:inline">Add to Cart</span>
                            <span className="sm:hidden">Add</span>
                        </Button>
                        <Button 
                            size="icon" 
                            variant="outline"
                            className="bg-transparent rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-lg h-7 w-7 sm:h-8 sm:w-8"
                            onClick={(e) => {
                                e.preventDefault()
                                console.log('Added to wishlist:', product.name)
                            }}
                        >
                            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function RelatedProducts() {
    const headingFade = useFadeIn({ direction: 'fade', threshold: 0.2 })

    return (
        <section className="py-12">
            <div ref={headingFade.ref} style={headingFade.animationStyles} className="flex flex-col gap-4 mb-10 text-center">
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-tertiary text-center mb-2 dark:text-tertiary-foreground'>
                    Related Products
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                    You may also like these products from our collection.
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
                {RELATED_PRODUCTS.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
