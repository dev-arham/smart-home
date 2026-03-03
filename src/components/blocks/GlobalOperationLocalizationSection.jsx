"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCountUp } from "@/hooks/use-count-up";

/**
 * Counter component with animated number
 */
function Counter({ value, suffix = "", label, isInView }) {
  const count = useCountUp(value, 1500, isInView);

  return (
    <Card className="border-none  transition-shadow duration-300 bg-transparent shadow-none hover:shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <div className="text-5xl font-normal text-black">
            {count}
            {suffix && <span className="text-black">{suffix}</span>}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Global Operation Localization Section
 * Enterprise-grade section showcasing global presence with animated statistics
 */
export default function GlobalOperationLocalizationSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const stats = [
    { value: 140, suffix: "+", label: "Countries and regions" },
    { value: 40, suffix: "+", label: "Subsidiary corporation" },
    { value: 2300, suffix: "+", label: "Global distributor" },
    { value: 66, suffix: "%", label: "International talent localization rate" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-muted py-24"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Heading with Blue Accent Bar */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-3 h-16 bg-linear-to-b from-blue-600 to-cyan-400 rounded-full" />
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight">
                  Global Operation Localization
                </h2>
              </div>
            </div>
                <p className="text-lg text-muted-foreground font-medium mt-10" >
                  International subsidiaries all over the world
                </p>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              Our extensive
              network of subsidiaries and distributors ensures seamless service
              delivery and support worldwide, backed by a highly skilled
              international team committed to excellence.
            </p>

            {/* Learn More Button */}
            <Button
              size="lg"
              className="rounded-full group transition-all duration-300 hover:shadow-lg bg-transparent border border-blue-600 text-foreground hover:bg-linear-to-r hover:from-blue-600 hover:to-cyan-400 hover:text-white"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-4 bg-muted">
              {stats.map((stat, index) => (
                <Counter
                  key={index}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative w-full h-125 rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 z-10" />
              <Image
                src="/images/world-placeholder.png"
                alt="Global network map showing worldwide presence"
                fill
                className="object-cover animate-float"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-linear-to-br from-blue-600 to-cyan-400 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-linear-to-br from-purple-600 to-blue-600 rounded-full opacity-10 blur-3xl" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
