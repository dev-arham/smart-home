import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import HeroElectrical from "./components/hero-electrical";
import ElectricalCategories from "./components/electrical-categories";
import ElectricalProducts from "./components/electrical-products";
import ElectricalFeatures from "./components/electrical-features";
import WhyChooseUs from "@/components/blocks/v2/why-choose-us";
import TrustStats from "@/components/blocks/v2/trust-stats";

export const metadata = {
  title: "Aqua Electrical — Premium Traditional Electrical Collection",
  description:
    "Precision switchgear, sockets and accessories engineered to last decades — the quiet, dependable layer behind every great home.",
};

export default function AquaElectricalPage() {
  return (
    <div className="relative w-full overflow-x-clip bg-background text-foreground">
      <div className="bg-noise mix-blend-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />
      <Header />
      <main>
        <HeroElectrical />
        <ElectricalCategories />
        <ElectricalProducts />
        <ElectricalFeatures />
        <WhyChooseUs />
        <TrustStats />
      </main>
      <Footer />
    </div>
  );
}
