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
import Image from "next/image"

export function HeroSlider() {
    const slides = [
        {
            id: 1,
            badge: "Upgrade your home and save big",
            title: "Imagine what home could be",
            subTitle: "Hurry and take up to 35% off on selected smart home products",
            imageUrl: "/images/hero-one.png",
        },
        {
            id: 2,
            badge: "Upgrade your home and save big",
            title: "7th Aniversary Sale Live Now",
            subTitle: "Enjoy great prices accross the range of smart home products",
            imageUrl: "/images/hero-two.png",
        }
    ]
  return (
    <div className="w-full h-screen" >
        <Carousel className="h-screen mx-auto z-3" opts={{loop: true}} plugins={[Autoplay({delay: 2500, stopOnInteraction: true}), Fade()]}>
        <CarouselContent className="h-screen">
            {slides.map((item, index) => (
            <CarouselItem key={item.id} className="h-screen">
                <div className="p-0 h-screen">
                <Card className="h-screen border-none shadow-none" style={{backgroundImage: `url(${'/images/slider-bg.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
                    <CardContent className="flex h-screen items-center justify-between px-20 max-sm:flex-col max-sm:p-5 select-none md:px-10">
                        <div className="max-sm:w-full max-sm:mb-5 max-sm:text-center w-full">
                            <p className="text-primary text-sm font-bold uppercase mb-2 max-sm:text-xs max-sm:mb-1">{item.badge}</p>
                            <h2 className="text-6xl text-tertiary font-black capitalize mb-3 max-sm:text-4xl max-sm:mb-1 max-lg:text-4xl">{item.title}</h2>
                            <p className="text-md text-muted-foreground mb-6 max-sm:text-xs max-sm:mb-4">{item.subTitle}</p>
                            <Button size='lg'>Shop Now</Button>
                        </div>
                        <div className="w-fit justify-items-end max-sm:px-10 max-sm:py-5">
                            <Image src={item.imageUrl} alt={item.title} width={800} height={800} className="max-sm:mx-auto" />
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
