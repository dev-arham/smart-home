import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import CategoryCard from '../ui/category-card'

const DisplayCards = () => {
    return (
        <div className='container mx-auto flex items-center gap-5 mb-20'>
            <CategoryCard image='/images/card-bg-one.jpg' badge='Basic - Tech' title='Home Security Camera' />
            <CategoryCard image='/images/card-bg-two.jpg' badge='Sale 10% Off' title='Alarm System Security' />
            <CategoryCard image='/images/card-bg-three.jpg' badge='Best Sellers' title='Choose Your Smart Home Hubs' />
        </div>
    )
}

export default DisplayCards