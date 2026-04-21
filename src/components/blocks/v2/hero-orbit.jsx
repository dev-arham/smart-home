"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Lightbulb,
  Plug,
  Wifi,
  Fan,
  Thermometer,
  DoorClosed,
  Volume2,
  Sparkles,
} from "lucide-react";

/**
 * HeroOrbit — an animated SVG/HTML infographic for the hero section.
 * Represents the Aqua smart-home ecosystem: a central hub radiating
 * pulses to orbiting nodes (lights, switches, sensors, etc).
 *
 * Built as absolute-positioned elements over an SVG so icons render
 * crisply while arcs/rings stay vector-smooth and theme-aware.
 */

const NODES = [
  { id: "light", label: "Lighting", icon: Lightbulb, angle: -90, tone: "primary" },
  { id: "plug", label: "Sockets", icon: Plug, angle: -30, tone: "accent" },
  { id: "climate", label: "Climate", icon: Thermometer, angle: 30, tone: "primary" },
  { id: "security", label: "Security", icon: DoorClosed, angle: 90, tone: "accent" },
  { id: "audio", label: "Audio", icon: Volume2, angle: 150, tone: "primary" },
  { id: "fan", label: "Fans", icon: Fan, angle: 210, tone: "accent" },
];

export default function HeroOrbit() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use undefined on server/first-render to match SSR tree exactly,
  // then apply true/false once safely mounted.
  const isReduced = mounted ? reduceMotion : false;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[520px] select-none"
      aria-hidden
    >
      {/* ── SVG: orbit rings + arcs + gradient defs ── */}
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.82 0.15 195)" stopOpacity="0.9" />
            <stop offset="40%" stopColor="oklch(0.62 0.22 252)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.62 0.22 252)" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.22 252)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.82 0.15 195)" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="ring-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.15 195)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="oklch(0.62 0.22 252)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.82 0.15 195)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* ─ Outer ring with rotating dashes ─ */}
        <motion.g
          style={{ transformOrigin: "300px 300px" }}
          animate={isReduced ? {} : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          <circle
            cx="300"
            cy="300"
            r="260"
            stroke="url(#ring-stroke)"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.8"
          />
        </motion.g>

        {/* ─ Middle ring (solid, subtle) ─ */}
        <circle
          cx="300"
          cy="300"
          r="200"
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth="1"
        />

        {/* ─ Inner ring with counter-rotating dashes ─ */}
        <motion.g
          style={{ transformOrigin: "300px 300px" }}
          animate={isReduced ? {} : { rotate: -360 }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        >
          <circle
            cx="300"
            cy="300"
            r="150"
            stroke="url(#ring-stroke)"
            strokeWidth="1"
            strokeDasharray="4 10"
            opacity="0.7"
          />
        </motion.g>

        {/* ─ Expanding pulse rings ─ */}
        {!isReduced &&
          [0, 1.3, 2.6].map((delay, i) => (
            <motion.circle
              key={i}
              cx="300"
              cy="300"
              r="60"
              stroke="oklch(0.82 0.15 195)"
              strokeWidth="1.2"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 4.2, opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 4,
                delay,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "300px 300px" }}
            />
          ))}

        {/* ─ Core orb ─ */}
        <circle cx="300" cy="300" r="85" fill="url(#core-glow)" />
        <circle
          cx="300"
          cy="300"
          r="54"
          fill="oklch(0.205 0.028 258)"
          stroke="oklch(0.62 0.22 252 / 0.8)"
          strokeWidth="1"
        />

        {/* ─ Connection arcs (curved lines from core to each node) ─ */}
        {NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = 300 + Math.cos(rad) * 200;
          const ny = 300 + Math.sin(rad) * 200;
          // Control point off-axis for gentle curve
          const cx = 300 + Math.cos(rad) * 120;
          const cy = 300 + Math.sin(rad) * 120;
          return (
            <motion.path
              key={node.id}
              d={`M 300 300 Q ${cx + Math.sin(rad) * 40} ${cy - Math.cos(rad) * 40} ${nx} ${ny}`}
              stroke="url(#arc-grad)"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="6 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{
                duration: 1.2,
                delay: 0.4 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}

        {/* ─ Data packet dots travelling the arcs ─ */}
        {!isReduced &&
          NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = 300 + Math.cos(rad) * 200;
            const ny = 300 + Math.sin(rad) * 200;
            return (
              <motion.circle
                key={`dot-${node.id}`}
                r="3"
                fill={node.tone === "primary" ? "oklch(0.62 0.22 252)" : "oklch(0.82 0.15 195)"}
                initial={{ cx: 300, cy: 300, opacity: 0 }}
                animate={{
                  cx: [300, nx, 300],
                  cy: [300, ny, 300],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}

        {/* ─ Decorative floating dots around outer ring ─ */}
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return (
            <motion.circle
              key={`ring-dot-${i}`}
              r="1.6"
              fill="oklch(0.82 0.15 195)"
              initial={{
                cx: 300 + Math.cos(a) * 260,
                cy: 300 + Math.sin(a) * 260,
                opacity: 0.25,
              }}
              animate={
                isReduced
                  ? {}
                  : {
                      opacity: [0.25, 0.9, 0.25],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: (i * 3) / 14,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* ── Central logo/text inside core ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-1/2 top-1/2 flex h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
      >
        <p className=" text-[10px] font-semibold uppercase tracking-tight text-foreground/80 sm:text-[11px] rounded-full w-full h-full flex items-center justify-center text-center bg-slate-900">
          Aqua Hub
        </p>
      </motion.div>

      {/* ── Orbiting node chips (HTML for crisp icons) ── */}
      {NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        // 200/600 radius ratio = ~33.3% from center
        const x = 50 + (Math.cos(rad) * 200 * 100) / 600;
        const y = 50 + (Math.sin(rad) * 200 * 100) / 600;
        const toneCls =
          node.tone === "primary"
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-accent/40 bg-accent/10 text-accent";
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.1 }}
            className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-2.5 py-1.5 backdrop-blur-md transition-all ${toneCls}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animation: isReduced
                ? "none"
                : `floatSlow ${7 + i}s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            <span className="flex h-6 w-6 items-center justify-center">
              <node.icon className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            <span className="pr-1 text-[10px] font-semibold uppercase tracking-wide text-foreground sm:text-xs">
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* ── Floating stat cards in corners ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute -left-2 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-background/70 px-3 py-2 backdrop-blur-md sm:left-2"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/40">
          <Wifi className="h-3.5 w-3.5 text-primary" />
        </span>
        <div className="text-left">
          <p className="text-[9px] uppercase tracking-[0.22em] text-foreground/50">Mesh</p>
          <p className="text-[11px] font-semibold text-foreground">12 online</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute -right-2 bottom-10 flex items-center gap-2 rounded-xl border border-white/10 bg-background/70 px-3 py-2 backdrop-blur-md sm:right-2"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 ring-1 ring-accent/40">
          <Lightbulb className="h-3.5 w-3.5 text-accent" />
        </span>
        <div className="text-left">
          <p className="text-[9px] uppercase tracking-[0.22em] text-foreground/50">Scene</p>
          <p className="text-[11px] font-semibold text-foreground">Evening · 68%</p>
        </div>
      </motion.div>
    </div>
  );
}
