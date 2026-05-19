'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: 'clothing',
    name: 'Premium Apparel',
    description: 'Curated clothing for modern lifestyle',
    image: '/lifestyle-tee.webp',
    href: '/categories/clothing',
  },
  {
    id: 'accessories',
    name: 'Luxury Accessories',
    description: 'Timeless pieces to complete your look',
    image: '/lifestyle-tote.webp',
    href: '/categories/accessories',
  },
  {
    id: 'home-decor',
    name: 'Home & Interior',
    description: 'Design-led pieces for your living space',
    image: '/lifestyle-decor.webp',
    href: '/categories/home-decor',
  }
]

export default function CategoryShowcase() {
  return (
    <section className="py-24 sm:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground mb-4 block"
          >
            Our Collections
          </motion.span>
          <h2 className="font-serif text-5xl sm:text-7xl font-bold mb-8 tracking-tighter leading-[0.9]">
            The Art of Living <br />
            <span className="text-muted-foreground/30 italic font-light">& Curated Design</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto lg:h-[800px]">
        {/* Category 1 - Large Left */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="md:col-span-7 relative group overflow-hidden rounded-[2rem] bg-secondary/20 shadow-2xl h-[500px] md:h-full"
        >
          <Link href={categories[0].href} className="absolute inset-0">
            <Image
              src={categories[0].image}
              alt={categories[0].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-12 text-white">
              <h3 className="font-serif text-4xl sm:text-5xl font-bold mb-4">{categories[0].name}</h3>
              <p className="text-lg text-white/70 max-w-xs mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                {categories[0].description}
              </p>
              <Button variant="outline" className="rounded-full bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black font-bold">
                Explore Collection
              </Button>
            </div>
          </Link>
        </motion.div>

        {/* Column 2 */}
        <div className="md:col-span-5 grid grid-rows-2 gap-8">
          {/* Category 2 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="relative group overflow-hidden rounded-[2rem] bg-secondary/20 shadow-xl"
          >
            <Link href={categories[1].href} className="absolute inset-0">
              <Image
                src={categories[1].image}
                alt={categories[1].name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white">
                <div className="max-w-xs">
                  <h3 className="font-serif text-3xl font-bold mb-2">{categories[1].name}</h3>
                  <span className="inline-block h-0.5 w-12 bg-white mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {categories[1].description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Category 3 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="relative group overflow-hidden rounded-[2rem] bg-secondary/20 shadow-xl"
          >
            <Link href={categories[2].href} className="absolute inset-0">
              <Image
                src={categories[2].image}
                alt={categories[2].name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white">
                <div className="max-w-xs">
                  <h3 className="font-serif text-3xl font-bold mb-2">{categories[2].name}</h3>
                  <span className="inline-block h-0.5 w-12 bg-white mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {categories[2].description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
