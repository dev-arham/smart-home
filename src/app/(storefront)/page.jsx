import Footer from '@/components/blocks/footer'
import Header from '@/components/blocks/header'
import React from 'react'
import ImmersiveSlider from '@/components/blocks/immersive-slider'
import Global from '@/components/blocks/Global'
import ContactUS from '@/components/blocks/ContactUs'
import HomeVideo from '@/components/blocks/HomeVideo'
import Showcase from '@/components/blocks/showcase'
import StayInspired from '@/components/blocks/StayInspired'
import HeroAbout from '@/components/blocks/hero-about'
import StayInspiredCards from '@/components/blocks/StayInspiredCards'
import { FlickeringGrid } from '@/components/ui/flickering-grid'

const page = () => {
  return (
    <div className='w-full'>
      <Header />
      <ImmersiveSlider />
      <section className='relative overflow-visible'>
        <FlickeringGrid
          className="absolute inset-0 z-0 mask-[radial-gradient(450px_circle_at_center,white,transparent)]"
          squareSize={10}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className="relative z-10 px-4 pb-4 ">
          <HeroAbout />
          <StayInspiredCards />
        </div>
      </section>
      <Global />
      <section className='relative overflow-visible bg-slate-950 text-white'>
        <div className="relative z-10 px-4 pb-4 ">
          <StayInspired />
        </div>
      </section>
      <HomeVideo />
      <Showcase />
      <ContactUS />
      <Footer />
    </div>
  )
}

export default page