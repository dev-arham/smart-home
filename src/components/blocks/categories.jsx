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
import HeroCards from './hero-cards'

const Categories = () => {
    return (
        <div className='w-full mx-auto overflow-x-hidden mb-20 max-sm:mb-10 mt-10'>
            <h2 className='text-5xl font-bold text-tertiary text-center mb-5 max-sm:text-3xl dark:text-tertiary-foreground'>Shop By Category</h2>
            {/* <CategoryCarousel /> */}
            <HeroCards />
        </div>
    )
}

export default Categories