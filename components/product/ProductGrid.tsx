'use client'

import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating?: number
  reviews?: number
  discount?: number
  isNew?: boolean
  isFeatured?: boolean
  category?: string
}

interface ProductGridProps {
  products: Product[]
  viewMode?: 'grid' | 'list'
  isLoading?: boolean
  isEmpty?: boolean
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  viewMode = 'grid',
  isLoading = false,
  isEmpty = false,
  emptyMessage = 'No products found',
}: ProductGridProps) {
  const layoutClass =
    viewMode === 'list'
      ? 'flex flex-col gap-4'
      : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'

  if (isLoading) {
    return (
      <div className={layoutClass}>
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} variant={viewMode} />
        ))}
      </div>
    )
  }

  if (isEmpty || products.length === 0) {
    return (
      <div className="col-span-full flex items-center justify-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={layoutClass}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} variant={viewMode} />
      ))}
    </div>
  )
}
