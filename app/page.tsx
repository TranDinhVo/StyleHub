import { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBar from '@/components/home/TrustBar'
import Testimonials from '@/components/home/Testimonials'
import Newsletter from '@/components/home/Newsletter'
import FadeIn from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'StyleHub - Premium Fashion & Home Decor',
  description: 'Discover premium accessories, clothing, and home decor at StyleHub. Shop the latest trends with fast shipping and easy returns.',
  openGraph: {
    title: 'StyleHub - Premium Fashion & Home Decor',
    description: 'Discover premium accessories, clothing, and home decor',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full">
        <HeroBanner />
      </section>

      {/* Main Content */}
      <div className="container-responsive mx-auto space-y-16 py-12 sm:py-16">
        {/* Category Showcase */}
        <FadeIn>
          <CategoryShowcase />
        </FadeIn>

        {/* Featured Products */}
        <FadeIn delay={0.2}>
          <FeaturedProducts />
        </FadeIn>

        {/* Trust Bar */}
        <FadeIn>
          <TrustBar />
        </FadeIn>

        {/* Testimonials */}
        <FadeIn>
          <Testimonials />
        </FadeIn>

        {/* Newsletter */}
        <FadeIn className="max-w-6xl mx-auto">
          <Newsletter />
        </FadeIn>
      </div>
    </div>
  )
}
