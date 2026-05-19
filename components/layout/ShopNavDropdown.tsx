'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  shopCategories,
  shopAllLink,
  categoriesNavLink,
  desktopNavLinkClass,
  parseCategorySlugsFromParam,
} from '@/lib/navigation'
import { cn } from '@/lib/utils'

const categoryPillClass =
  'inline-flex items-center justify-center rounded-full bg-secondary/80 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary'

export default function ShopNavDropdown() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const activeCategorySlugs = parseCategorySlugsFromParam(categoryParam)
  const [open, setOpen] = useState(false)

  const isOnProductsPage = pathname === '/products'
  const isOnCategoriesPage =
    pathname === categoriesNavLink.href || pathname.startsWith('/categories/')

  const isShopActive = isOnProductsPage && activeCategorySlugs.length === 0

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={shopAllLink.href}
        className={cn(
          desktopNavLinkClass,
          'inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors',
          (open || isShopActive) && 'bg-secondary/70 text-primary',
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Shop
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          'absolute left-0 top-full z-50 pt-2',
          'transition-all duration-200 ease-out',
          open
            ? 'pointer-events-auto visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-1 opacity-0',
        )}
      >
        <div
          role="menu"
          aria-label="Shop categories"
          className="rounded-2xl border border-border bg-background p-4 shadow-lg"
        >
          <div className="flex flex-col items-stretch gap-2 min-w-[180px]">
            <Link
              href={categoriesNavLink.href}
              role="menuitem"
              className={cn(
                categoryPillClass,
                'w-full justify-center',
                isOnCategoriesPage &&
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              )}
              onClick={() => setOpen(false)}
            >
              {categoriesNavLink.label}
            </Link>
            <div className="border-t border-border" />
            {shopCategories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={cn(
                  categoryPillClass,
                  'w-full justify-center',
                  isOnProductsPage &&
                    activeCategorySlugs.includes(item.slug) &&
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

