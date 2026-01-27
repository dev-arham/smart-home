'use client'
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"

export function HeroSlider() {
    const slides = [
        {
            id: 1,
            badge: "Upgrade your home and save big",
            title: "Imagine what home could be",
            subTitle: "Hurry and take up to 35% off on selected smart home products",
            imageUrl: "/images/mtronic-pk-products-banner.webp",
        },
        {
            id: 2,
            badge: "Upgrade your home and save big",
            title: "7th Aniversary Sale Live Now",
            subTitle: "Enjoy great prices accross the range of smart home products",
            imageUrl: "/images/slide.png",
        },
        {
            id: 3,
            badge: "Smart Living Solutions",
            title: "Transform Your Living Space",
            subTitle: "Discover the latest in home automation technology at unbeatable prices",
            imageUrl: "/images/mtronic-german-engineering-banner.webp",
        },
        {
            id: 4,
            badge: "Limited Time Offer",
            title: "Premium Smart Home Devices",
            subTitle: "Get up to 40% discount on exclusive smart home collections",
            imageUrl: "/images/luxury-living-bg.webp",
        }
    ]
  return (
    <div className="w-full h-screen" >
        <Carousel className="h-screen mx-auto z-3" opts={{loop: true}} plugins={[Autoplay({delay: 2500, stopOnInteraction: true}), Fade()]}>
        <CarouselContent className="h-screen">
            {slides.map((item, index) => (
            <CarouselItem key={item.id} className="h-screen">
                <div className="p-0 h-screen relative">
                <Card className="h-screen border-none shadow-none" style={{backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
                    <div className="absolute inset-0 bg-black/40"></div>
                    <CardContent className="relative flex h-screen items-center justify-center px-20 max-sm:p-5 select-none md:px-10">
                        <div className="max-sm:w-full max-sm:text-center w-full text-center rounded-lg p-8 max-sm:p-5">
                            <p className="text-primary text-sm font-bold uppercase mb-2 max-sm:text-xs max-sm:mb-1">{item.badge}</p>
                            <h2 className="text-6xl text-white font-black capitalize mb-3 max-sm:text-4xl max-sm:mb-1 max-lg:text-4xl drop-shadow-lg">{item.title}</h2>
                            <p className="text-md text-gray-100 mb-6 max-sm:text-xs max-sm:mb-4 drop-shadow-lg">{item.subTitle}</p>
                            <Button size='lg'>Shop Now</Button>
                        </div>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
    </div>
  )
}
