'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

const DUMMY_PRODUCTS = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: `Smart Device Series ${i + 1}`,
    slug: `smart-device-series-${i + 1}`,
    price: 199.99 + (i * 50),
    rating: 4.8,
    image: `https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800&h=800`, // Placeholder image
    description: `Experience the future of home automation with our Smart Device Series ${i + 1}. Designed to seamlessly integrate into your lifestyle, these devices offer unparalleled convenience, security, and energy efficiency. Whether you're looking to control your lighting, enhance your security system, or optimize your home's energy usage, our Smart Device Series has you covered. With intuitive controls, sleek designs, and cutting-edge technology, these devices are the perfect addition to any modern smart home setup. Elevate your living space and enjoy the benefits of a truly connected home with our Smart Device Series ${i + 1}.`
}));

export default function Products() {
    return (
        <div className="container mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
            >
                {DUMMY_PRODUCTS.map((product) => (
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
                                {product.id % 3 === 0 && (
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
                                <span className="text-xs pl-1 border-l border-zinc-200 ml-1">(124 reviews)</span>
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
    );
}
