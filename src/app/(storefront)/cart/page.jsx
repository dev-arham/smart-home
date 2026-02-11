import React from 'react';
import Header from '@/components/blocks/header';
import Footer from '@/components/blocks/footer';
import Cart from '@/components/blocks/cart';

export const metadata = {
  title: 'Shopping Cart | Aqua Electrical',
  description: 'Review and manage items in your shopping cart.',
};

export default function CartPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <Cart />
      </main>
      <Footer />
    </div>
  );
}
