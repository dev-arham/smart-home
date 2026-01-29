'use client'
import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { useFadeIn } from '@/hooks/use-fade-in'

const LookBook = () => {
    const imageAnim = useFadeIn({ direction: 'left', threshold: 0.2 })
    const contentAnim = useFadeIn({ direction: 'right', threshold: 0.2, delay: 200 })
    
    return (
        <div className='container mx-auto flex gap-20 my-20 max-sm:flex-col max-xl:px-5 max-xl:gap-10 max-lg:flex-wrap max-lg:gap-0'>
            <div ref={imageAnim.ref} style={imageAnim.animationStyles} className='w-full perspective-[1000px]'>
                <Card 
                    className='w-full overflow-hidden group p-0 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-shadow duration-500 ease-out animate-float-tilt'
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <Image src='/images/lookbook-new.png' alt='' width={800} height={400} className='w-full h-full object-cover  transition-transform duration-300' />
                </Card>
                <style jsx>{`
                    @keyframes floatTilt {
                        0%, 100% {
                            transform: rotateX(8deg) rotateY(-3deg) translateY(0px);
                        }
                        50% {
                            transform: rotateX(4deg) rotateY(3deg) translateY(-10px);
                        }
                    }
                    :global(.animate-float-tilt) {
                        animation: floatTilt 4s ease-in-out infinite;
                    }
                `}</style>
            </div>
            <div ref={contentAnim.ref} style={contentAnim.animationStyles} className='flex flex-col gap-5 justify-center max-sm:items-center max-xl:py-10'>
                <h3 className='xl:w-1/2 max-xl:w-2/3 text-4xl text-tertiary font-bold max-sm:w-full max-sm:text-3xl max-sm:text-center dark:text-tertiary-foreground max-lg:w-full'>Build a smarter home one device at a time.</h3>
                <p className='w-3/4 mb-10 max-sm:w-full max-sm:text-center max-xl:mb-2 max-lg:w-full'>Bring your devices together for more personalized help around the home.1 And create automations to simplify everyday tasks tailored to your needs.2</p>
                <Button variant='outline' size='lg' className='w-fit text-primary dark:text-tertiary-foreground'>Read The Article <ChevronRight /></Button>
            </div>
        </div>
    )
}

export default LookBook