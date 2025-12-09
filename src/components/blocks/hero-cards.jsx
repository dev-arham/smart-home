import React from 'react'
import HeroCard from '../ui/hero-card'

const HeroCards = () => {
    return (
        <div className='flex justify-center items-center gap-5 container mx-auto mb-20 max-sm:flex-col max-sm:px-5 max-sm:mb-10 select-none cursor-pointer'>
            <HeroCard item={{
                id: 1,
                badge: "Discover comfort and style",
                title: "Homewear",
                subTitle: "Comfortable and stylish",
                imageUrl: '/images/home-appliances-bg.png',
            }} />
            <HeroCard item={{
                id: 2,
                badge: "Get cooking with the best",
                title: "Kitchenwear",
                subTitle: "Essentials for your kitchen",
                imageUrl: '/images/kitchenwear-bg.jpg',
            }} />
        </div>
    )
}

export default HeroCards