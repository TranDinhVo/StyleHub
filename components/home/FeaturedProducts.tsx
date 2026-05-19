'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/mockData'

export default function FeaturedProducts() {
  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 8)

  return (
    <section className="py-12 sm:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
            The Season's Best
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our curated selection of top-selling pieces and new arrivals, handpicked for their exceptional quality and design.
          </p>
        </div>
        <Link href="/products" className="hidden sm:block">
          <Button variant="outline" className="rounded-full px-8 h-12 border-2 font-bold hover:bg-black hover:text-white transition-all duration-300">
            View All Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="mt-12 sm:hidden flex justify-center">
        <Link href="/products" className="w-full">
          <Button className="w-full h-14 rounded-2xl font-bold">View All Products</Button>
        </Link>
      </div>
    </section>
  )
}
