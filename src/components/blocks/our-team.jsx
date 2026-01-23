"use client"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { useFadeIn } from '@/hooks/use-fade-in'

const OurTeam = () => {
  const headingFade = useFadeIn({ direction: 'fade', threshold: 0.2 })
  
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Leading innovation in smart home technology"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Expert in IoT and home automation systems"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Head of Product Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Creating beautiful and functional smart home experiences"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Lead Software Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Building robust and scalable solutions"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Customer Success Manager",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      bio: "Ensuring exceptional customer satisfaction"
    },
    {
      id: 6,
      name: "James Patterson",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Connecting smart homes with smart people"
    },
    {
      id: 7,
      name: "Amanda Foster",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Driving growth and building partnerships"
    },
    {
      id: 8,
      name: "Robert Kim",
      role: "Head of Security",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Protecting your home and data"
    }
  ]

  return (
    <section className="container mx-auto md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingFade.ref} style={headingFade.animationStyles} className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Passionate professionals dedicated to bringing innovation to your home
          </p>
        </div>

        {/* Team Carousel */}
        <div className="relative w-full mx-auto">
          <Carousel
             opts={{
              align: "start",
              loop: true,
              
            }}
            plugins={[
              Autoplay({
                delay: 2000,
                
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 py-5">
              {teamMembers.map((member) => (
                <CarouselItem key={member.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden group p-0" >
                    <CardContent className="h-full flex flex-col relative p-8">
                      <img src="/images/slider-bg.jpg" alt="" className='absolute inset-0 w-full h-full object-cover opacity-50 z-0'/>
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-muted mx-5 mb-5 rounded-full">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col grow z-10">
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                          {member.name}
                        </h3>
                        <p className="text-sm md:text-base text-primary dark:text-white font-medium mb-2 md:mb-3">
                          {member.role}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                          {member.bio}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-1/2" />
              <CarouselNext className="right-0 translate-x-1/2" />
            </div>
          </Carousel>

          {/* Mobile Navigation Hint */}
          <p className="text-center text-xs md:text-sm text-muted-foreground mt-4 md:hidden">
            Swipe to see more team members
          </p>
        </div>
      </div>
    </section>
  )
}

export default OurTeam
