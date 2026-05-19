import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface CartStore {
  items: CartItem[]
  wishlist: WishlistItem[]
  
  // Cart actions
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // Wishlist actions
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
          )
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          
          return {
            items: [
              ...state.items,
              {
                ...item,
                id: `${item.productId}-${Date.now()}`,
              },
            ],
          }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      addToWishlist: (item) => {
        set((state) => {
          const exists = state.wishlist.some((w) => w.id === item.id)
          if (exists) return state
          return {
            wishlist: [...state.wishlist, item],
          }
        })
      },
      
      removeFromWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        }))
      },
      
      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id)
      },
    }),
    {
      name: 'stylehub-store',
      version: 1,
    }
  )
)
