import Header from '@/components/blocks/header'
import HeroCard from '@/components/blocks/hero-card'
import { HeroSlider } from '@/components/blocks/hero-slider'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <Header />
      <HeroSlider />
      <div className='flex justify-center items-center gap-5 container mx-auto'>
        <HeroCard item={{
          id: 1,
          badge: "Upgrade your home and save big",
          title: "Hurry and take up to 35% off.",
          imageUrl: '/product-one-bg.jpg',
        }} />
        <HeroCard item={{
          id: 2,
          badge: "Upgrade your home and save big",
          title: "Hurry and take up to 35% off.",
          subTitle: "Imagine what home could be",
          imageUrl: '/product-one-bg.jpg',
        }} />
      </div>
    </div>
  )
}

export default page