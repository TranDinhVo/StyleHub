'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { shopCategories, shopAllLink, categoriesNavLink, mainNavLinks } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  onClose: () => void
}

const linkClass =
  'text-base font-medium text-foreground hover:text-accent transition-colors py-2 block'

const subLinkClass =
  'text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-2 block pl-3'

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [shopOpen, setShopOpen] = useState(false)

  return (
    <div className="flex flex-col space-y-2 py-4">
      <Link href="/" onClick={onClose} className={linkClass}>
        Home
      </Link>

      <Collapsible open={shopOpen} onOpenChange={setShopOpen}>
        <CollapsibleTrigger
          className={cn(
            linkClass,
            'flex w-full items-center justify-between',
          )}
        >
          Shop
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              shopOpen && 'rotate-180',
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pb-2 pl-1">
          <Link href={categoriesNavLink.href} onClick={onClose} className={subLinkClass}>
            {categoriesNavLink.label}
          </Link>
          <Link href={shopAllLink.href} onClick={onClose} className={subLinkClass}>
            {shopAllLink.label}
          </Link>
          {shopCategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={subLinkClass}
            >
              {item.label}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {mainNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className={linkClass}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
