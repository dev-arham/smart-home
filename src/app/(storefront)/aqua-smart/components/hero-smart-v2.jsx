"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Wifi, Cpu, ShieldCheck, Smartphone, Zap } from "lucide-react";
import FloatingShapes from "@/components/blocks/v2/floating-shapes";
import { Marquee } from "@/components/ui/marquee";

const MARQUEE_ITEMS = [
  "WiFi Smart Switches",
  "Scene Automation",
  "Voice Control",
  "Tuya & Smart Life",
  "Alexa & Google Home",
  "Zigbee & SigMesh",
  "Energy Monitoring",
  "App Connected",
];

const SMART_ROOMS = [
  { label: "Living Room", status: "3 on", on: true },
  { label: "Bedroom", status: "1 on", on: true },
  { label: "Kitchen", status: "Off", on: false },
  { label: "Security", status: "Armed", on: true },
];

export default function HeroSmartV2() {
  const sectionRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(my, { stiffness: 50, damping: 20 });
  const orbX = useTransform(smoothX, (v) => v * -40);
  const orbY = useTransform(smoothY, (v) => v * -40);
  const cardX = useTransform(smoothX, (v) => v * 14);
  const cardY = useTransform(smoothY, (v) => v * 14);

  const onPointerMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden bg-background pt-28 pb-20 sm:pt-32 md:pt-36 md:pb-28 min-h-[88vh] flex flex-col justify-center"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{ x: orbX, y: orbY }}
      >
        <div
          className="hero-orb bg-primary/40"
          style={{ width: 560, height: 560, top: -140, left: "-12%" }}
        />
        <div
          className="hero-orb bg-accent/25"
          style={{ width: 460, height: 460, top: "30%", right: "-10%" }}
        />
        <div
          className="hero-orb bg-primary/20"
          style={{ width: 380, height: 380, bottom: "-8%", left: "22%" }}
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-dots opacity-60 [mask-image:radial-gradient(900px_500px_at_50%_30%,black,transparent)]"
      />

      <FloatingShapes variant="hero" />

      <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

          {/* Left: text */}
          <div className="relative z-10 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-primary"
            >
              <Wifi className="h-3.5 w-3.5" />
              Collection 01 · Aqua Smart
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-5 font-semibold tracking-tight text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.97] will-change-transform"
            >
              <span className="block text-foreground drop-shadow-sm">Intelligence,</span>
              <span className="block text-gradient-brand bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent drop-shadow-md">
                wired in.
              </span>
              <span className="mt-4 block font-light text-muted-foreground text-[clamp(1rem,1.8vw,1.35rem)] tracking-wide">
                Your home, fully in sync with your life.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="mx-auto mt-6 max-w-xl text-balance text-[16px] leading-[1.7] text-muted-foreground lg:mx-0 lg:text-[18px]"
            >
              Wi-Fi switches, voice-ready lighting, scene automations and sensors — a
              complete smart ecosystem built for every room in your home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <Link
                href="/category"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--color-primary)] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <Wifi className="h-4 w-4" />
                Shop Smart Home
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
              <TrustItem icon={Wifi} label="WiFi & Zigbee" />
              <TrustItem icon={Cpu} label="App & Voice" />
              <TrustItem icon={ShieldCheck} label="Safe-Fail Design" />
            </motion.div>
          </div>

          {/* Right: smart app preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ x: cardX, y: cardY }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none hidden lg:block"
          >
            <div className="absolute -inset-6 -z-10 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-card/80 backdrop-blur-xl p-5 shadow-2xl">
              {/* App header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-xs font-medium text-foreground">Aqua Smart · Home</span>
                </div>
                <span className="text-[11px] text-muted-foreground">8 devices active</span>
              </div>

              {/* Rooms grid */}
              <div className="grid grid-cols-2 gap-3">
                {SMART_ROOMS.map((room, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-4 transition-colors ${
                      room.on
                        ? "border-primary/30 bg-primary/10"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Smartphone
                        className={`h-4 w-4 ${room.on ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          room.on ? "animate-pulse bg-primary" : "bg-muted-foreground/40"
                        }`}
                      />
                    </div>
                    <p className="text-xs font-medium text-foreground">{room.label}</p>
                    <p
                      className={`text-[11px] ${
                        room.on ? "text-primary/80" : "text-muted-foreground"
                      }`}
                    >
                      {room.status}
                    </p>
                  </div>
                ))}
              </div>

              {/* Energy bar */}
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Energy today</span>
                  <span className="text-[11px] font-semibold text-foreground">4.2 kWh</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: "58%" }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Scene chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["Movie Night", "Morning", "Away", "Sleep"].map((scene) => (
                  <span
                    key={scene}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-foreground/60"
                  >
                    {scene}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative mt-16 border-y border-white/5 bg-white/[0.015] py-3 sm:mt-20 overflow-hidden">
        <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <Marquee className="[--duration:40s] [--gap:2.5rem]" repeat={4}>
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground/40 whitespace-nowrap"
              >
                <span className="h-1 w-1 rounded-full bg-primary/60" />
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
      <span className="text-xs font-medium text-foreground/70 sm:text-sm">{label}</span>
    </div>
  );
}
