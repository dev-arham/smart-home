import CategoriesUI from '@/components/blocks/categories';
import Footer from '@/components/blocks/footer';
import Header from '@/components/blocks/header';
import { getCategoryTree } from '@/lib/queries/category.queries';
import { getProducts } from '@/lib/queries/product.queries';

export default async function CategoryPage() {
  const [categories, productsResult] = await Promise.all([
    getCategoryTree(),
    getProducts({ pageSize: 100 }),
  ]);

  return (
    <>
      <Header />
      <CategoriesUI categories={categories} products={productsResult.data} />
      <Footer />
    </>
  );
}
