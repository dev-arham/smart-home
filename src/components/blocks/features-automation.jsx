'use client'
import React from 'react'
import { MicSVG } from '@/components/ui/mic-svg'
import { RobotSVG } from '@/components/ui/robot-svg'
import { useFadeIn } from '@/hooks/use-fade-in'
import { Card, CardContent } from '@/components/ui/card'

const FeaturesAutomation = () => {
  const fadeUp = useFadeIn({ direction: 'up', threshold: 0.3 })
  
  return (
    <div
      ref={fadeUp.ref}
      style={fadeUp.animationStyles}
      className=" p-5 bg-gray-100 mx-auto mb-16 max-xl:px-5 max-sm:text-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-8">
        {/* Voice Assisted Section */}
        <Card className="shadow-none rounded-none">
          <CardContent className="flex flex-col items-center justify-center text-center md:text-left md:items-start gap-6 pt-6">
            {/* Icon with background */}
            <div className="flex justify-center md:justify-start">
              {/* <MicSVG width={100} height={100} /> */}
            </div>
            
            {/* Label */}
            <div className="text-sm font-semibold text-blue-600 tracking-wide">
              Voice Assisted
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
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
            <div className="flex justify-center md:justify-start">
              {/* <RobotSVG width={100} height={100} /> */}
            </div>
            
            {/* Label */}
            <div className="text-sm font-semibold text-blue-600 tracking-wide">
              Fully Automated
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
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
