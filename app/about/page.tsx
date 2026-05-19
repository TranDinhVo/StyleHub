import Link from 'next/link'
import { ArrowRight, Sparkles, Heart, Globe, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AboutClient from '@/components/about/AboutClient'
import AboutStats from '@/components/about/AboutStats'

export const metadata = {
  title: 'About StyleHub - Premium Fashion & Home Decor Brand',
  description: 'Discover the story behind StyleHub. Learn about our commitment to quality, sustainability, and luxury.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="container-responsive mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">Our Story</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-balance">
                Curating Luxury for Every Home
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                StyleHub is more than just a shopping destination—it&apos;s a carefully curated collection of the world&apos;s finest fashion, accessories, and home decor. We believe that true luxury isn&apos;t about excess, it&apos;s about intentionality, quality, and timeless beauty.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products">
                  <Button className="group">
                    Explore Collections
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/categories/accessories">
                  <Button variant="outline">Shop Accessories</Button>
                </Link>
              </div>
            </div>

            {/* Brand Image Placeholder */}
            <div className="relative h-96 md:h-full bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 rounded-2xl border border-border flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-bold">StyleHub</h3>
                <p className="text-sm text-muted-foreground">Premium Collections Since 2018</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutClient />



      <AboutStats />

      {/* Brand Promise Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Brand Promise</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every product that bears the StyleHub name comes with an uncompromising commitment to quality. We source our items from manufacturers and artisans who share our values. We stand behind every purchase, offering a 30-day satisfaction guarantee and responsive customer service.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Authentic & Verified</h4>
                    <p className="text-muted-foreground text-sm">All products are authenticated and verified for authenticity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure & Fast Shipping</h4>
                    <p className="text-muted-foreground text-sm">We partner with trusted carriers for safe delivery worldwide.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Exceptional Support</h4>
                    <p className="text-muted-foreground text-sm">Our dedicated team is here to help with any questions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-2xl p-8 flex flex-col justify-center h-fit">
              <h3 className="text-2xl font-serif font-bold mb-3">Stay Connected</h3>
              <p className="text-muted-foreground mb-6">Get exclusive access to new collections, special offers, and brand stories.</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-sm outline-none focus:border-accent transition-colors"
                />
                <Button className="w-full">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container-responsive mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Discover StyleHub?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Explore our curated collections and find pieces that speak to your unique style.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <Button variant="secondary" className="group">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/products?category=home-decor">
              <Button
                variant="outline"
                className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Home Decor Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
