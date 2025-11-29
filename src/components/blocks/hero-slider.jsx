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
import Image from "next/image"
import Img1 from "@/assets/images/slider-img1.png"
import Img2 from "@/assets/images/slider-img2.png"

export function HeroSlider() {
    const slides = [
        {
            id: 1,
            badge: "Upgrade your home and save big",
            title: "Hurry and take up to 35% off.",
            subTitle: "Imagine what home could be",
            imageUrl: Img1,
        },
        {
            id: 2,
            badge: "Upgrade your home and save big",
            title: "7th Aniversary Sale and FanFest 2025",
            subTitle: "Enjoy great prices accross the range of smart home products",
            imageUrl: Img2,
        }
    ]
  return (
    <div className="w-full px-4 py-8 " >
        <Carousel className="container mx-auto z-3" opts={{loop: true}} plugins={[Autoplay({delay: 2500, stopOnInteraction: true})]}>
        <CarouselContent>
            {slides.map((item, index) => (
            <CarouselItem key={item.id}>
                <div className="p-0">
                <Card style={{backgroundImage: `url(${'/slider-bg.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
                    <CardContent className="flex h-[70vh] items-center justify-between px-20">
                        <div className="w-9/10">
                            <p className="text-primary text-sm font-bold uppercase mb-2">{item.badge}</p>
                            <h2 className="text-7xl text-tertiary font-bold capitalize mb-3">{item.title}</h2>
                            <p className="text-md text-tertiary font-semibold capitalize mb-6">{item.subTitle}</p>
                            <Button variant='secondary' size='lg'>Shop Now</Button>
                        </div>
                        <div className="w-full justify-items-end">
                            <Image src={item.imageUrl} alt={item.title} width={600} height={400} />
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
