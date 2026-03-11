import Footer from '@/components/blocks/footer'
import Header from '@/components/blocks/header'
import React from 'react'
import HeroComponent from '@/components/blocks/HeroComponent'
import Global from '@/components/blocks/Global'
import ContactUS from '@/components/blocks/ContactUs'
import HomeVideo from '@/components/blocks/HomeVideo'
import Showcase from '@/components/blocks/showcase'

const page = () => {
  return (
    <div className='w-full'>
      <Header />
      <HeroComponent />
      <Global />
      <HomeVideo />
      <Showcase />
      <ContactUS />
      <Footer />
    </div>
  )
}

export default page