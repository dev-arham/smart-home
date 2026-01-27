'use client'
import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import CategoryCard from '../ui/category-card'
import { useFadeIn } from '@/hooks/use-fade-in'

const DisplayCards = () => {
    const leftCard = useFadeIn({ direction: 'left', threshold: 0.2, delay: 0 })
    const centerCard = useFadeIn({ direction: 'up', threshold: 0.2, delay: 150 })
    const rightCard = useFadeIn({ direction: 'right', threshold: 0.2, delay: 300 })
    
    return (
        <div className='container mx-auto flex items-center gap-5 my-20 max-sm:flex-col max-xl:px-5 max-sm:mb-10'>
            <div ref={leftCard.ref} style={leftCard.animationStyles} className='w-full'>
                <CategoryCard image='/images/card-bg-one.jpg' badge='Basic - Tech' title='Home Security Camera' />
            </div>
            <div ref={centerCard.ref} style={centerCard.animationStyles} className='w-full'>
                <CategoryCard image='/images/card-bg-two.jpg' badge='Sale 10% Off' title='Alarm System Security' />
            </div>
            <div ref={rightCard.ref} style={rightCard.animationStyles} className='w-full'>
                <CategoryCard image='/images/card-bg-three.jpg' badge='Best Sellers' title='Choose Your Smart Home Hubs' />
            </div>
        </div>
    )
}

export default DisplayCards