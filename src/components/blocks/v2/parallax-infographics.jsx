"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import CobeGlobe from "./cobe-globe";
import { Zap, Shield, Cpu, Activity } from "lucide-react";
import Global from "../Global";

const InfographicCard = ({ icon: Icon, value, label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative overflow-hidden rounded-[24px] border border-white/5 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 group-hover:text-blue-300 transition-colors">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-5xl font-light tracking-tighter text-transparent"
        >
          {value}
        </motion.span>
        <span className="mt-2 text-sm font-medium tracking-wide text-white/50 uppercase">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

export default function ParallaxInfographics() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms - using straight numbers for Framer Motion px translations
  const yBg = useTransform(smoothProgress, [0, 1], [0, 200]);
  const yGlobe = useTransform(smoothProgress, [0, 1], [100, -100]);
  const yGrid1 = useTransform(smoothProgress, [0, 1], [50, -50]);
  const yGrid2 = useTransform(smoothProgress, [0, 1], [150, -150]);

  return (
    <section 
      ref={containerRef}
      className="relative flex min-h-[120vh] w-full flex-col items-center justify-center overflow-hidden bg-background py-32"
    >
      {/* Background Parallax Element */}
      <motion.div 
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:120px_120px]" />
      </motion.div>

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-400"
          >
            Global Reach. Local Impact.
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="max-w-4xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-medium tracking-tighter text-transparent sm:text-6xl md:text-7xl leading-tight"
          >
            Powering intelligent spaces across the globe
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 max-w-2xl text-lg text-white/50"
          >
            Our smart infrastructure connects millions of devices, processing real-time analytics to optimize energy, security, and comfort seamlessly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Data Column */}
          <motion.div style={{ y: yGrid1 }} className="flex flex-col gap-6 lg:col-span-3">
            <InfographicCard icon={Activity} value="99.9%" label="Uptime Guarantee" delay={0.1} />
            <InfographicCard icon={Zap} value="40%" label="Energy Savings" delay={0.2} />
          </motion.div>

          {/* Center Globe Parallax */}
          <motion.div 
            style={{ y: yGlobe }}
            className="relative flex items-center justify-center lg:col-span-6"
          >
               {/* <CobeGlobe size={600} className="absolute -rotate-[10deg] opacity-90 mix-blend-screen" /> */}
               <Global />
          </motion.div>

          {/* Right Data Column */}
          <motion.div style={{ y: yGrid2 }} className="flex flex-col gap-6 lg:col-span-3">
            <InfographicCard icon={Shield} value="256-bit" label="Encryption Standard" delay={0.3} />
            <InfographicCard icon={Cpu} value="12M+" label="Automations Hourly" delay={0.4} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}