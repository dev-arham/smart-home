import Footer from "@/components/blocks/footer"
import Header from "@/components/blocks/header"
import HeroBanner from "./components/hero-banner"
import FeaturedProducts from "./components/featured-products"
import VideoBanner from "./components/video-banner"
import ImpactSection from "./components/impact-section"

const page = () => {
    return (
        <div className="min-h-screen bg-[#F4F4F4]">
            <Header />
            <main className="relative w-full overflow-hidden">
                <HeroBanner />
                <FeaturedProducts />
                <VideoBanner />
                <ImpactSection />
            </main>
            <Footer />
        </div>
    )
}

export default page