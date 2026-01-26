'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useFadeIn } from '@/hooks/use-fade-in'
import { Mail, Bell, Gift } from 'lucide-react'

const Newsletter = () => {
  const fadeUp = useFadeIn({ direction: 'up', threshold: 0.3 })
  
  const FloatingIcon = ({ Icon, delay, duration }) => (
    <div 
      className='absolute opacity-10 pointer-events-none'
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <Icon size={80} className='text-blue-600' strokeWidth={1} />
    </div>
  )

  return (
    <div 
      ref={fadeUp.ref} 
      style={fadeUp.animationStyles}
      className='relative flex flex-col gap-8 justify-center items-center w-full min-h-screen py-20 px-4 text-center max-lg:py-16 max-sm:py-10 bg-linear-to-r from-blue-50 via-white to-blue-50 overflow-hidden'
    >
      {/* Animated background icons */}
      <FloatingIcon Icon={Mail} delay={0} duration={6} />
      <FloatingIcon Icon={Bell} delay={2} duration={7} />
      <FloatingIcon Icon={Gift} delay={1} duration={8} />
      
      {/* Content */}
      <div className='relative z-10 max-w-3xl'>
        <div className='mb-8 flex justify-center gap-4'>
          <div className='p-3 bg-blue-100 rounded-full'>
            <Mail className='text-blue-600' size={32} />
          </div>
          <div className='p-3 bg-blue-100 rounded-full'>
            <Gift className='text-blue-600' size={32} />
          </div>
          <div className='p-3 bg-blue-100 rounded-full'>
            <Bell className='text-blue-600' size={32} />
          </div>
        </div>

        <h2 className='text-6xl text-gray-900 font-bold mb-4 leading-tight max-lg:text-5xl max-sm:text-3xl'>
          Join Our Newsletter
        </h2>
        
        <p className='text-xl text-blue-600 font-semibold mb-6 max-lg:text-lg max-sm:text-base'>
          Get exclusive offers & early access to new products
        </p>
        
        <p className='text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed max-sm:text-base'>
          Subscribe now and receive exclusive discounts, smart home tips, and early access to new products. Be the first to know about our latest innovations and special promotions.
        </p>

        <Button size='lg' className='text-lg px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold'>
          Subscribe Now
        </Button>

        <p className='text-sm text-gray-500 mt-6'>
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.08; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.12; }
        }
      `}</style>
    </div>
  )
}

export default Newsletter