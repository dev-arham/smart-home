'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CategoryCarousel from './categories-carousel'
import { useFadeIn } from '@/hooks/use-fade-in'

const Categories = () => {
    const headingFade = useFadeIn({ direction: 'fade', threshold: 0.2 })
    
    return (
        <div className='w-full mx-auto overflow-x-hidden mb-20 max-sm:mb-10'>
            <h2 
                ref={headingFade.ref}
                style={headingFade.animationStyles}
                className='text-5xl font-bold text-tertiary text-center mb-5 max-sm:text-3xl dark:text-tertiary-foreground'
            >
                Shop By Category
            </h2>
            <CategoryCarousel />
        </div>
    )
}

export default Categories