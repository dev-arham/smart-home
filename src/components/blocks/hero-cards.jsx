'use client'
import React from 'react'
import HeroCard from '../ui/hero-card'
import { useFadeIn } from '@/hooks/use-fade-in'

const HeroCards = () => {
    const leftCard = useFadeIn({ direction: 'left', threshold: 0.2 })
    const rightCard = useFadeIn({ direction: 'right', threshold: 0.2 })

    return (
        <div className='flex justify-center items-center gap-5  mx-auto mb-20 max-sm:flex-col max-xl:px-5 max-sm:mb-10'>
            <div ref={leftCard.ref} style={leftCard.animationStyles}>
                <HeroCard item={{
                    id: 1,
                    badge: "Get the best switches for less",
                    title: "Hurry and take up to 35% off.",
                    imageUrl: '/images/big-switches.png',
                }} />
            </div>
            <div ref={rightCard.ref} style={rightCard.animationStyles}>
                <HeroCard item={{
                    id: 2,
                    badge: "Upgrade your home with LED lights",
                    title: "Brighten up your life",
                    subTitle: "Imagine what home could be",
                    imageUrl: '/images/led-lights.png',
                }} />
            </div>
        </div>
    )
}

export default HeroCards