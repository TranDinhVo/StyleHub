import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import ProductCard from '@/components/product/ProductCard'
import { getProductsByCategory, mockProducts } from '@/lib/mockData'

const categoryInfo = {
  accessories: {
    name: 'Accessories',
    title: 'Premium Accessories',
    description: 'Discover our carefully curated collection of luxury accessories. From elegant watches to designer handbags, find the perfect piece to complete your look.',
    image: '/lifestyle-tote.webp',
    color: '#c9a876',
    subcategories: ['Bags', 'Jewelry', 'Watches', 'Sunglasses']
  },
  clothing: {
    name: 'Clothing',
    title: 'Curated Clothing Collection',
    description: 'Elevate your style with our carefully selected clothing pieces. From timeless basics to statement pieces, discover fashion that expresses your unique personality.',
    image: '/lifestyle-tee.webp',
    color: '#1a1a1a',
    subcategories: ['Tops', 'Dresses', 'Outerwear', 'Basics']
  },
  'home-decor': {
    name: 'Home Decor',
    title: 'Transform Your Space',
    description: 'Create the home of your dreams with our beautiful home decor collection. From modern minimalist designs to classic elegance, find inspiration for every room.',
    image: '/lifestyle-decor.webp',
    color: '#8b6f47',
    subcategories: ['Lighting', 'Textiles', 'Decor', 'Furniture']
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  return [
    { slug: 'accessories' },
    { slug: 'clothing' },
    { slug: 'home-decor' },
  ]
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params
  const info = categoryInfo[slug as keyof typeof categoryInfo]

  if (!info) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${info.name} | StyleHub`,
    description: info.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const info = categoryInfo[slug as keyof typeof categoryInfo]

  if (!info) {
    notFound()
  }

  const products = getProductsByCategory(info.name)

  return (
    <div className="min-h-screen py-12">
      <div className="container-responsive">
        {/* Category Hero */}
        <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden rounded-[2rem] mb-16 group">
          <Image
            src={info.image}
            alt={info.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative h-full flex flex-col items-start justify-end p-8 sm:p-16 text-white">
            <span className="text-xs uppercase tracking-[0.5em] font-bold text-white/70 mb-4">
              Explore Collection
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl font-bold mb-6 leading-tight tracking-tighter">
              {info.title}
            </h1>
            <p className="text-white/80 max-w-xl text-lg font-light leading-relaxed">
              {info.description}
            </p>
          </div>
        </section>

        {/* Subcategories Filter */}
        {info.subcategories.length > 0 && (
          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-border/50">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-2">Curated Selection</h2>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">
                  {products.length} Items in {info.name}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {info.subcategories.map((subcat) => (
                  <button
                    key={subcat}
                    className="px-8 py-3 rounded-full border border-border hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest"
                  >
                    {subcat}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <div className="space-y-32">
          {/* Products Grid */}
          <section>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-secondary/10 rounded-[3rem]">
                <p className="text-muted-foreground font-serif text-xl italic">
                  We are currently updating our {info.name} collection. Check back soon.
                </p>
              </div>
            )}
          </section>

          {/* Trending / Featured Section */}
          {products.length > 4 && (
            <section className="pt-24 border-t border-border">
              <div className="flex items-end justify-between mb-16">
                <div className="max-w-2xl">
                  <span className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4 block">
                    Staff Picks
                  </span>
                  <h3 className="font-serif text-4xl sm:text-5xl font-bold">Trending in {info.name}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
