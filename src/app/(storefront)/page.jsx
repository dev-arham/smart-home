import Footer from '@/components/blocks/footer'
import Header from '@/components/blocks/header'
import React from 'react'
import HeroComponent from '@/components/blocks/HeroComponent'
import ImmersiveSlider from '@/components/blocks/immersive-slider'
import Global from '@/components/blocks/Global'
import ContactUS from '@/components/blocks/ContactUs'
import HomeVideo from '@/components/blocks/HomeVideo'
import Showcase from '@/components/blocks/showcase'
import StayInspired from '@/components/blocks/StayInspired'
import HeroAbout from '@/components/blocks/hero-about'
import StayInspiredCards from '@/components/blocks/StayInspiredCards'

const page = () => {
  return (
    <div className='w-full'>
      <Header />
      <ImmersiveSlider />
      <section className='relative overflow-visible bg-slate-950 text-white'>
        <div className="relative z-10 px-4 pb-4 ">
          <StayInspired />
          <HeroAbout />
          <StayInspiredCards />
        </div>
      </section>
      {/* <HeroComponent /> */}
      <Global />
      <HomeVideo />
      <Showcase />
      <ContactUS />
      <Footer />
    </div>
  )
}

export default page