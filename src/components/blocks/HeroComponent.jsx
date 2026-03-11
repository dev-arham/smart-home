
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import HeroLottie from "./HeroLottie";
import StayInspired from "./StayInspired";
import StayInspiredCards from "./StayInspiredCards";
import HeroAbout from "./hero-about";

export default function HeroComponent() {
  return (
    <section className="relative overflow-visible bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-10 pt-24 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-32 md:grid-cols-2 md:gap-12 lg:px-8">
        <div className="text-center md:text-left">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:text-xs">
            Future Ready Homes
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight text-balance text-white sm:text-5xl lg:text-6xl">
            AquaSmart
            <span className="block bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Smart Living, Simplified
            </span>
          </h1>

          <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg md:mx-0">
            Experience connected comfort with intelligent lighting, security, and
            energy control designed for modern families.
          </p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="w-full bg-linear-to-r from-blue-500 to-cyan-400 text-slate-950 hover:from-blue-400 hover:to-cyan-300 sm:w-auto"
            >
              <Link href="/category">Explore Products</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-none">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/25 to-cyan-400/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border-none p-1 sm:p-2">
            <HeroLottie />
          </div>
        </div>
      </div>
      <div className="relative px-4 pb-4">
        <StayInspired />
        <HeroAbout />
        <StayInspiredCards />
      </div>
    </section>
  );
}
