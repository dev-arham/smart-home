"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Cpu } from "lucide-react";
import HeroOrbit from "./hero-orbit";
import FloatingShapes from "./floating-shapes";
import { Marquee } from "@/components/ui/marquee";

const MARQUEE_ITEMS = [
  "ISO-9001 Certified",
  "40+ Years of Heritage",
  "Made for Modern Living",
  "Smart + Traditional Electrical",
  "Pakistan · Dubai · UK",
  "Voice + App Control",
];

export default function HeroV2() {
  const sectionRef = useRef(null);

  // Mouse-parallax values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(my, { stiffness: 50, damping: 20 });
  const orbitX = useTransform(smoothX, (v) => v * 18);
  const orbitY = useTransform(smoothY, (v) => v * 18);
  const orbX2 = useTransform(smoothX, (v) => v * -40);
  const orbY2 = useTransform(smoothY, (v) => v * -40);

  const onPointerMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) / rect.width);
    my.set((e.clientY - cy) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden bg-background pt-28 pb-20 sm:pt-32 md:pt-36 md:pb-28 min-h-[90vh] flex flex-col justify-center"
    >
      {/* ── Ambient orbs with parallax ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{ x: orbX2, y: orbY2 }}
      >
        <div
          className="hero-orb bg-primary/40"
          style={{ width: 520, height: 520, top: -120, left: "-10%" }}
        />
        <div
          className="hero-orb bg-accent/30"
          style={{
            width: 440,
            height: 440,
            top: "30%",
            right: "-8%",
            animation: "orbDrift 14s ease-in-out infinite",
          }}
        />
        <div
          className="hero-orb bg-primary/25"
          style={{
            width: 360,
            height: 360,
            bottom: "-10%",
            left: "25%",
            animation: "floatSlow 12s ease-in-out infinite",
          }}
        />
      </motion.div>

      {/* ── Dot grid overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-dots opacity-60 [mask-image:radial-gradient(900px_500px_at_50%_30%,black,transparent)]"
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} 
      />

      {/* ── Floating SVG shapes ── */}
      <FloatingShapes variant="hero" />

      <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* ── Left: text column ── */}
          <div className="relative z-10 text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-5 font-semibold tracking-tight text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] will-change-transform"
            >
              <span className="block text-foreground drop-shadow-sm">Electrify</span>
              <span className="block text-gradient-brand bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent drop-shadow-md">every room.</span>
              <span className="mt-4 block font-light text-muted-foreground text-[clamp(1.1rem,1.8vw,1.4rem)] tracking-wide">
                Smart and traditional, engineered as one.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="mx-auto mt-6 max-w-xl text-balance text-[16px] leading-[1.7] text-muted-foreground lg:mx-0 lg:text-[18px] will-change-transform"
            >
              From precision switchgear to voice-controlled ambient lighting,
              Aqua builds the electrical backbone for a life that feels
              effortless — tough enough for daily use, refined enough to
              notice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <Link
                href="/aqua-smart"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--color-primary)] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <Zap className="h-4 w-4" />
                Explore Aqua Smart
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="absolute inset-x-6 bottom-0 h-px shimmer-line" />
              </Link>

              <Link
                href="/aqua-electrical"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-xl px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-accent/40 shadow-sm sm:w-auto"
              >
                Explore Aqua Electrical
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-left sm:gap-6 lg:mt-12"
            >
              <TrustItem icon={ShieldCheck} label="ISO Certified" />
              <TrustItem icon={Cpu} label="App + Voice Ready" />
              <TrustItem icon={Zap} label="Built to Last" />
            </motion.div>
          </div>

          {/* ── Right: SVG orbit infographic with parallax ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ x: orbitX, y: orbitY }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <HeroOrbit />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom marquee ── */}
      <div className="relative mt-16 border-y border-white/5 bg-white/[0.015] py-3 sm:mt-20 overflow-hidden">
        <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <Marquee className="[--duration:40s] [--gap:2.5rem]" repeat={4}>
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground/40 whitespace-nowrap"
              >
                <span className="h-1 w-1 rounded-full bg-accent/60" />
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
        <Icon className="h-4 w-4 text-accent" />
      </span>
      <span className="text-xs font-medium text-foreground/70 sm:text-sm">
        {label}
      </span>
    </div>
  );
}
