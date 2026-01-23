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
        <div className='container mx-auto flex gap-20 mt-20 max-sm:flex-col max-xl:px-5 max-xl:gap-10 max-lg:flex-wrap max-lg:gap-0'>
            <div ref={imageAnim.ref} style={imageAnim.animationStyles} className='w-full'>
                <Card className='w-full overflow-hidden group p-0'>
                    <Image src='/images/lookbook-new.png' alt='' width={800} height={400} className='w-full h-full object-cover group-hover:scale-102 transition-transform duration-300' />
                </Card>
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