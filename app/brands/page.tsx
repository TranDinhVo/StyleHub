'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { brandLabelToSlug } from '@/lib/brandCatalog'
import BrandStats from '@/components/brands/BrandStats'

const featuredBrands = [
  {
    id: 1,
    name: 'Elegance Collective',
    category: 'Accessories',
    description: 'Italian crafted accessories with timeless elegance',
    image: '/brand-elegance-collective.webp',
    products: 245,
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Urban Modern',
    category: 'Clothing',
    description: 'Contemporary street wear with premium fabrics',
    image: '/brand-urban-modern.webp',
    products: 189,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Nature's Haven",
    category: 'Home Decor',
    description: 'Sustainable home furnishings inspired by nature',
    image: '/brand-natures-haven.webp',
    products: 312,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Luxe Essentials',
    category: 'Accessories',
    description: 'Designer essentials for the modern lifestyle',
    image: '/brand-luxe-essentials.webp',
    products: 156,
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Artisan Workshop',
    category: 'Home Decor',
    description: 'Handmade artisanal pieces with authentic charm',
    image: '/brand-artisan-workshop.webp',
    products: 203,
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Style Vanguard',
    category: 'Clothing',
    description: 'Cutting-edge fashion for trendsetters',
    image: '/brand-style-vanguard.webp',
    products: 267,
    rating: 4.8,
  },
]

export default function BrandsPage() {

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container-responsive mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
            Discover Premium Brands
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Curated collection of the world&apos;s finest brands specializing in accessories, clothing, and home decor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BrandStats />

      {/* Featured Brands Grid */}
      <section className="py-16 md:py-24">
        <div className="container-responsive mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">Featured Brands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBrands.map((brand) => (
              <div key={brand.id} className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Brand Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                      {brand.category}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {brand.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {brand.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-border">
                    <span className="text-muted-foreground">{brand.products} products</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{brand.rating}</span>
                    </div>
                  </div>

                  <Link href={`/products?brand=${brandLabelToSlug[brand.name] ?? ''}`}>
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      Explore Brand
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Brands */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
        <div className="container-responsive mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">Why Our Brands Stand Out</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <Award className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Award-Winning Quality</h3>
              <p className="text-sm text-muted-foreground">
                Each brand is carefully selected for their commitment to excellence, craftsmanship, and innovation.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <Globe className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Global Selection</h3>
              <p className="text-sm text-muted-foreground">
                From Italian artisans to contemporary designers, we bring the world&apos;s best to your doorstep.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <Star className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Verified Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Every product is quality-checked and customer-verified for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container-responsive mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Browse our complete collection of premium brands and find your next favorite piece.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
