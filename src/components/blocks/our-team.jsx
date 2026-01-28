"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useFadeIn } from '@/hooks/use-fade-in'
import { usePopUp } from '@/hooks/use-pop-up'

const OurTeam = () => {
  const headingFade = useFadeIn({ direction: 'fade', threshold: 0.2 })
  
  const teamMembers = [
    // Column 1 - Row 1-2 (pill)
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
      bio: "Leading innovation in smart home technology",
      gridClass: "col-span-1 row-span-2",
      shape: "pill"
    },
    // Column 2 - Row 1 (circle)
    {
      id: 2,
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Expert in IoT and home automation systems",
      gridClass: "col-span-1 row-span-1",
      shape: "circle"
    },
    // Column 3 - Row 1-2 (pill)
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Head of Product Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
      bio: "Creating beautiful and functional smart home experiences",
      gridClass: "col-span-1 row-span-2",
      shape: "pill"
    },
    // Column 4 - Row 1 (circle)
    {
      id: 4,
      name: "David Thompson",
      role: "Lead Software Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Building robust and scalable solutions",
      gridClass: "col-span-1 row-span-1",
      shape: "circle"
    },
    // Column 2 - Row 2-3 (pill)
    {
      id: 5,
      name: "Lisa Wang",
      role: "Customer Success Manager",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop",
      bio: "Ensuring exceptional customer satisfaction",
      gridClass: "col-span-1 row-span-2",
      shape: "pill"
    },
    // Column 4 - Row 2-3 (pill)
    {
      id: 6,
      name: "James Patterson",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop",
      bio: "Connecting smart homes with smart people",
      gridClass: "col-span-1 row-span-2",
      shape: "pill"
    },
    // Column 1 - Row 3 (circle)
    {
      id: 7,
      name: "Amanda Foster",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Driving growth and building partnerships",
      gridClass: "col-span-1 row-span-1",
      shape: "circle"
    },
    // Column 3 - Row 3 (circle)
    {
      id: 8,
      name: "Robert Kim",
      role: "Head of Security",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Protecting your home and data",
      gridClass: "col-span-1 row-span-1",
      shape: "circle"
    }
  ]

  return (
    <section className="container mx-auto py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingFade.ref} style={headingFade.animationStyles} className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[100px] md:auto-rows-[120px] lg:auto-rows-[140px] gap-4 md:gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Team Card Component
const TeamCard = ({ member, index }) => {
  const cardPopUp = usePopUp({ threshold: 0.2, duration: 600, delay: index * 80 })

  const getShapeClasses = () => {
    if (member.shape === 'pill') {
      return 'rounded-full'
    }
    return 'rounded-full aspect-square'
  }

  return (
    <div
      ref={cardPopUp.ref}
      style={cardPopUp.animationStyles}
      className={`${member.gridClass} flex items-center justify-center`}
    >
      <div className={`relative w-full h-full ${getShapeClasses()} overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300`}>
        {/* Profile Image */}
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Hover Overlay with Info */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-600/90 via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 md:p-4 rounded-full">
          <h3 className="text-white font-bold text-center text-xs md:text-sm mb-1">
            {member.name}
          </h3>
          <p className="text-blue-100 font-medium text-center text-xs mb-1">
            {member.role}
          </p>
          <p className="text-blue-50 text-center text-xs line-clamp-2 hidden md:block">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurTeam
