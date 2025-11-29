import Categories from '@/components/blocks/categories'
import CustomerReviews from '@/components/blocks/customer-reviews'
import DayLightSection from '@/components/blocks/day-light-section'
import DisplayCards from '@/components/blocks/display-cards'
import Header from '@/components/blocks/header'
import HeroCards from '@/components/blocks/hero-cards'
import { HeroSlider } from '@/components/blocks/hero-slider'
import LookBook from '@/components/blocks/lookbook'
import Newsletter from '@/components/blocks/newsletter'
import VideoBanner from '@/components/blocks/video-banner'
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
      <VideoBanner />
      <CustomerReviews />
      <LookBook />
      <Newsletter />
      
    </div>
  )
}

export default page