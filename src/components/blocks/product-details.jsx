"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Share2, Minus, Plus, Truck, ShieldCheck, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import AddToCartButton from '@/components/blocks/add-to-cart-button'
import WishlistButton from '@/components/blocks/wishlist-button'

export default function ProductDetails({ product }) {
    
    // Handle images - use thumbnailUrl as fallback if images array is empty
    const allImages = product.images?.length > 0 
        ? product.images 
        : (product.thumbnailUrl ? [product.thumbnailUrl] : [])
    
    const [selectedImage, setSelectedImage] = useState(allImages[0] || '')
    const [quantity, setQuantity] = useState(1)

    // Parse prices as numbers
    const price = parseFloat(product.price) || 0
    const compareAtPrice = parseFloat(product.compareAtPrice) || 0
    const hasDiscount = compareAtPrice > price

    const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1))
    const increaseQuantity = () => setQuantity(prev => prev + 1)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-md:flex max-md:flex-col-reverse">
            {/* Left Column: Gallery */}
            <div className="flex flex-col gap-6">
                {/* breadcrumbs */}
                <div>
                    <nav className="text-sm text-muted-foreground mb-2" aria-label="Breadcrumb">
                        <ol className="list-none p-0 inline-flex items-center space-x-1">
                            <li>
                                <a href="#" className="hover:underline">Home</a>
                                <span className="mx-2">/</span>
                            </li>
                            <li>
                                <a href={`/category/${product.category?.slug || ''}`} className="hover:underline">
                                    {product.category?.name || 'Category'}
                                </a>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="text-foreground font-medium">
                                {product.name}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">{product.category?.name}</span>
                        {product.brand?.name && (
                            <span className="text-sm text-muted-foreground">Brand: {product.brand.name}</span>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>
                    {product.sku && (
                        <p className="text-sm text-muted-foreground mt-1">SKU: {product.sku}</p>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold text-foreground">Rs. {price.toLocaleString()}</p>
                    {hasDiscount && (
                        <>
                            <p className="text-lg text-muted-foreground line-through">Rs. {compareAtPrice.toLocaleString()}</p>
                            <Badge variant="secondary" className="text-destructive">
                                {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% OFF
                            </Badge>
                        </>
                    )}
                </div>

                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                </p>

                <Separator />

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-start gap-4">
                        <span className="text-sm font-medium">Quantity</span>
                        <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="lg" className="h-12 w-12 rounded-r-none" onClick={decreaseQuantity}>
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                            <Button variant="ghost" size="lg" className="h-12 w-12 rounded-l-none" onClick={increaseQuantity}>
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                        <AddToCartButton
                            product={{
                                id: product.id,
                                title: product.name,
                                price: price,
                                image: product.thumbnailUrl || allImages[0],
                            }}
                            className="flex-1 h-12 text-base"
                            size="lg"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button className="flex-1 h-12 text-base" size="lg" variant='outline'>Buy Now</Button>
                        <WishlistButton
                            product={{
                                id: product.id,
                                title: product.name,
                                price: price,
                                image: product.thumbnailUrl || allImages[0],
                            }}
                            variant="icon"
                            className="h-12 w-12 shrink-0"
                        />
                        <Button variant="ghost" size="icon" className="h-12 w-12 shrink-0">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Truck className="h-4 w-4" />
                        <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />
                        <span>2 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <RefreshCw className="h-4 w-4" />
                        <span>30 Days Return</span>
                    </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {product.productAttributes?.length > 0 && (
                        <AccordionItem value="specs">
                            <AccordionTrigger>Specifications</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {product.productAttributes.map((attr) => (
                                        <React.Fragment key={attr.id}>
                                            <div className="text-muted-foreground font-medium">{attr.attribute?.name}</div>
                                            <div>{attr.value}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )}
                    <AccordionItem value="shipping">
                        <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            We offer free shipping on all orders over $50. Orders are usually processed within 24 hours.
                            If you are not satisfied with your purchase, you can return it within 30 days for a full refund.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>


            {/* Right Column: Product Info */}
            <div className="flex gap-6 max-md:flex-col">
                <div className="relative overflow-hidden rounded-xl flex flex-11/12 items-start justify-center bg-transparent pt-8">
                    {product.isFeatured && (
                        <Badge className="absolute left-4 top-4 z-10">Featured</Badge>
                    )}
                    {hasDiscount && (
                        <Badge variant="destructive" className="absolute right-4 top-4 z-10">Sale</Badge>
                    )}
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-contain  w-full p-4"
                            priority
                        />
                    
                </div>
                <div className="flex flex-col gap-4 flex-1/12 max-md:flex-row max-md:overflow-x-auto max-md:gap-4 max-md:flex-2/12">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={cn(
                                "relative aspect-square overflow-hidden rounded-lg border flex items-center justify-center ring-offset-background transition-all hover:ring-2 hover:ring-ring focus-visible:ring-2 focus-visible:ring-ring",
                                selectedImage === img && "ring-2 ring-ring"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`View ${index + 1}`}
                                width={80}
                                height={80}
                                className="object-contain p-1"
                            />
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}
