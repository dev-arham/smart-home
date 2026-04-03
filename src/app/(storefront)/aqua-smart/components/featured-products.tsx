'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

const AQUA_PRODUCTS = [
  {
    id: 101,
    name: 'Aqua Smart Sprinkler Pro',
    isNew: true,
    slug: 'aqua-smart-sprinkler-pro',
    price: 249.99,
    rating: 4.9,
    description: 'On-board Flow Monitor & device control. IoT, Alexa & Google home enabled. Weather-based Auto ON/OFF using application.',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800&h=800'
  },
  {
    id: 102,
    name: 'Aqua Leak Detector Ambient',
    isNew: true,
    slug: 'aqua-leak-detector-ambient',
    price: 79.99,
    rating: 4.8,
    description: 'On-board moisture sensing tech. IoT, Alexa & Google home enabled. Instant notification & Valve shutoff using app.',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800&h=800'
  },
  {
    id: 103,
    name: 'ValvGuard 400 Main Hub',
    isNew: false,
    slug: 'valvguard-400-main-hub',
    price: 199.99,
    rating: 4.7,
    description: 'SpaceTech Flow Purification Technology. Portable AQI Remote for realtime water quality monitoring. IoT, Alexa & Google home enabled.',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800&h=800'
  },
  {
    id: 104,
    name: 'Aqua Smart Faucet Base',
    isNew: false,
    slug: 'aqua-smart-faucet-base',
    price: 129.99,
    rating: 4.9,
    description: 'SpaceTech Flow Delivery Technology with TiO2 module. Portable Normal Remote for realtime flow monitoring. IoT, Alexa & Google home enabled.',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800&h=800'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-[#F2F2F2]">
      <div className="container mx-auto px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-xl md:text-2xl font-bold text-zinc-800">
            Aqua Smart Products You&apos;ll Love
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
        >
          {AQUA_PRODUCTS.map((product) => (
             <motion.div
                 key={product.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0, transition: { ease: [0.34, 1.56, 0.64, 1], duration: 0.6 } }}
                 className="group relative bg-white rounded-2xl p-2 border border-zinc-100 hover:border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 ease-out flex flex-col h-full"
             >
                 {/* Image Container with elegant overflow and hover scale */}
                 <Link href={`/product/${product.slug}`} className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 block">
                     <img
                         src={product.image}
                         alt={product.name}
                         className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                     />
                     <div className="absolute top-3 left-3 flex gap-2">
                         {product.isNew && (
                             <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-zinc-900 rounded-full shadow-sm">
                                 NEW
                             </span>
                         )}
                     </div>

                     {/* Add to Cart Overlay */}
                     <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                         <button 
                             className="w-full py-2.5 bg-zinc-900/90 hover:bg-zinc-900 backdrop-blur-md text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg"
                             onClick={(e) => { e.preventDefault(); /* Add to cart logic */ }}
                         >
                             <ShoppingCart className="w-4 h-4" />
                             Add to Cart
                         </button>
                     </div>
                 </Link>

                 {/* Product Details */}
                 <div className="flex flex-col flex-grow p-2">
                     <div className="flex justify-between items-start mb-1">
                         <Link href={`/product/${product.slug}`}>
                             <h3 className="font-semibold text-zinc-900 line-clamp-1 group-hover:text-primary transition-colors">
                                 {product.name}
                             </h3>
                         </Link>
                     </div>
                     <div className="flex items-center gap-1 mb-3 text-zinc-400">
                         <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                         <span className="text-xs font-medium text-zinc-600">{product.rating}</span>
                     </div>
                     <p className="text-sm text-zinc-600 line-clamp-3 mb-4">
                         {product.description}
                     </p>
                     <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-100">
                         <span className="text-lg font-bold text-zinc-900">
                             PKR {product.price.toFixed(2)}
                         </span>
                     </div>
                 </div>
             </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}