import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import HeroV2 from "@/components/blocks/v2/hero-v2";
import DualCollections from "@/components/blocks/v2/dual-collections";
import BrandStory from "@/components/blocks/v2/brand-story";
import WhyChooseUs from "@/components/blocks/v2/why-choose-us";
import ProductEcosystem from "@/components/blocks/v2/product-ecosystem";
import ParallaxInfographics from "@/components/blocks/v2/parallax-infographics";
import InnovationSpotlight from "@/components/blocks/v2/innovation-spotlight";
import TrustStats from "@/components/blocks/v2/trust-stats";
import FinalCTA from "@/components/blocks/v2/final-cta";
import HeroAbout from "@/components/blocks/hero-about";
import HomeVideo from "@/components/blocks/HomeVideo";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-x-clip bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
      <div className="bg-noise mix-blend-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />
      <Header />
      <main>
        <HeroV2 />
        <DualCollections />
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-background" />
          <div className="relative">
            <HeroAbout />
          </div>
        </div>
        <BrandStory />
        <HomeVideo />
        <WhyChooseUs />
        <ProductEcosystem />
        <ParallaxInfographics />
        <InnovationSpotlight />
        <TrustStats />
      </main>
      <Footer />
    </div>
  );
}
