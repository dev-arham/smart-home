"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Zap,
  Wifi,
  Plug,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

const COLLECTIONS = [
  {
    id: "smart",
    href: "/aqua-smart",
    eyebrow: "Collection 01",
    name: "Aqua Smart",
    tagline: "Intelligence, wired in.",
    description:
      "Wi-Fi switches, voice-ready lighting, scene automations and sensors that turn any home into a responsive living space.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    accentType: "primary",
    classes: {
      iconBg: "bg-primary/20 ring-primary/40",
      iconColor: "text-primary",
      tagline: "text-primary",
      cta: "text-primary",
      border: "hover:border-primary/40",
      wash: "from-primary/30 via-primary/5",
    },
    icon: Sparkles,
    features: [
      { icon: Wifi, label: "Wi-Fi & Bluetooth" },
      { icon: Lightbulb, label: "Ambient Lighting" },
      { icon: ShieldCheck, label: "Safe-Fail Design" },
    ],
  },
  {
    id: "electrical",
    href: "/aqua-electrical",
    eyebrow: "Collection 02",
    name: "Aqua Electrical",
    tagline: "Classic, perfected.",
    description:
      "Precision switchgear, sockets and accessories engineered to last decades — the quiet, dependable layer behind every great home.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    accentType: "accent",
    classes: {
      iconBg: "bg-accent/20 ring-accent/40",
      iconColor: "text-accent",
      tagline: "text-accent",
      cta: "text-accent",
      border: "hover:border-accent/40",
      wash: "from-accent/25 via-accent/5",
    },
    icon: Zap,
    features: [
      { icon: Plug, label: "Premium Sockets" },
      { icon: Zap, label: "Heavy-Duty Circuits" },
      { icon: ShieldCheck, label: "Lifetime Build" },
    ],
  },
];

export default function DualCollections() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-radial-blue" />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60"
          >
            Two Collections · One Brand
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-semibold tracking-tight text-[clamp(1.75rem,3.6vw,2.75rem)] leading-tight text-foreground"
          >
            Pick your path,{" "}
            <span className="text-gradient-brand">both lead home.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-4 text-sm text-foreground/60 sm:text-base"
          >
            Aqua Smart and Aqua Electrical are two distinct worlds built on the
            same obsession with quality. Start with whichever matches your
            space — they're designed to mix and match.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {COLLECTIONS.map((c, idx) => (
            <CollectionCard key={c.id} collection={c} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection, index }) {
  const { href, eyebrow, name, tagline, description, image, classes, icon: Icon, features } = collection;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group/card relative h-full"
    >
      <Link
        href={href}
        className={`group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl transition-all duration-500 hover:-translate-y-1 ${classes.border}`}
      >
        <div className="relative aspect-[5/4] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[5/6]">
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-1000 ease-in-out group-hover:scale-110"
            />
          </div>
          
          {/* Animated Floating Infographic Badge */}
          <div className="absolute right-6 top-16 z-20 flex translate-x-8 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-md shadow-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Icon className={`h-5 w-5 ${classes.iconColor}`} />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[10px] uppercase tracking-wider text-white/50">Active Nodes</span>
                <span className="text-lg font-medium text-white shadow-sm">1.2k+</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-md shadow-2xl delay-75">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <ShieldCheck className={`h-5 w-5 ${classes.iconColor}`} />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[10px] uppercase tracking-wider text-white/50">Status</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  <span className="text-sm font-medium text-white shadow-sm">Optimized</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background flex-none via-background/70 to-background/20" />
          <div
            className={`absolute flex-none inset-0 bg-gradient-to-br ${classes.wash} to-transparent opacity-60 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100`}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 pointer-events-none">

          <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {name}
          </h3>
          <p className={`mt-1 text-lg font-medium ${classes.tagline}`}>
            {tagline}
          </p>
          <p className="mt-3 max-w-md text-sm text-foreground/70 sm:text-base">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {features.map(({ icon: F, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-foreground/70 backdrop-blur-sm"
              >
                <F className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>

        </div>

        <div className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/60 backdrop-blur pointer-events-none">
          {name}
        </div>
      </Link>
    </motion.div>
  );
}
