"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wrench,
  Zap,
  Layers,
  Gauge,
  Award,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Safety-first engineering",
    body: "Over-current protection, flame-retardant housings, and grounded assembly on every unit — tested to international standards.",
  },
  {
    icon: Layers,
    title: "8 iconic series",
    body: "Bravo, Glasskin, Roman, Xtreme, Sapphire, Icon and more — each a complete range of modules in one cohesive design family.",
  },
  {
    icon: Wrench,
    title: "Installer-friendly",
    body: "Deep terminals, clear wiring diagrams and pre-drilled back-boxes. Your electrician will thank us.",
  },
  {
    icon: Gauge,
    title: "Rated for real load",
    body: "10A to 32A switches, 32–125A CAM changeovers, and MCBs up to 63kA breaking capacity.",
  },
  {
    icon: Zap,
    title: "Precision switchgear",
    body: "Heavy-duty contacts, positive-action mechanisms and a crisp feel that holds up through tens of thousands of cycles.",
  },
  {
    icon: Award,
    title: "ISO-9001 certified",
    body: "Every product batch passes quality audits before it leaves the factory — no shortcuts, no exceptions.",
  },
];

export default function ElectricalFeatures() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-background py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 90% 20%, oklch(0.82 0.15 195 / 0.18), transparent 60%), radial-gradient(800px 500px at 10% 80%, oklch(0.62 0.22 252 / 0.15), transparent 60%)",
        }}
      />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left: copy + feature grid */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent"
            >
              Aqua Electrical · Built different
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-4 font-semibold tracking-tight text-[clamp(1.8rem,3.6vw,2.75rem)] leading-tight text-foreground"
            >
              Precision that lasts{" "}
              <span className="text-gradient-brand">a lifetime.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
            >
              Every Aqua Electrical product is engineered to exceed the spec sheet
              — tested under real load conditions, finished to a standard you can
              see and feel every single day.
            </motion.p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                  className="group flex gap-3"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <f.icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/category"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background shadow-[0_10px_30px_-10px_var(--color-accent)] transition-transform hover:scale-[1.02]"
              >
                Browse all products
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Get a quote →
              </Link>
            </motion.div>
          </div>

          {/* Right: series showcase cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid grid-cols-2 gap-3"
          >
            {SERIES_CARDS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-card p-5 ${s.span ?? ""}`}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: s.gradient }}
                />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                    {s.category}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold text-foreground">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-xs text-foreground/55">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-foreground/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const SERIES_CARDS = [
  {
    name: "Bravo Series",
    category: "Tempered Glass",
    desc: "Italian-inspired finish with ultra-slim profile",
    tags: ["1G–6G", "10A", "250V"],
    gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    span: "col-span-2 sm:col-span-1",
  },
  {
    name: "Glasskin Series",
    category: "Premium Glass",
    desc: "Crystal-clear tempered glass, premium feel",
    tags: ["Touch", "LED", "British Std"],
    gradient: "linear-gradient(135deg,#0ea5e9,#06b6d4)",
  },
  {
    name: "Circuit Protection",
    category: "MCB · MCCB · RCCB",
    desc: "Full breaker range from 6A to 125A",
    tags: ["1P–4P", "DIN Rail", "10kA"],
    gradient: "linear-gradient(135deg,#10b981,#06b6d4)",
  },
  {
    name: "Roman Series",
    category: "Quad Plate",
    desc: "Wide-format plates for multi-gang installations",
    tags: ["146×86mm", "6G–10G", "Modular"],
    gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
    span: "col-span-2 sm:col-span-1",
  },
];
