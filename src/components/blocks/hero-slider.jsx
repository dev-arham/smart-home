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
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function HeroSlider() {
    const slides = [
        {
            id: 1,
            badge: "Upgrade your home and save big",
            title: "Hurry and take up to 35% off.",
            subTitle: "Imagine what home could be",
            imageUrl: '/images/slide-one.jpg',
        },
        {
            id: 2,
            badge: "Upgrade your home and save big",
            title: "7th Aniversary Sale and FanFest 2025",
            subTitle: "Enjoy great prices accross the range of smart home products",
            imageUrl: '/images/slide-two.jpg',
        },
        {
            id: 3,
            badge: "Upgrade your home and save big",
            title: "Smart Home Essentials",
            subTitle: "Discover our range of smart home products designed to make your life easier.",
            imageUrl: '/images/slide-three.jpg',
        }
    ]
  return (
    <div className="w-full max-md:px-5 py-10 " >
        <Carousel className=" z-3 select-none" opts={{loop: true}} plugins={[Autoplay({delay: 2500, stopOnInteraction: true})]}>
        <CarouselContent>
            {slides.map((item, index) => (
            <CarouselItem key={item.id} className='container mx-auto'>
                <div className="p-0">
                <Card >
                    <CardContent className="">
                        {/* <div className="w-9/10 max-sm:w-full max-sm:mb-5 max-sm:text-center">
                            <p className="text-primary text-sm font-bold uppercase mb-2 max-sm:text-xs max-sm:mb-1">{item.badge}</p>
                            <h2 className="text-7xl text-tertiary font-bold capitalize mb-3 max-sm:text-4xl max-sm:mb-1">{item.title}</h2>
                            <p className="text-md text-tertiary font-semibold capitalize mb-6 max-sm:text-xs max-sm:mb-4">{item.subTitle}</p>
                            <Button variant='secondary' size='lg' className='w-fit border text-primary dark:text-tertiary-foreground'>Shop Now <ChevronRight /></Button>
                        </div>
                        <div className="w-full justify-items-end max-sm:px-10 max-sm:py-5">
                            <Image src={item.imageUrl} alt={item.title} width={600} height={400} className="max-sm:mx-auto" />
                        </div> */}
                        <Link href="#"><Image src={item.imageUrl} alt={item.title} width={1200} height={600} className="w-full h-full max-sm:max-h-[150px] max-sm:w-full object-cover rounded-lg" /></Link>
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
