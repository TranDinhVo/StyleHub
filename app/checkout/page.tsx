'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { Loader2, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const { items } = useCart()
  const router = useRouter()

  useEffect(() => {
    // Safely parse query parameters on the client-side inside useEffect
    const queryParams = new URLSearchParams(window.location.search)
    const directProductId = queryParams.get('product')
    const directQuantity = queryParams.get('quantity') || '1'

    const WP_SITE = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://stylehub-checkout.com'

    // Scenario A: Direct Buy / No Cart
    if (directProductId) {
      const checkoutUrl = `${WP_SITE}/checkout/?add-to-cart=${directProductId}&quantity=${directQuantity}`
      const redirectTimer = setTimeout(() => {
        window.location.href = checkoutUrl
      }, 1500)
      return () => clearTimeout(redirectTimer)
    }

    // Scenario B: Fallback to Cart (if any remain)
    if (items.length === 0) {
      const timer = setTimeout(() => {
        router.push('/products')
      }, 2000)
      return () => clearTimeout(timer)
    }

    const ids = items.map(item => item.productId).join(',')
    const quantities = items.map(item => item.quantity).join(',')
    const checkoutUrl = `${WP_SITE}/checkout/?add-to-cart=${ids}&quantity=${quantities}`
    
    const redirectTimer = setTimeout(() => {
      window.location.href = checkoutUrl
    }, 1500)

    return () => clearTimeout(redirectTimer)
  }, [items, router])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto space-y-8">
        {/* Secure Loader Animation */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-black/5 rounded-full">
          <Loader2 className="w-12 h-12 animate-spin text-black" />
          <Lock className="w-5 h-5 absolute bottom-1 right-1 text-green-600 bg-white rounded-full p-0.5 border border-green-100" />
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-black">
            Preparing Checkout
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto font-light">
            Securing your connection and redirecting you to our secure payment gateway on WordPress...
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60 bg-secondary/30 px-6 py-3 rounded-full border border-border/50">
          <Lock className="w-3.5 h-3.5 text-green-600" />
          <span>AES-256 Encrypted Redirect</span>
        </div>
      </div>
    </div>
  )
}
