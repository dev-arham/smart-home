"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Thermometer, Lightbulb, Zap } from "lucide-react";

export default function HeroVisual() {
  const cards = [
    {
      id: "security",
      title: "Active Security",
      value: "Secure",
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-500/20",
      position: "-top-6 -left-6 z-20",
      delay: 0.1,
      yFloat: [-5, 5, -5],
    },
    {
      id: "climate",
      title: "Climate Control",
      value: "72°F",
      icon: Thermometer,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-500/20",
      position: "top-1/5 -right-16 z-30",
      delay: 0.3,
      yFloat: [5, -5, 5],
    },
    {
      id: "lighting",
      title: "Adaptive Lighting",
      value: "80%",
      icon: Lightbulb,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-500/20",
      position: "-bottom-4 left-4 z-40",
      delay: 0.5,
      yFloat: [-3, 3, -3],
    },
  ];

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center">
      {/* Central Hub Orb */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/60 shadow-[0_0_80px_rgba(34,211,238,0.2)] backdrop-blur-xl"
      >
        <div className="absolute inset-0 rounded-full border border-cyan-300/10" />
        <div className="absolute inset-2 rounded-full border border-cyan-300/10 border-t-cyan-400/40 animate-[spin_8s_linear_infinite]" />
        <div className="absolute inset-6 rounded-full border border-blue-400/10 border-b-blue-400/40 animate-[spin_12s_linear_infinite_reverse]" />
        
        <Zap className="h-10 w-10 text-cyan-400 mb-2" />
        <span className="text-sm font-medium text-cyan-100 tracking-wider uppercase">System</span>
        <span className="text-2xl font-bold text-white">Online</span>
      </motion.div>

      {/* Floating Smart Cards */}
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: card.yFloat }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: card.delay },
            opacity: { duration: 0.8, delay: card.delay + 0.5 },
            scale: { duration: 0.8, delay: card.delay + 0.5, type: "spring" }
          }}
          className={`absolute ${card.position} flex w-48 items-center gap-4 rounded-2xl border ${card.border} bg-slate-900/80 p-4 shadow-xl backdrop-blur-md`}
        >
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.bg} ${card.color}`}>
            <card.icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">{card.title}</p>
            <p className="text-lg font-semibold text-white">{card.value}</p>
          </div>
        </motion.div>
      ))}

      {/* Connection Lines (Decorative) */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M50,50 L20,20"
          stroke="url(#grad)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.path
          d="M50,50 L90,30"
          stroke="url(#grad)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
        />
        <motion.path
          d="M50,50 L30,80"
          stroke="url(#grad)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.4 }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}