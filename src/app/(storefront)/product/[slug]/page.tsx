import Footer from '@/components/blocks/footer';
import Header from '@/components/blocks/header';
import ProductView from './components/product-view';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return (
        <div className="bg-zinc-50 min-h-screen">
            <Header />
            <div className="relative w-full pb-24">
                <ProductView slug={slug} />
            </div>
            <Footer />
        </div>
    );
};

export default page;
