import React from 'react'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const CustomerReviews = () => {
    return (
        <div className='w-full mx-auto overflow-x-hidden mb-20 -mt-20 max-sm:mb-10'>
            <Carousel className="w-full z-3 cursor-grab">
                <CarouselContent className="mx-10">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4">
                            <div className="p-1">
                                <Card className='bg-secondary flex flex-col p-10 justify-between max-sm:p-5 max-sm:text-sm dark:bg-card'>
                                    <div className='flex gap-5'>
                                        <Avatar className='w-16 h-16'>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>User</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p>★★★★☆</p>
                                            <h4 className='text-tertiary font-bold text-xl dark:text-tertiary-foreground'>Teressa Holland</h4>
                                            <p className='text-muted-foreground text-sm'>Business Manager</p>
                                        </div>
                                    </div>
                                    {/* <Image src="/images/product-two.png" alt="Category 1" width={100} height={100} className="mx-2 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /> */}
                                    <p className='text-center'>The Smart Thermostat Premium consistently kept my home more comfortable than any of the other thermostats I tested, and it even saved more energy in the process (bills were at least 7% lower than in the same period the prior year)</p>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default CustomerReviews