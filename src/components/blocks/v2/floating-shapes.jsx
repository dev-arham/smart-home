"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * FloatingShapes — ambient SVG decoration layer.
 * Absolute-positioned pointer-events-none shapes that drift behind content.
 * Mobile-friendly: fewer shapes, slower animations, respects reduced-motion.
 *
 * Variants: "hero" | "section" | "dense"
 */
export default function FloatingShapes({ variant = "section", className = "" }) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isReduced = mounted ? reduceMotion : false;
  const shapes = getShapes(variant);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: s.opacity ?? 0.35, scale: 1 }}
          transition={{ duration: 1.2, delay: i * 0.1 }}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            width: s.size,
            height: s.size,
            animation: isReduced
              ? "none"
              : `${s.animation} ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          {s.shape === "triangle" && <TriangleSVG color={s.color} />}
          {s.shape === "square" && <SquareSVG color={s.color} />}
          {s.shape === "ring" && <RingSVG color={s.color} />}
          {s.shape === "dot" && <DotSVG color={s.color} />}
          {s.shape === "plus" && <PlusSVG color={s.color} />}
          {s.shape === "hex" && <HexSVG color={s.color} />}
        </motion.div>
      ))}
    </div>
  );
}

function getShapes(variant) {
  if (variant === "hero") {
    return [
      { shape: "ring", color: "accent", top: "15%", left: "8%", size: 80, animation: "floatSlow", duration: 9, delay: 0, opacity: 0.4 },
      { shape: "plus", color: "primary", top: "70%", left: "12%", size: 28, animation: "floatSlow", duration: 7, delay: 1, opacity: 0.5 },
      { shape: "triangle", color: "accent", top: "25%", right: "10%", size: 44, animation: "orbDrift", duration: 12, delay: 0.5, opacity: 0.35 },
      { shape: "dot", color: "primary", top: "80%", right: "18%", size: 10, animation: "floatSlow", duration: 6, delay: 2, opacity: 0.7 },
      { shape: "hex", color: "accent", top: "50%", left: "4%", size: 36, animation: "orbDrift", duration: 14, delay: 1.5, opacity: 0.3 },
      { shape: "square", color: "primary", bottom: "20%", right: "6%", size: 28, animation: "floatSlow", duration: 8, delay: 0.8, opacity: 0.4 },
    ];
  }

  if (variant === "dense") {
    return [
      { shape: "ring", color: "accent", top: "10%", left: "5%", size: 60, animation: "floatSlow", duration: 8, delay: 0, opacity: 0.3 },
      { shape: "plus", color: "primary", top: "30%", right: "15%", size: 24, animation: "floatSlow", duration: 6, delay: 1, opacity: 0.5 },
      { shape: "triangle", color: "accent", top: "60%", left: "8%", size: 36, animation: "orbDrift", duration: 11, delay: 0.5, opacity: 0.3 },
      { shape: "dot", color: "primary", top: "15%", right: "25%", size: 8, animation: "floatSlow", duration: 5, delay: 2, opacity: 0.6 },
      { shape: "hex", color: "accent", top: "75%", right: "8%", size: 32, animation: "orbDrift", duration: 13, delay: 1.5, opacity: 0.3 },
      { shape: "square", color: "primary", top: "45%", left: "20%", size: 20, animation: "floatSlow", duration: 7, delay: 0.8, opacity: 0.35 },
      { shape: "ring", color: "primary", bottom: "15%", left: "45%", size: 50, animation: "orbDrift", duration: 14, delay: 2.5, opacity: 0.25 },
      { shape: "plus", color: "accent", top: "85%", right: "35%", size: 20, animation: "floatSlow", duration: 6, delay: 1.2, opacity: 0.4 },
    ];
  }

  return [
    { shape: "ring", color: "accent", top: "15%", right: "8%", size: 60, animation: "floatSlow", duration: 9, delay: 0, opacity: 0.3 },
    { shape: "triangle", color: "primary", top: "70%", left: "10%", size: 36, animation: "orbDrift", duration: 12, delay: 0.5, opacity: 0.3 },
    { shape: "plus", color: "accent", bottom: "20%", right: "20%", size: 22, animation: "floatSlow", duration: 7, delay: 1, opacity: 0.5 },
    { shape: "hex", color: "primary", top: "40%", left: "5%", size: 30, animation: "orbDrift", duration: 13, delay: 1.5, opacity: 0.25 },
  ];
}

/* ─────────── SVG primitives ─────────── */

const colorFor = (c) =>
  c === "primary" ? "oklch(0.62 0.22 252)" : "oklch(0.82 0.15 195)";

function TriangleSVG({ color }) {
  const stroke = colorFor(color);
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <polygon
        points="20,4 36,34 4,34"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function SquareSVG({ color }) {
  const stroke = colorFor(color);
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full rotate-12">
      <rect
        x="6"
        y="6"
        width="28"
        height="28"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        rx="4"
      />
    </svg>
  );
}

function RingSVG({ color }) {
  const stroke = colorFor(color);
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke={stroke}
        strokeWidth="1.2"
        strokeDasharray="3 4"
        fill="none"
      />
      <circle
        cx="20"
        cy="20"
        r="8"
        stroke={stroke}
        strokeWidth="1.2"
        strokeOpacity="0.5"
        fill="none"
      />
    </svg>
  );
}

function DotSVG({ color }) {
  const fill = colorFor(color);
  return (
    <svg viewBox="0 0 10 10" className="h-full w-full">
      <circle cx="5" cy="5" r="4" fill={fill} opacity="0.9" />
      <circle cx="5" cy="5" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}

function PlusSVG({ color }) {
  const stroke = colorFor(color);
  return (
    <svg viewBox="0 0 28 28" className="h-full w-full">
      <line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HexSVG({ color }) {
  const stroke = colorFor(color);
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <polygon
        points="20,4 34,12 34,28 20,36 6,28 6,12"
        stroke={stroke}
        strokeWidth="1.4"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}
