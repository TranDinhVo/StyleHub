'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Menu, Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import MobileMenu from './MobileMenu'
import CartDrawer from './CartDrawer'
import ShopNavDropdown from './ShopNavDropdown'
import { useCart } from '@/hooks/useCart'
import { mainNavLinks, desktopNavLinkClass } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { items } = useCart()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive mx-auto">
        {/* Main header */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6">
                <span className="text-white font-serif font-bold text-xl">S</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight hidden sm:inline">StyleHub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Suspense fallback={null}>
              <ShopNavDropdown />
            </Suspense>
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  desktopNavLinkClass,
                  isActive(link.href) && 'text-primary',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-secondary/50 rounded-full px-4 py-2 flex-1 max-w-[200px] border border-transparent focus-within:border-primary/20 transition-all">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent text-sm outline-none placeholder-muted-foreground flex-1"
                onFocus={() => setSearchOpen(true)}
              />
            </div>

            {/* Cart Icon */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open Shopping Bag" className="relative hover:bg-secondary rounded-full h-10 w-10">
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0">
                <CartDrawer onClose={() => setCartOpen(false)} />
              </SheetContent>
            </Sheet>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Open Menu" className="hover:bg-secondary rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <MobileMenu onClose={() => setMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="sm:hidden pb-3">
            <div className="flex items-center bg-secondary rounded-full px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 bg-transparent text-sm outline-none placeholder-muted-foreground w-full"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
