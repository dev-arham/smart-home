import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ProductCard from '@/components/ui/product-card'

const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: "Aqua Wifi Smart Switch 30 AMP",
    description: "High-power smart switch for heavy appliances with WiFi control.",
    price: 45.99,
    originalPrice: 59.99,
    image: "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
    rating: 4.8,
    reviews: 156,
    isSale: true
  },
  {
    id: "2",
    title: "Aqua Sapphire 4 Gang Switch",
    description: "Elegant 4-gang switch plus 2 sockets with crystal panel.",
    price: 32.50,
    image: "/images/products/AQUA SAPPHIRE 4 GANG SWITCH PLUS 2 SOCKET.jpg",
    rating: 4.5,
    reviews: 89,
    isSale: false
  },
  {
    id: "3",
    title: "Aqua Desk Pop-up Socket",
    description: "Lifting sockets with Speaker, USB, and C-Type ports.",
    price: 120.00,
    originalPrice: 150.00,
    image: "/images/products/Aqua Desk Pop-up Lifting Sockets Silver 1-Speaker+2-MF+2USB+2C-Type.jpg",
    rating: 4.9,
    reviews: 42,
    isSale: true
  },
  {
    id: "4",
    title: "Aqua LED Down Light 12W",
    description: "Energy efficient 3000K Warm light for cozy ambiance.",
    price: 15.99,
    image: "/images/products/AQUA LED DOWN LIGHT 12 WATT 3000K WARM.jpg",
    rating: 4.3,
    reviews: 210,
  },
  {
    id: "5",
    title: "Aqua Sapphire 2 Gang Dimmer",
    description: "Touch sensitive dimmer switch for perfect lighting control.",
    price: 28.99,
    image: "/images/products/AQUA SAPPHIRE 2 GANG SWITCH PLUS 1 DIMMER.jpg",
    rating: 4.6,
    reviews: 75,
    isSale: true
  },
   {
    id: "6",
    title: "Aqua COB Down Light 12W",
    description: "Moveable COB light 4000K for focused illumination.",
    price: 18.50,
    image: "/images/products/AQUA COB DOWN LIGHT 12-WATT 4000K WARM WHITE C-9 ( Moveable ).jpg",
    rating: 4.4,
    reviews: 130,
  }
]

export default function FeaturedProducts() {
  return (
    <section className="container py-12 mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4 mb-10 text-center">
            <h2 className='text-5xl font-bold text-tertiary text-center mb-2 max-sm:text-3xl dark:text-tertiary-foreground'>Featured Products</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our hand-picked selection of top-rated smart home devices designed to elevate your living experience.
            </p>
        </div>
        
        <div className="relative">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {FEATURED_PRODUCTS.map((product) => (
                        <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="h-full p-1">
                                <ProductCard product={product} className="h-full" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious className="-left-4 lg:-left-12 h-10 w-10 sm:h-12 sm:w-12 border-2" />
                    <CarouselNext className="-right-4 lg:-right-12 h-10 w-10 sm:h-12 sm:w-12 border-2" />
                </div>
                 <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
                    <CarouselPrevious className="static translate-y-0 h-10 w-10" />
                    <CarouselNext className="static translate-y-0 h-10 w-10" />
                </div>
            </Carousel>
        </div>
    </section>
  )
}
