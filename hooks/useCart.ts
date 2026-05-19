import { useCartStore } from '@/store/cartStore'

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.1
  const total = subtotal + shippingCost + tax

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    tax,
    total,
  }
}

export function useWishlist() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useCartStore()

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }
}
