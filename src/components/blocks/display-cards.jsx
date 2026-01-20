'use client'
import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import CategoryCard from '../ui/category-card'
import { useFadeIn } from '@/hooks/use-fade-in'

const DisplayCards = () => {
    const { ref, isVisible } = useFadeIn(0.2)
    
    return (
        <div 
            ref={ref}
            className={`container mx-auto flex items-center gap-5 mb-20 max-sm:flex-col max-xl:px-5 max-sm:mb-10 transition-all duration-700 ease-out ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
            }`}
        >
            <CategoryCard image='/images/card-bg-one.jpg' badge='Basic - Tech' title='Home Security Camera' />
            <CategoryCard image='/images/card-bg-two.jpg' badge='Sale 10% Off' title='Alarm System Security' />
            <CategoryCard image='/images/card-bg-three.jpg' badge='Best Sellers' title='Choose Your Smart Home Hubs' />
        </div>
    )
}

export default DisplayCards