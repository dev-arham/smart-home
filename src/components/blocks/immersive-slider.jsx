"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "Future Ready",
    title: "Imagine what",
    titleHighlight: "home could be",
    subTitle: "Hurry and take up to 35% off on selected smart home products",
    imageUrl: "/images/mtronic-pk-products-banner.webp",
  },
  {
    id: 2,
    badge: "Exclusive Range",
    title: "Smart Home",
    titleHighlight: "Essentials",
    subTitle: "Enjoy great prices across the range of smart home products",
    imageUrl: "/images/slide.png",
  },
  {
    id: 3,
    badge: "Smart Living",
    title: "Transform your",
    titleHighlight: "Living Space",
    subTitle: "Discover the latest in home automation technology at unbeatable prices",
    imageUrl: "/images/mtronic-german-engineering-banner.webp",
  },
  {
    id: 4,
    badge: "Premium Quality",
    title: "Luxury Smart",
    titleHighlight: "Control",
    subTitle: "Get up to 40% discount on exclusive smart home collections",
    imageUrl: "/images/luxury-living-bg.webp",
  },
];

const AUTOPLAY_SPEED = 6000;

export default function ImmersiveSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-play logic with progress bar
  useEffect(() => {
    if (isHovered) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
          return 0;
        }
        return prev + 100 / (AUTOPLAY_SPEED / 50); // Updates every 50ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [current, isHovered]);

  // Navigate manually
  const paginate = (direction) => {
    if (direction === 1) {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    } else {
      setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    }
  };

  const slide = slides[current];

  return (
    <section 
      className="relative h-[100svh] w-full overflow-hidden bg-slate-950 select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Immersive Noise Map */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] max-h-screen" />

      {/* Slide Images Container */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Cinematic crossfade
          className="absolute inset-0 z-0 h-full w-full"
        >
          {/* Ken Burns Scale Effect */}
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: AUTOPLAY_SPEED / 1000 + 2, ease: "easeOut" }}
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />

          {/* Deep Cinematic Overlay to match Dark Aqua Theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Engine */}
      <div className="relative z-20 flex h-full w-full items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-[100vw] mx-auto mt-10 sm:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: "easeOut", duration: 0.8 }
              },
              exit: { opacity: 0, x: 40, transition: { duration: 0.5, ease: "easeIn" } }
            }}
            className="flex w-full max-w-2xl xl:max-w-4xl flex-col items-start"
          >
            {/* Cyber / Tech Badge */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              className="mb-4 sm:mb-6 md:mb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/30 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cyan-300">
                  {slide.badge}
                </span>
              </div>
            </motion.div>

            {/* Huge Split Typography */}
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
              }}
              className="mb-4 sm:mb-6 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
            >
              {slide.title} <br />
              <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                {slide.titleHighlight}
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="mb-6 sm:mb-8 md:mb-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-base sm:text-lg font-light leading-relaxed text-slate-300 xl:text-xl"
            >
              {slide.subTitle}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden rounded-full bg-slate-50 px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 text-sm sm:text-base md:text-lg font-bold text-slate-950 shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)] cursor-pointer"
              >
                <Link href="/category" className="flex items-center gap-3">
                  <span className="relative z-10">Explore Products</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 z-0 h-full w-full bg-linear-to-r from-cyan-300 to-blue-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation & Controls */}
      <div className="absolute bottom-8 sm:bottom-8 left-4 right-4 sm:left-12 sm:right-12 md:left-16 md:right-16 lg:left-24 lg:right-24 xl:left-32 xl:right-32 z-30 flex items-center justify-between">
        {/* Slide Counter / Dots */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block text-sm font-medium tracking-widest text-slate-400">
            0{current + 1}
            <span className="mx-2 text-slate-600">/</span>
            0{slides.length}
          </div>
          <div className="flex h-1 gap-1.5 sm:gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`relative h-1 cursor-pointer overflow-hidden rounded-full transition-all duration-500 ${
                  current === idx ? "w-10 sm:w-16 bg-slate-700" : "w-3 sm:w-4 bg-slate-800 hover:bg-slate-600"
                }`}
              >
                {current === idx && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.05 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Direction Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => paginate(-1)}
            className="flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:scale-105"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}