
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import HeroVisual from "./hero-visual";
import StayInspired from "./StayInspired";
import StayInspiredCards from "./StayInspiredCards";
import HeroAbout from "./hero-about";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export default function HeroComponent() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative overflow-visible bg-slate-950 text-white">
      {/* Immersive Noise Filter */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] max-h-screen" />

      {/* Atmospheric Glowing Orbs */}
      <motion.div 
        style={{ y: orbY, opacity: opacityFade }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 left-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/30 blur-[100px]" 
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-10 pt-24 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-32 md:grid-cols-2 lg:px-8">
        
        {/* Typographic Engine & Hero Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left flex flex-col items-center md:items-start max-md:mt-10"
        >
          <motion.div variants={itemVariants}>
            <p className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-md">
              Future Ready Homes
            </p>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="mb-6 text-5xl font-extrabold tracking-tight leading-[1.1] text-balance sm:text-6xl lg:text-7xl"
          >
            AquaSmart
            <span className="mt-2 block bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Smart Living, <br className="hidden md:block"/>Simplified.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mx-auto mb-10 max-w-xl text-lg font-light leading-relaxed text-slate-300 sm:text-xl md:mx-0"
          >
            Experience connected comfort with intelligent lighting, security, and
            energy control designed for modern families. Precision engineered for seamless integration.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden rounded-full w-full bg-slate-50 text-slate-950 font-semibold shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.6)] transition-all duration-500 sm:w-auto px-8 py-6 text-base"
            >
              <Link href="/category">
                <span className="relative z-10">Explore Products</span>
                <div className="absolute inset-0 z-0 h-full w-full bg-linear-to-r from-cyan-300 to-blue-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Cinematic Asset Reveal */}
        <motion.div 
          initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-none perspective-1000"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-blue-500/30 to-cyan-400/20 blur-3xl" />
          <motion.div 
            whileHover={{ scale: 1.02, rotateY: -5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative overflow-visible rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-2 sm:p-4 backdrop-blur-xl shadow-2xl shadow-blue-900/20"
          >
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 px-4 pb-4">
        <StayInspired />
        <HeroAbout />
        <StayInspiredCards />
      </div>
    </section>
  );
}
