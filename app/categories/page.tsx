import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categoryCatalog } from '@/lib/categoryCatalog'

export const metadata = {
  title: 'Categories | StyleHub',
  description: 'Browse all StyleHub collections — clothing, accessories, and home decor.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border py-12 md:py-16">
        <div className="container-responsive mx-auto text-center max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Collections
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-4">
            Shop by Category
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our curated collections and find products that match your style.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-responsive mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryCatalog.map((category) => (
              <article
                key={category.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <h2 className="absolute bottom-4 left-4 font-serif text-2xl font-bold text-white">
                    {category.name}
                  </h2>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    {category.description}
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link href={`/categories/${category.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full group/btn">
                        View Collection
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </Link>
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="flex-1"
                    >
                      <Button className="w-full">Shop Products</Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
