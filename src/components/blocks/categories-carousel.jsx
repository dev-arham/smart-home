import React from 'react'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'

const CategoryCarousel = () => {
    return (
        <Carousel className="w-full cursor-grab">
            <CarouselContent className="mx-20 max-sm:mx-5">
                {Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/5 max-sm:pl-0 max-sm:basis-1/2">
                        <div className="p-1 max-sm:p-2">
                            <Card className='bg-secondary flex flex-col pt-10 gap-20 justify-between items-center group overflow-hidden max-sm:gap-5 dark:bg-card max-sm:pt-5'>
                                <div>
                                    <h4 className='text-tertiary font-bold text-xl text-center dark:text-tertiary-foreground'>Smart Hubs</h4>
                                    <p className='text-center text-muted-foreground text-sm max-sm:text-xs'>3 products</p>
                                </div>
                                <div className='h-60 justify-items-center flex max-sm:h-30'>
                                    <Image src="/images/product-two.png" alt="Category 1" width={100} height={100} className="mx-2 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
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