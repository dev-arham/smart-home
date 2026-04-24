import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import HeroSmartV2 from "./components/hero-smart-v2";
import SmartCategories from "./components/smart-categories";
import SmartProductsV2 from "./components/smart-products-v2";
import VideoBanner from "./components/video-banner";
import InnovationSpotlight from "@/components/blocks/v2/innovation-spotlight";
import TrustStats from "@/components/blocks/v2/trust-stats";

export const metadata = {
  title: "Aqua Smart — Intelligent Home Automation",
  description:
    "Wi-Fi switches, voice-ready lighting, scene automations and sensors — a complete smart ecosystem for every home.",
};

export default function AquaSmartPage() {
  return (
    <div className="relative w-full overflow-x-clip bg-background text-foreground">
      <div className="bg-noise mix-blend-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />
      <Header />
      <main>
        <HeroSmartV2 />
        <SmartCategories />
        <SmartProductsV2 />
        <VideoBanner />
        <InnovationSpotlight />
        <TrustStats />
      </main>
      <Footer />
    </div>
  );
}
