import Categories from '@/components/blocks/categories'
import CustomerReviews from '@/components/blocks/customer-reviews'
import DayLightSection from '@/components/blocks/day-light-section'
import DisplayCards from '@/components/blocks/display-cards'
import Faq from '@/components/blocks/faq'
import Footer from '@/components/blocks/footer'
import Header from '@/components/blocks/header'
import HeroCards from '@/components/blocks/hero-cards'
import { HeroSlider } from '@/components/blocks/hero-slider'
import LookBook from '@/components/blocks/lookbook'
import Newsletter from '@/components/blocks/newsletter'
import OurTeam from '@/components/blocks/our-team'
import Services from '@/components/blocks/services'
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
      <Services />
      <LookBook />
      <OurTeam />
      <Faq />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default page