"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, Send } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-card shadow-2xl"
        >
          {/* Background image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/luxury-living-bg.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/70" />
            <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_30%,oklch(0.62_0.22_252/0.35),transparent_60%)]" />
          </div>

          {/* Decorative orbs */}
          <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:p-16">
            {/* Left: message */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/70"
              >
                Ready when you are
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="mt-4 font-semibold tracking-tight text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.05] text-foreground"
              >
                Let's turn your walls{" "}
                <span className="text-gradient-brand">into something worth touching.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.16 }}
                className="mt-5 max-w-lg text-sm text-foreground/70 sm:text-base"
              >
                Start with a single switch, or book a free home-consult with
                our engineers. Either way, you'll know exactly what you're
                getting — and exactly what it'll cost.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.24 }}
                className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
              >
                <Link
                  href="/aqua-smart"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-transform hover:scale-[1.02] sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" />
                  Shop Aqua Smart
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  href="/aqua-electrical"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:border-accent/60 hover:bg-accent/20 sm:w-auto"
                >
                  <Zap className="h-4 w-4" />
                  Shop Aqua Electrical
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline sm:w-auto"
                >
                  or book a consult →
                </Link>
              </motion.div>
            </div>

            {/* Right: newsletter card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl border border-white/10 bg-background/70 p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/40">
                  <Send className="h-4 w-4 text-accent" />
                </span>
                <p className="text-xs uppercase tracking-[0.22em] text-foreground/60">
                  Newsletter
                </p>
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Good emails. That's the deal.
              </h3>
              <p className="mt-2 text-sm text-foreground/65">
                One email a month with new drops, home-tour features and the
                odd engineer-nerd deep dive. Nothing else.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="you@yourhome.com"
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-accent/50 focus:bg-white/[0.06]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
                >
                  Subscribe
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-3 text-[11px] text-foreground/40">
                No spam, unsubscribe anytime. By subscribing you agree to our
                privacy policy.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
