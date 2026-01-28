import Categories from '@/components/blocks/categories'
import CustomerReviews from '@/components/blocks/customer-reviews'
import DayLightSection from '@/components/blocks/day-light-section'
import DisplayCards from '@/components/blocks/display-cards'
import Faq from '@/components/blocks/faq'
import FeaturedProducts from '@/components/blocks/featured-products'
import Footer from '@/components/blocks/footer'
import Header from '@/components/blocks/header'
import HeroCards from '@/components/blocks/hero-cards'
import { HeroSlider } from '@/components/blocks/hero-slider'
import LookBook from '@/components/blocks/lookbook'
import Newsletter from '@/components/blocks/newsletter'
import OurTeam from '@/components/blocks/our-team'
import Services from '@/components/blocks/services'
import SmartHomeHero from '@/components/blocks/smart-home-hero'
import StayConnected from '@/components/blocks/stay-connected'
import VideoBanner from '@/components/blocks/video-banner'
import FeaturesAutomation from '@/components/blocks/features-automation'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <Header />
      <HeroSlider  />
      <HeroCards />
      {/* <Categories /> */}
      {/* <FeaturedProducts /> */}
      <DayLightSection />
      <FeaturesAutomation />
      <DisplayCards />
      {/* <SmartHomeHero /> */}
      <VideoBanner />
      <CustomerReviews />
      <Services />
      <LookBook />
      <StayConnected />
      <OurTeam />
      <Faq />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  )
}

export default page