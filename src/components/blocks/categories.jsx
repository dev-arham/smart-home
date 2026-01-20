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
    const { ref, isVisible } = useFadeIn(0.2)
    
    return (
        <div 
            ref={ref}
            className={`w-full mx-auto overflow-x-hidden mb-20 max-sm:mb-10 transition-all duration-700 ease-out ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
            }`}
        >
            <h2 className='text-5xl font-bold text-tertiary text-center mb-5 max-sm:text-3xl dark:text-tertiary-foreground'>Shop By Category</h2>
            <CategoryCarousel />
        </div>
    )
}

export default Categories