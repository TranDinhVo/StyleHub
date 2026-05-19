'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import CartItemSkeleton from './CartItemSkeleton'

interface CartDrawerProps {
  onClose: () => void
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, total } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-2xl font-bold">Shopping Bag</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-2xl font-bold mb-2">Your bag is empty</h3>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything to your bag yet.
        </p>
        <Button onClick={onClose} className="w-full rounded-full h-12">
          Start Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="font-serif text-2xl font-bold">Shopping Bag ({items.length})</h2>
        <button onClick={onClose} className="p-1 hover:bg-secondary rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {item.size && (
                    <p className="text-xs text-muted-foreground mb-1">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-secondary rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-6 bg-secondary/10 border-t border-border space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-green-600 font-medium">Calculated at checkout</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <Link href="/checkout" onClick={onClose} className="block w-full">
          <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl">
            Checkout Now
          </Button>
        </Link>
        <p className="text-center text-xs text-muted-foreground">
          Free shipping on orders over $500
        </p>
      </div>
    </div>
  )
}
