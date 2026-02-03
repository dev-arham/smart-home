'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, ShoppingCart, Heart } from 'lucide-react'
import { usePopUp } from '@/hooks/use-pop-up'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Sample products data - you can replace this with actual data from your database
const products = [
    {
        id: 1,
        name: "Phase Selector 32A",
        tagline: "4 Position Phase Selector",
        image: "/images/products/AQUA 32A 4 POSITION PHASE SELECTOR.jpg",
        hoverImage: "/images/products/AQUA 50A 4 POSITION PHASE SELECTOR.jpg",
        price: 2500,
        originalPrice: 3200,
        isNew: true,
    },
    {
        id: 2,
        name: "Phase Selector 50A",
        tagline: "4 Position Phase Selector",
        image: "/images/products/AQUA 50A 4 POSITION PHASE SELECTOR.jpg",
        hoverImage: "/images/products/AQUA 32A 4 POSITION PHASE SELECTOR.jpg",
        price: 3500,
        originalPrice: 4200,
        isNew: true,
    },
    {
        id: 3,
        name: "Aqua Capacitor",
        tagline: "High quality capacitor",
        image: "/images/products/AQUA CAPACITOR 10.jpg",
        hoverImage: "/images/products/AQUA LED DOWN LIGHT 12 WATT 3000K WARM.jpg",
        price: 850,
        originalPrice: 1100,
        isNew: false,
    },
    {
        id: 4,
        name: "COB Down Light 12W",
        tagline: "4000K Warm White Moveable",
        image: "/images/products/AQUA COB DOWN LIGHT 12-WATT 4000K WARM WHITE C-9 ( Moveable ).jpg",
        hoverImage: "/images/products/AQUA LED DOWN LIGHT 12 WATT 3000K WARM.jpg",
        price: 1800,
        originalPrice: 2400,
        isNew: true,
    },
    {
        id: 5,
        name: "Desk Pop-up Sockets",
        tagline: "Silver with USB & Type-C",
        image: "/images/products/Aqua Desk Pop-up Lifting Sockets Silver 1-Speaker+2-MF+2USB+2C-Type.jpg",
        hoverImage: "/images/products/AQUA SAPPHIRE 2 GANG SWITCH PLUS 1 DIMMER.jpg",
        price: 4500,
        originalPrice: 5500,
        isNew: true,
    },
    {
        id: 6,
        name: "LED Down Light 12W",
        tagline: "3000K Warm White",
        image: "/images/products/AQUA LED DOWN LIGHT 12 WATT 3000K WARM.jpg",
        hoverImage: "/images/products/AQUA COB DOWN LIGHT 12-WATT 4000K WARM WHITE C-9 ( Moveable ).jpg",
        price: 1200,
        originalPrice: 1600,
        isNew: false,
    },
    {
        id: 7,
        name: "Sapphire 2 Gang Switch",
        tagline: "With 1 Dimmer",
        image: "/images/products/AQUA SAPPHIRE 2 GANG SWITCH PLUS 1 DIMMER.jpg",
        hoverImage: "/images/products/AQUA SAPPHIRE 4 GANG SWITCH PLUS 2 SOCKET.jpg",
        price: 2800,
        originalPrice: 3500,
        isNew: true,
    },
    {
        id: 8,
        name: "Sapphire 4 Gang Switch",
        tagline: "With 2 Socket",
        image: "/images/products/AQUA SAPPHIRE 4 GANG SWITCH PLUS 2 SOCKET.jpg",
        hoverImage: "/images/products/AQUA SAPPHIRE 2 GANG SWITCH PLUS 1 DIMMER.jpg",
        price: 3200,
        originalPrice: 4000,
        isNew: false,
    },
    {
        id: 9,
        name: "WiFi Smart Switch",
        tagline: "30 AMP Smart Control",
        image: "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
        hoverImage: "/images/products/AQUA CAPACITOR 10.jpg",
        price: 3800,
        originalPrice: 4800,
        isNew: true,
    },
]

const ProductItem = ({ product, index }) => {
    const animation = usePopUp({ threshold: 0.1, duration: 500, delay: index * 100 })

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

    return (
        <div
            ref={animation.ref}
            style={animation.animationStyles}
            className="group"
        >
            <Card className="relative overflow-hidden border border-gray-100 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.5)] py-0 rounded-none">
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
                <CardContent className="p-2 sm:p-3 md:p-4 text-center">
                    {/* Tagline */}
                    <p className="text-gray-500 text-[10px] sm:text-xs md:text-[14px] max-sm:mt-5 font-medium mb-0.5">
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
                <Link href={`/product/${product.id}`} className="block">
                    <div className="relative bg-white h-[140px] sm:h-[200px] md:h-[250px] lg:h-80 overflow-hidden">
                        {/* Default Image */}
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-3 sm:p-5 md:p-6 lg:p-8 transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
                        />
                        {/* Hover Image */}
                        <Image
                            src={product.hoverImage || product.image}
                            alt={`${product.name} - hover`}
                            fill
                            className="object-contain p-3 sm:p-5 md:p-6 lg:p-8 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        />
                    </div>
                </Link>

                {/* Price & Actions - Bottom */}
                <CardContent className="p-2 sm:p-3 md:p-4 text-center">
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
                                // Add to cart logic here
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
                            className="bg-Transparent rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-lg h-7 w-7 sm:h-8 sm:w-8"
                            onClick={(e) => {
                                e.preventDefault()
                                // Add to wishlist logic here
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

const AllProducts = () => {
    return (
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#fafcff] min-h-screen">
            <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-10 md:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-900 mb-4 mt-10 sm:mt-16 md:mt-20 max-sm:mt-30">
                        Our Products
                    </h1>
                   
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {products.toReversed().map((product, index) =>  (
                        <ProductItem key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AllProducts
