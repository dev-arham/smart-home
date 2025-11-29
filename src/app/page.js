import Categories from '@/components/blocks/categories'
import DayLightSection from '@/components/blocks/day-light-section'
import DisplayCards from '@/components/blocks/display-cards'
import Header from '@/components/blocks/header'
import HeroCards from '@/components/blocks/hero-cards'
import { HeroSlider } from '@/components/blocks/hero-slider'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <Header />
      <HeroSlider />
      <HeroCards />
      <Categories />
      <DayLightSection />
      <DisplayCards />
    </div>
  )
}

export default page