import Link from 'next/link'
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container-responsive mx-auto py-12">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">S</span>
              </div>
              <span className="font-serif text-2xl font-bold">StyleHub</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover premium accessories, clothing, and home decor for a lifestyle that reflects your unique style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-serif font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/categories/clothing" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/categories/home-decor" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-serif font-bold mb-4">Connect</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@stylehub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>New York, NY</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; 2024 StyleHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
