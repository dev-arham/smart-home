import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import Link from "next/link";
import { ArrowLeft, Zap, Sparkles } from "lucide-react";

export const metadata = {
  title: "Aqua Electrical — Premium Traditional Electrical Collection",
  description:
    "The Aqua Electrical collection: precision switchgear, sockets and accessories engineered to last decades.",
};

export default function AquaElectricalPage() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <Header />

      <main className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40">
        {/* Ambient orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-orb bg-accent/30" style={{ width: 520, height: 520, top: -120, left: "-10%" }} />
          <div className="hero-orb bg-primary/25" style={{ width: 420, height: 420, top: "40%", right: "-8%" }} />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-dots opacity-40 [mask-image:radial-gradient(900px_500px_at_50%_40%,black,transparent)]" />

        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-accent">
              <Zap className="h-3.5 w-3.5" />
              Collection 02
            </span>

            <h1 className="mt-6 font-semibold tracking-tight text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
              <span className="block text-foreground">Aqua Electrical</span>
              <span className="block text-gradient-brand">Classic, perfected.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm text-foreground/65 sm:text-base">
              The full Aqua Electrical collection page is currently being built
              — precision switchgear, heavy-duty sockets, circuit protection
              and the quiet layer behind every great home. Back to the
              homepage to explore what's live today.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-white/20 hover:bg-white/[0.06]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to home
              </Link>
              <Link
                href="/aqua-smart"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)] transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="h-4 w-4" />
                Visit Aqua Smart
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
