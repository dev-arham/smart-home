'use client'
import React from 'react'
import HeroCard from '../ui/hero-card'
import { usePopUp } from '@/hooks/use-pop-up'

const HeroCards = () => {
    const leftCard = usePopUp({ threshold: 0.2, duration: 600, delay: 300 })
    const rightCard = usePopUp({ threshold: 0.2, duration: 600, delay: 600 })

    return (
        <div className='flex justify-center items-center gap-4 sm:gap-5 my-6 sm:my-10 mx-auto mb-10 sm:mb-20 px-4 sm:px-5 xl:px-0 flex-col sm:flex-row'>
            <div ref={leftCard.ref} style={leftCard.animationStyles} className='w-full sm:w-auto'>
                <HeroCard item={{
                    id: 1,
                    title: "Simple Switches.",
                    imageUrl: '/images/big-switches.png',
                }} />
            </div>
            <div ref={rightCard.ref} style={rightCard.animationStyles} className='w-full sm:w-auto'>
                <HeroCard item={{
                    id: 2,
                    title: "Smart Switches",
                    imageUrl: '/images/smart-switches.png',
                }} />
            </div>
        </div>
    )
}

export default HeroCards