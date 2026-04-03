import Footer from '@/components/blocks/footer';
import Header from '@/components/blocks/header';
import Banner from './components/banner';
import FilterBar from './components/filter-bar';
import Products from './components/products';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    return (
        <>
            <Header />
            <div className='relative w-full'>
                <Banner />
                <FilterBar />
                <Products />
            </div>
            <Footer />
        </>
    )
}

export default page