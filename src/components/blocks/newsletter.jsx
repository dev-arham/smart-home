'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useFadeIn } from '@/hooks/use-fade-in'

const Newsletter = () => {
  const fadeUp = useFadeIn({ direction: 'up', threshold: 0.3 })
  
  return (
    <div ref={fadeUp.ref} style={fadeUp.animationStyles} className='flex flex-col gap-5 justify-center items-center container mx-auto w-4/12 text-4xl text-tertiary font-bold capitalize mb-20 text-center max-lg:w-full max-sm:px-5 max-sm:text-3xl max-sm:mb-10 dark:text-tertiary-foreground'>
      Join newsletter and get awesome discount for your next order!
      <Button>Subscribe Now!</Button>
    </div>
  )
}

export default Newsletter