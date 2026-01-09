import React from 'react'
import HeroCard from '../ui/hero-card'

const HeroCards = () => {
    return (
        <div className='flex justify-center items-center gap-5 container mx-auto mb-20 max-sm:flex-col max-xl:px-5 max-sm:mb-10'>
            <HeroCard item={{
                id: 1,
                badge: "Get the best switches for less",
                title: "Hurry and take up to 35% off.",
                imageUrl: '/images/big-switches.png',
            }} />
            <HeroCard item={{
                id: 2,
                badge: "Upgrade your home with LED lights",
                title: "Brighten up your life",
                subTitle: "Imagine what home could be",
                imageUrl: '/images/led-lights.png',
            }} />
        </div>
    )
}

export default HeroCards