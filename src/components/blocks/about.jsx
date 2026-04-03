"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Award,
  Users,
  Target,
  Heart,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Home,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import OurTeam from './our-team'


// Values data
const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push boundaries to bring you the latest smart home technology."
  },
  {
    icon: Shield,
    title: "Quality",
    description: "Every product is carefully tested to meet our high standards of excellence."
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here to help every step of the way."
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Our solutions are designed to save energy and make your life easier."
  },
]



// Timeline/Milestones
const milestones = [
  { year: "2009", title: "Company Founded", description: "Started as a small electrical shop in Karachi" },
  { year: "2014", title: "Expansion", description: "Opened 5 more branches across Pakistan" },
  { year: "2018", title: "Smart Home Focus", description: "Pivoted to smart home automation solutions" },
  { year: "2022", title: "Online Launch", description: "Launched e-commerce platform nationwide" },
  { year: "2025", title: "Industry Leader", description: "Recognized as Pakistan's top smart home retailer" },
]

export default function About() {
  return (
    <section className="bg-white">
      {/* Cinematic Hero Banner */}
      <div className="relative w-full h-[60vh] min-h-[500px] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop"
            alt="Smart Home Interconnected"
            className="w-full h-full object-cover object-center transform scale-105 duration-1000"
          />
          <div className="absolute inset-0 bg-zinc-950/60" /> {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-900/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-md text-cyan-300 text-[11px] md:text-[13px] font-bold tracking-[0.2em] relative uppercase mb-2 group cursor-default">
              <Zap className="w-4 h-4 text-cyan-400" />
              Our Story
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              Powering Smart Homes Across <span className="text-cyan-400">Pakistan</span>
            </h1>

            <p className="text-base md:text-xl text-zinc-300/90 leading-relaxed max-w-2xl mx-auto font-light">
              At Aqua Electrical, we're passionate about transforming ordinary homes into
              intelligent living spaces. With over 15 years of experience, we bring you
              the best in smart home automation.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-6"
            >
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-full px-8 h-12 shadow-[0_10px_20px_rgba(8,145,178,0.3)] transition-all">
                <Link href="/products">
                  Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full backdrop-blur-sm px-8 h-12 transition-all">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-4/5 rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src="/images/card-bg-one.jpg"
                      alt="Our journey"
                      width={300}
                      height={375}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src="/images/product-one.png"
                      alt="Our team"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src="/images/card-bg-three.jpg"
                      alt="Our products"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-4/5 rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src="/images/card-bg-two.jpg"
                      alt="Our showroom"
                      width={300}
                      height={375}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Badge className="bg-[#e81e32]/10 text-[#e81e32] hover:bg-[#e81e32]/20 border-0">
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                From a Small Shop to Pakistan's Leading Smart Home Provider
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Aqua Electrical began in 2009 as a humble electrical supply store in Karachi.
                  Our founder, Ahmed Khan, had a vision: to bring modern electrical solutions
                  to every Pakistani home.
                </p>
                <p>
                  Over the years, we've grown from a single shop to a nationwide network,
                  embracing smart home technology along the way. Today, we're proud to be
                  Pakistan's most trusted name in home automation.
                </p>
                <p>
                  Our journey has been driven by one simple belief — that everyone deserves
                  a home that's safe, efficient, and intelligently connected.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#e81e32]" />
                  <span className="font-medium">Certified Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#e81e32]" />
                  <span className="font-medium">Expert Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#e81e32]" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/80 text-lg">
              Join thousands of satisfied customers who have made their homes smarter with Aqua Electrical.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-white/90">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-gray-900 hover:bg-white/90">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-[#e81e32]/10 text-[#e81e32] hover:bg-[#e81e32]/20 border-0 mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-foreground/70">
              Our core values guide everything we do, from product selection to customer service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-[#e81e32]/10 flex items-center justify-center mb-4 group-hover:bg-[#e81e32] transition-colors duration-300">
                    <value.icon className="h-7 w-7 text-[#e81e32] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <OurTeam />




    </section>
  )
}
