"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useReducedMotion } from "framer-motion";

/**
 * CobeGlobe — a lightweight WebGL globe built on `cobe`.
 * Interactive: drag to spin, pulses/markers at key locations.
 * Uses the theme's primary/accent blues, fits perfectly in dark mode.
 */
export default function CobeGlobe({ size = 600, className = "" }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let width = size;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.22,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      // Deep navy base with subtle blue tint
      baseColor: [0.08, 0.12, 0.24],
      // Cyan-ish glow dots
      markerColor: [0.35, 0.82, 0.95],
      glowColor: [0.2, 0.45, 0.85],
      offset: [0, 0],
      markers: [
        // Karachi
        { location: [24.8607, 67.0011], size: 0.12 },
        // Lahore
        { location: [31.5204, 74.3587], size: 0.08 },
        // Dubai
        { location: [25.2048, 55.2708], size: 0.1 },
        // Riyadh
        { location: [24.7136, 46.6753], size: 0.07 },
        // London
        { location: [51.5074, -0.1278], size: 0.08 },
        // New York
        { location: [40.7128, -74.006], size: 0.08 },
        // Singapore
        { location: [1.3521, 103.8198], size: 0.07 },
        // Istanbul
        { location: [41.0082, 28.9784], size: 0.07 },
        // Doha
        { location: [25.2854, 51.5310], size: 0.06 },
        // Toronto
        { location: [43.6532, -79.3832], size: 0.06 },
      ],
      onRender: (state) => {
        // Auto-rotate only when user isn't dragging
        if (!pointerInteracting.current) {
          phiRef.current += 0.0025;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Fade the canvas in after the first paint
    const canvasEl = canvasRef.current;
    if (canvasEl) {
      setTimeout(() => {
        canvasEl.style.opacity = "1";
      }, 100);
    }

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [size, reduceMotion]);

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[${size}px] ${className}`}
      style={{ maxWidth: size }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 100;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
        aria-label="Interactive globe showing Aqua's global reach"
      />

      {/* Decorative glow behind globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/30 blur-3xl"
      />
    </div>
  );
}
