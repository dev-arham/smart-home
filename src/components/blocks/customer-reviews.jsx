'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Autoplay from "embla-carousel-autoplay"
import { usePopUp } from '@/hooks/use-pop-up'

const reviews = [
    {
        name: "Ahmad Khan",
        title: "Software Engineer",
        rating: "★★★★★",
        review: "Bilkul best product hai! Smart lighting system ne mere ghar ka atmosphere badal diya. Temperature control bahut achi hai, aur energy bills main kaafi savings hua.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad"
    },
    {
        name: "Fatima Malik",
        title: "Interior Designer",
        rating: "★★★★★",
        review: "Optimized solution hai yeh! Mere home automation setup bilkul professional lag raha hai. Security features boht solid hain. Clients ko impress karna aasan ho gaya.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zehra"
    },
    {
        name: "Hassan Raza",
        title: "Business Owner",
        rating: "★★★★☆",
        review: "Mera office temperature control perfectly set rehta hai. Ek hi button se sab kuch manage kar sakta hoon. Thoda expensive tha par long-term main money-saving hai definitely.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan"
    },
    {
        name: "Aisha Siddiqui",
        title: "Homemaker",
        rating: "★★★★★",
        review: "Alhamdulillah! Yeh product mere life ko easy kar diya. Summer main ghar theek temperature par rehta hai, aur winter main bhi bilkul comfortable. Installation bilkul simple tha.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
    },
    {
        name: "Tariq Hussain",
        title: "Restaurant Manager",
        rating: "★★★★★",
        review: "Restaurant main climate control bohot zaroori tha. Iska system bilkul reliable hai, aur staff ko bhi manage karna aasan hai. Customers zyada comfortable feel karte hain. Bilkul shukriya!",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tariq"
    },
    {
        name: "Zainab Ali",
        title: "Marketing Executive",
        rating: "★★★★☆",
        review: "Acha product hai! Smart automation features bohot time-saving hain. Kabhi kabhi thoda lag hota hai par overall experience bahut acha raha. Definitely buy it!",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab"
    }
];

const CustomerReviews = () => {
    const containerRef = useRef(null)
    const popUp = usePopUp({ threshold: 0.3, delay: 0, duration: 600 })
    
    return (
        <div ref={popUp.ref} style={popUp.animationStyles} className='w-full mx-auto overflow-x-hidden mb-20 -mt-20 max-sm:mb-10 relative z-10'>
            <Carousel
                opts={{ loop: true }}
                 plugins={[
                    Autoplay({
                    delay: 2000,
                    stopOnInteraction: false,
                    }),
                ]}
                className="w-full z-3 cursor-grab">
                <CarouselContent className="mx-10">
                    {reviews.map((review, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3 2xl:basis-1/3">
                            <div className="p-1">
                                <Card className='select-none bg-secondary flex flex-col p-10 justify-between max-sm:p-5 max-sm:text-sm dark:bg-card shadow-lg'>
                                    <div className='flex gap-5'>
                                        <Avatar className='w-16 h-16'>
                                            <AvatarImage src={review.image} />
                                            <AvatarFallback>{review.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p>{review.rating}</p>
                                            <h4 className='text-tertiary font-bold text-xl dark:text-tertiary-foreground'>{review.name}</h4>
                                            <p className='text-muted-foreground text-sm'>{review.title}</p>
                                        </div>
                                    </div>
                                    <p className='text-center'>{review.review}</p>
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