"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CategoriesSection({
  eyebrow = "Browse by category",
  title,
  titleAccent,
  description,
  categories = [],
  ctaHref,
  ctaLabel = "View all categories",
  columns = 3,
}) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns] ?? "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 bg-grid-dots [mask-image:radial-gradient(900px_400px_at_50%_50%,black,transparent)]"
      />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60"
          >
            {eyebrow}
          </motion.span>

          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-4 font-semibold tracking-tight text-[clamp(1.75rem,3.6vw,2.75rem)] leading-tight text-foreground"
            >
              {title}{" "}
              {titleAccent && (
                <span className="text-gradient-brand">{titleAccent}</span>
              )}
            </motion.h2>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-4 text-sm text-foreground/60 sm:text-base"
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className={`grid gap-4 ${gridCols}`}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} category={cat} index={i} />
          ))}
        </div>

        {ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/40 hover:bg-white/[0.08]"
            >
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CategoryCard({ category, index }) {
  const { icon: Icon, name, description, count, href } = category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card sm:p-6"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-accent/15 text-primary ring-1 ring-primary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
          <Icon className="h-5 w-5" strokeWidth={2.1} />
        </span>

        <div className="mt-4 flex-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            {name}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">
            {description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-[11px] text-foreground/40">{count}</span>
          <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-all group-hover:text-accent group-hover:rotate-45" />
        </div>

        <div className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-primary/60 via-accent/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      </Link>
    </motion.div>
  );
}
