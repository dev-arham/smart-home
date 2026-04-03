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
} from "lucide-react";

const LINKS = [
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "Smart Switches", href: "#" },
      { label: "Lighting Control", href: "#" },
      { label: "Home Automation", href: "#" },
      { label: "All Products", href: "/category" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Support", href: "#" },
      { label: "Documentation", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Return Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
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

export const title = "Company Footer";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f0f0f] text-white">
      {/* Top Section: Brand + Newsletter */}
      <div className="mx-auto container px-4 pb-12 pt-16 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Brand */}
          <div className="space-y-4 text-center lg:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/images/aqua-logo-transparent.png"
                alt="Aqua Electrical"
                width={120}
                height={60}
                className="mx-auto brightness-0 invert lg:mx-0"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              Aqua Electrical is your go-to destination for high-quality smart
              home products and services. We bring intelligent living solutions
              to elevate your everyday experience.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:ml-auto lg:max-w-sm w-full space-y-4">
            <h4 className="text-base font-semibold">Stay Updated</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Subscribe to our newsletter for the latest products, offers, and
              smart home tips.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-row items-stretch gap-2  sm:items-center"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-white/30 h-11 rounded-lg flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 rounded-lg bg-white text-[#0f0f0f] hover:bg-white/90 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Middle Section: Link Columns */}
      <div className="mx-auto container px-4 py-12 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <h5 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/80">
                {title}
              </h5>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Contact Strip */}
      <div className="mx-auto container px-4 py-8 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5">
              <Phone className="h-4 w-4 text-white/60" />
            </div>
            <div>
              <p className="text-xs text-white/40">Call us</p>
              <a
                href="tel:+923368882782"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                +92 336 8882782
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5">
              <Mail className="h-4 w-4 text-white/60" />
            </div>
            <div>
              <p className="text-xs text-white/40">Email us</p>
              <a
                href="mailto:aquaelectrical@gmail.com"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                aquaelectrical@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5">
              <MapPin className="h-4 w-4 text-white/60" />
            </div>
            <div>
              <p className="text-xs text-white/40">Visit us</p>
              <p className="text-sm text-white/70">
                DHA Phase 6, Karachi
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Bottom Bar: Copyright + Social */}
      <div className="mx-auto container px-4 py-6 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {YEAR} Aqua Electrical. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all duration-200"
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
