"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const LINKS = [
  {
    title: "Collections",
    items: [
      { label: "Aqua Smart", href: "/aqua-smart", icon: Sparkles },
      { label: "Aqua Electrical", href: "/aqua-electrical", icon: Zap },
      { label: "All Products", href: "/category" },
      { label: "New Arrivals", href: "/category?sort=new" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Warranty", href: "#" },
      { label: "Installation", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/5 bg-background text-foreground">
      {/* Ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 400px at 50% 0%, oklch(0.62 0.22 252 / 0.14), transparent 60%)",
        }}
      />

      {/* ── Top section: Brand + Newsletter ── */}
      <div className="mx-auto container px-4 pb-14 pt-16 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Brand */}
          <div className="space-y-5 text-center lg:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/images/aqua-logo-transparent.png"
                alt="Aqua Electrical"
                width={140}
                height={70}
                className="mx-auto h-auto w-[120px] brightness-0 invert lg:mx-0"
              />
            </Link>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-foreground/55 lg:mx-0">
              Aqua is a premium electrical brand built on two ideas — products
              that last decades, and a smart layer that never gets in your way.
              Engineered in-house since 1985.
            </p>

            {/* Collection pills */}
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              <Link
                href="/aqua-smart"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/20"
              >
                <Zap className="h-3.5 w-3.5 text-accent" />
                Aqua Smart
                <ArrowUpRight className="h-3.5 w-3.5 text-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/aqua-electrical"
                className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-accent/60 hover:bg-accent/20"
              >
                Aqua Electrical
                <ArrowUpRight className="h-3.5 w-3.5 text-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                Stay in the loop
              </p>
              <h4 className="mt-1.5 text-base font-semibold text-foreground">
                One email a month. Zero fluff.
              </h4>
              <p className="mt-1 text-xs text-foreground/55 leading-relaxed">
                New drops, install tips, and the rare sale worth knowing about.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-stretch gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-full border-white/10 bg-white/[0.04] text-foreground placeholder:text-foreground/40 focus-visible:border-accent/50 focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* ── Middle: Link columns ── */}
      <div className="mx-auto container px-4 py-12 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <h5 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80">
                {title}
              </h5>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-foreground/55 transition-colors duration-200 hover:text-foreground"
                    >
                      {item.icon ? (
                        <item.icon className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
                      ) : null}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* ── Contact strip ── */}
      <div className="mx-auto container px-4 py-8 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/40">
                Call us
              </p>
              <a
                href="tel:+923368882782"
                className="text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                +92 336 8882782
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <Mail className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/40">
                Email us
              </p>
              <a
                href="mailto:hello@aquaelectrical.com"
                className="text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                hello@aquaelectrical.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/40">
                Visit us
              </p>
              <p className="text-sm text-foreground/75">DHA Phase 6, Karachi</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* ── Bottom bar ── */}
      <div className="mx-auto container px-4 py-6 sm:px-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-foreground/45">
            &copy; {YEAR} Aqua Electrical. All rights reserved. Designed in Karachi.
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/50 transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
