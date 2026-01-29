'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { useFadeIn } from '@/hooks/use-fade-in'
import CustomerReviews from './customer-reviews'

const VideoBanner = () => {
    const isMobile = useIsMobile();
    const bannerFade = useFadeIn({ direction: 'up', threshold: 0.2, duration: 800 })
    const [showReviews, setShowReviews] = useState(false)
    const containerRef = useRef(null)
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight / 2) {
                    setShowReviews(true)
                } else if (entry.boundingClientRect.top > window.innerHeight) {
                    setShowReviews(false)
                }
            },
            { threshold: 0.1 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])
    
    return (
        <div ref={containerRef} className='relative w-full'>
            <div ref={bannerFade.ref} style={bannerFade.animationStyles} className='mx-auto max-xl:p-5'>
                <div className='relative h-[80vh] max-sm:h-[60vh] rounded-none overflow-hidden flex items-center justify-center bg-black'>
                    {/* Video */}
                    <video
                        width="100%"
                        height="100%"
                        autoPlay
                        muted
                        loop
                        controls
                        className='w-full h-full object-cover'
                    >
                        <source src="/images/MtronicHomePageVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            
            {/* CustomerReviews - Show on scroll, overlay on top */}
            <div className={`absolute left-0 right-0 top-0 h-[80vh] max-sm:h-[60vh] flex items-end transition-all duration-500 ease-out transform pointer-events-none ${
                showReviews 
                    ? 'opacity-100 pointer-events-auto' 
                    : 'opacity-0'
            }`}>
                <div className='w-full'>
                    {/* <CustomerReviews /> */}
                </div>
            </div>
        </div>
    )
}

export default VideoBanner