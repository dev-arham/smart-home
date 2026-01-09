import React from 'react'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'

const CategoryCarousel = () => {

    const categories = [
        { id: 1, name: 'Smart Switches', productCount: 38, imageUrl: '/images/big-switches.png' },
        { id: 2, name: 'LED Lights', productCount: 25, imageUrl: '/images/led-lights.png' },
        { id: 3, name: 'Accessories', productCount: 28, imageUrl: '/images/hero-two.png' },
        { id: 4, name: 'Big Switches', productCount: 14, imageUrl: '/images/big-switches.png' },
        { id: 5, name: 'Cam Switches', productCount: 24, imageUrl: '/images/big-switches.png' },
    ]

    return (
        <Carousel className="w-full cursor-grab">
            <CarouselContent className="xl:mx-20 mx-5">
                {categories.map((category, index) => (
                    <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/4 max-sm:pl-0 max-sm:basis-1/2">
                        <div className="p-1 max-sm:p-2">
                            <Card className='select-none cursor-pointer bg-secondary flex flex-col pt-10 gap-10 justify-between items-center group overflow-hidden max-sm:gap-5 dark:bg-card max-sm:pt-5'>
                                <div>
                                    <h4 className='text-tertiary font-bold text-xl text-center dark:text-tertiary-foreground max-sm:text-lg'>{category.name}</h4>
                                    <p className='text-center text-muted-foreground text-sm max-sm:text-xs'>{category.productCount} products</p>
                                </div>
                                <div className='h-40 justify-items-center flex max-sm:h-30'>
                                    <Image src={category.imageUrl} alt={category.name} width={100} height={100} className="mx-2 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CategoryCarousel