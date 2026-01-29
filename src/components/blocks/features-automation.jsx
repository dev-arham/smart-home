'use client'
import React from 'react'
import { useFadeIn } from '@/hooks/use-fade-in'
import { usePopUp } from '@/hooks/use-pop-up'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const FeaturesAutomation = () => {
  const containerFade = useFadeIn({ direction: 'up', threshold: 0.3 })
  const image1Pop = usePopUp({ threshold: 0.2, delay: 1000, duration: 500 })
  const image2Pop = usePopUp({ threshold: 0.2, delay: 1150, duration: 500 })
  const heading1Fade = useFadeIn({ direction: 'left', threshold: 0.2, delay: 200 })
  const heading2Fade = useFadeIn({ direction: 'left', threshold: 0.2, delay: 400 })
  
  return (
    <div
      ref={containerFade.ref}
      style={containerFade.animationStyles}
      className=" p-5 bg-gray-100 mx-auto mb-16 max-xl:px-5 max-sm:text-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-8">
        {/* Voice Assisted Section */}
        <Card className="shadow-none rounded-none">
          <CardContent className="flex flex-col items-center justify-center text-center md:text-left md:items-start gap-6 pt-6">
            {/* Icon with background */}
            <div ref={image1Pop.ref} style={image1Pop.animationStyles} className="flex justify-center md:justify-start">
              {/* <MicSVG width={100} height={100} /> */}
              <Image src="/images/microphone.gif" alt="Microphone" width={80} height={80} />
            </div>
            
            {/* Label */}
            <div className="text-sm font-semibold text-blue-600 tracking-wide">
              Voice Assisted
            </div>
            
            {/* Heading */}
            <h2 ref={heading1Fade.ref} style={heading1Fade.animationStyles} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              A home that listens to you
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed max-w-md">
              With just a simple command, you can have your home answer your wishes.
            </p>
            
            {/* Badge */}
            <div className="pt-4">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs px-4 py-2 rounded-full border border-blue-200">
                *Aqua Electric is compatible with Google Assistant and Amazon Alexa.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Fully Automated Section */}
        <Card className="shadow-none rounded-none">
          <CardContent className="flex flex-col items-center justify-center text-center md:text-left md:items-start gap-6 pt-6">
            {/* Icon with background */}
            <div ref={image2Pop.ref} style={image2Pop.animationStyles} className="flex justify-center md:justify-start">
              {/* <RobotSVG width={100} height={100} /> */}
              <Image src="/images/robot.gif" alt="Robot" width={80} height={80} />
            </div>
            
            {/* Label */}
            <div className="text-sm font-semibold text-blue-600 tracking-wide">
              Fully Automated
            </div>
            
            {/* Heading */}
            <h2 ref={heading2Fade.ref} style={heading2Fade.animationStyles} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Let your home welcome you every time you walk in!
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed max-w-md">
              Our cutting-edge technology syncs your home to you – your routine, your preferences, taking away all the little worries of everyday life.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FeaturesAutomation
