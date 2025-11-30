import React from 'react'
import HeroCard from '../ui/hero-card'

const HeroCards = () => {
    return (
        <div className='flex justify-center items-center gap-5 container mx-auto mb-20 max-sm:flex-col max-sm:px-5 max-sm:mb-10'>
            <HeroCard item={{
                id: 1,
                badge: "Upgrade your home and save big",
                title: "Hurry and take up to 35% off.",
                imageUrl: '/product-one-bg.jpg',
            }} />
            <HeroCard item={{
                id: 2,
                badge: "Get the best for less",
                title: "Smart home devices on sale",
                subTitle: "Imagine what home could be",
                imageUrl: '/product-one-bg.jpg',
            }} />
        </div>
    )
}

export default HeroCards