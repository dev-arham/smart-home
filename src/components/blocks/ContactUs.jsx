"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone, ShoppingBag, ExternalLink, Send, CheckCircle, User, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

export default function ContactUS() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  return (
    <section className="pt-16 bg-white mt-15">
      <div 
        className=" mx-auto px-4 h-50 bg-cover bg-center rounded-lg shadow-lg flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('./images/slider-bg.jpg')" }}
      >
        <h2 className="text-[#e81e32] font-bold mb-8 text-center text-8xl">Contact Us</h2>
      </div>

      {/* Three Info Cards Section */}
      <div className="bg-[#faf8f5] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 - Address */}
            <Card className="bg-transparent border-transparent  shadow-none hover:shadow-md hover:border-[#e81e32]/30 transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                  For Post & Letters Only
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-foreground/70">
                <p className="font-medium text-foreground">Aqua Electrical</p>
                <p>Shop No. 123, Main Boulevard</p>
                <p>DHA Phase 6</p>
                <p>Karachi , 54000</p>
              </CardContent>
            </Card>

            {/* Card 2 - Contact Online */}
            <Card className="bg-transparent border-transparent  shadow-none hover:shadow-md hover:border-[#e81e32]/30 transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground text-left">
                  Catch Us Online
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <a 
                  href="mailto:aquaelectrical@gmail.com" 
                  className="text-sm text-foreground/70 hover:text-[#e81e32] transition-colors"
                >
                  aquaelectrical@gmail.com
                </a>
                <div className="flex items-start justify-start gap-4 mt-4">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-[#e81e32] transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-[#e81e32] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 - Quick Links */}
            <Card className="bg-transparent border-transparent  shadow-none hover:shadow-md hover:border-[#e81e32]/30 transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground text-left">
                  Our Wonderful Products
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-3">
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-[#e81e32] transition-colors underline underline-offset-4"
                >
                  ..Products
                </Link>
                <p className="text-sm font-bold tracking-wider uppercase pt-4 text-foreground">
                  Our Online Shop
                </p>
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-[#e81e32] transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Visit Store
                </Link>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Right Side - Contact Form */}
            <Card className="shadow-lg border-0 bg-[#faf8f5]">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 h-11 bg-white border-foreground/20 focus:border-[#e81e32] focus:ring-[#e81e32]/20"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 h-11 bg-white border-foreground/20 focus:border-[#e81e32] focus:ring-[#e81e32]/20"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+92 300 0000000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 h-11 bg-white border-foreground/20 focus:border-[#e81e32] focus:ring-[#e81e32]/20"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pt-2 pr-4 pb-2 rounded-md border border-foreground/20 bg-white text-sm resize-none focus:outline-none focus:border-[#e81e32] focus:ring-2 focus:ring-[#e81e32]/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                      isSubmitted 
                        ? 'bg-green-600 hover:bg-green-600' 
                        : 'bg-[#34327d] hover:bg-[#34327d]'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Have a question or need assistance? We'd love to hear from you. 
                  Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e81e32]/10 shrink-0">
                    <Phone className="h-5 w-5 text-[#e81e32]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <a href="tel:+923368882782" className="text-foreground/70 hover:text-[#e81e32] transition-colors">
                      +92 336 8882782
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e81e32]/10 shrink-0">
                    <Mail className="h-5 w-5 text-[#e81e32]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <a href="mailto:aquaelectrical@gmail.com" className="text-foreground/70 hover:text-[#e81e32] transition-colors">
                      aquaelectrical@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e81e32]/10 shrink-0">
                    <MapPin className="h-5 w-5 text-[#e81e32]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p className="text-foreground/70">
                      Shop No. 123, Main Boulevard<br />
                      DHA Phase 6, Karachi, 54000
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

       
      
      
    </section>
  )
}
