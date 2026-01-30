"use client";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import TypingText from "../ui/typing-text";

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  const slides = [
    {
      id: 1,
      badge: "Upgrade your home and save big",
      title: "Imagine what home could be",
      subTitle: "Hurry and take up to 35% off on selected smart home products",
      imageUrl: "/images/mtronic-pk-products-banner.webp",
    },
    {
      id: 2,
      badge: "Upgrade your home and save big",
      title: "Smart Home Essentials",
      subTitle: "Enjoy great prices accross the range of smart home products",
      imageUrl: "/images/slide.png",
    },
    {
      id: 3,
      badge: "Smart Living Solutions",
      title: "Transform Your Living Space",
      subTitle:
        "Discover the latest in home automation technology at unbeatable prices",
      imageUrl: "/images/mtronic-german-engineering-banner.webp",
    },
    {
      id: 4,
      badge: "Limited Time Offer",
      title: "Premium Smart Home ",
      subTitle: "Get up to 40% discount on exclusive smart home collections",
      imageUrl: "/images/luxury-living-bg.webp",
    },
  ];
  return (
    <div className="w-full h-screen">
      <Carousel
        className="h-screen mx-auto z-3"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 6500, stopOnInteraction: true }), Fade()]}
        setApi={setApi}
      >
        <CarouselContent className="h-screen">
          {slides.map((item, index) => (
            <CarouselItem key={item.id} className="h-screen">
              <div className="p-0 h-screen relative">
                <Card
                  className="h-screen border-none shadow-none"
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                  <CardContent className="relative flex h-screen items-center justify-center px-20 max-sm:p-5 select-none md:px-10">
                    <div className="max-sm:w-full max-sm:text-center w-full text-center rounded-lg p-8 max-sm:p-5">
                      <p 
                        key={`badge-${index}-${activeIndex}`}
                        className="text-primary text-sm font-bold uppercase mb-2 max-sm:text-xs max-sm:mb-1 animate-fade-in"
                        style={{ animation: 'fadeInUp 0.6s ease-out forwards', opacity: 0 }}
                      >
                        {item.badge}
                      </p>
                      <h2 className="text-6xl text-white font-black capitalize mb-3 max-sm:text-4xl max-sm:mb-1 max-lg:text-4xl drop-shadow-lg">
                       
                      <TypingText 
                        key={`typing-${index}-${activeIndex}`}
                        text={[item.title]}
                        as="p"
                        typingSpeed={65}
                        initialDelay={200}
                        loop={false}
                        showCursor={false}
                        className="fade-out-top text-8xl text-white font-semibold mb-3 text-center max-sm:text-2xl md:text-8xl"
                    />
                      </h2>
                      <p 
                        key={`subtitle-${index}-${activeIndex}`}
                        className="text-md text-gray-100 mb-6 max-sm:text-xs max-sm:mb-4 drop-shadow-lg"
                        style={{ animation: 'fadeInUp 0.6s ease-out 0.3s forwards', opacity: 0 }}
                      >
                        {item.subTitle}
                      </p>
                      <Button
                        size="lg"
                        className=" bg-linear-to-r from-blue-500 to-blue-800 px-12 py-7 rounded-full text-xl font-bold"
                      >
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
