"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

const STATS = [
  { value: 120000, suffix: "+", label: "Switches shipped", sub: "and still counting" },
  { value: 40, suffix: "yrs", label: "Of electrical heritage", sub: "since 1985" },
  { value: 32, suffix: "", label: "In-house engineers", sub: "no outsourced R&D" },
  { value: 99.8, suffix: "%", label: "Return-free rate", sub: "over last 24 months", decimals: 1 },
];

const TESTIMONIALS = [
  {
    quote:
      "The switches feel like Apple made them. The app does one job and does it quietly. This is how smart home should have felt from day one.",
    author: "Zain F.",
    role: "Architect, Karachi",
  },
  {
    quote:
      "We wired a 6-bedroom villa with Aqua Electrical and zero failures in three years. Electricians keep asking me what brand it is.",
    author: "Hira M.",
    role: "Interior Designer, Dubai",
  },
  {
    quote:
      "Bought one smart dimmer to try it. Two weeks later I'd replaced every switch in the house. The energy numbers alone paid it back.",
    author: "Omar S.",
    role: "Homeowner, Lahore",
  },
];

function useCountUp(target, inView, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    const from = 0;

    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (target - from) * eased;
      setValue(current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString();
}

function Stat({ stat, inView }) {
  const rendered = useCountUp(stat.value, inView, 2000, stat.decimals ?? 0);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-primary/30 sm:p-8">
      <p className="flex items-baseline gap-1 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        <span className="text-gradient-brand">{rendered}</span>
        <span className="text-2xl text-foreground/80 sm:text-3xl">{stat.suffix}</span>
      </p>
      <p className="mt-3 text-sm font-medium text-foreground/80 sm:text-base">
        {stat.label}
      </p>
      <p className="mt-1 text-xs text-foreground/50">{stat.sub}</p>

      {/* Bottom glow */}
      <div className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
    </div>
  );
}

export default function TrustStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60"
          >
            Proof, not promises
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-semibold tracking-tight text-[clamp(1.8rem,3.6vw,2.75rem)] leading-tight text-foreground"
          >
            Numbers we're{" "}
            <span className="text-gradient-brand">proud to show.</span>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} stat={s} inView={inView} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-card sm:p-7"
            >
              <Quote className="h-6 w-6 text-accent/70" strokeWidth={2} />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-2 border-t border-white/5 pt-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-foreground/55">{t.role}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
