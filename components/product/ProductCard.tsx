'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useWishlist, useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
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
  variant?: 'grid' | 'list'
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  images = [],
  rating = 4.5,
  reviews = 0,
  discount,
  isNew = false,
  isFeatured = false,
  category,
  variant = 'grid',
}: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  const inWishlist = isInWishlist(id)
  const isList = variant === 'list'
  const secondaryImage = images.length > 1 ? images[1] : image

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(id)
    } else {
      addToWishlist({ id, name, price, image })
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: id,
      name,
      price,
      originalPrice,
      image,
      quantity: 1,
    })
  }

  return (
    <motion.div
      whileHover={{ y: isList ? 0 : -5 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-border/50 ${
        isList ? 'flex flex-row min-h-[180px]' : 'flex flex-col h-full'
      }`}
    >
      <div
        className={`relative overflow-hidden bg-secondary/30 shrink-0 ${
          isList ? 'w-36 sm:w-44 md:w-52 min-h-[180px]' : 'w-full aspect-[3/4]'
        }`}
      >
        <Link href={`/products/${id}`} className="block h-full min-h-[inherit]">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-all duration-700 ease-in-out ${
              images.length > 1 && !isList
                ? 'group-hover:opacity-0 group-hover:scale-110'
                : 'group-hover:scale-105'
            }`}
            sizes={
              isList
                ? '200px'
                : '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
            }
          />
          {images.length > 1 && !isList && (
            <Image
              src={secondaryImage}
              alt={`${name} alternate view`}
              fill
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-700 ease-in-out"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {discount && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white border-none px-3 py-1 text-xs font-bold rounded-full shadow-lg">
              -{discount}%
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-black hover:bg-black/80 text-white border-none px-3 py-1 text-xs font-bold rounded-full shadow-lg">
              NEW
            </Badge>
          )}
        </div>

        {!isList && (
          <motion.div
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            className="absolute inset-x-0 bottom-0 p-4 z-10 bg-gradient-to-t from-black/60 to-transparent pt-10"
          >
            <Button
              onClick={handleAddToCart}
              className="w-full bg-white text-black hover:bg-white/90 rounded-full font-bold shadow-2xl h-12"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 hover:bg-white text-foreground transition-all duration-300 backdrop-blur-md shadow-lg z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </motion.button>
      </div>

      <div className={`flex-1 flex flex-col ${isList ? 'p-4 sm:p-6' : 'p-4'}`}>
        <Link href={`/products/${id}`} className="flex-1 flex flex-col">
          {category && (
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-2">
              {category}
            </p>
          )}
          <h3
            className={`font-serif font-bold mb-2 group-hover:text-black transition-colors ${
              isList ? 'text-lg sm:text-xl line-clamp-2' : 'text-base line-clamp-1'
            }`}
          >
            {name}
          </h3>
        </Link>

        <div
          className={`mt-auto flex items-center gap-3 ${
            isList ? 'flex-wrap pt-3' : 'justify-between pt-4 border-t border-secondary/50'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`font-bold tracking-tight ${isList ? 'text-lg' : 'text-base'}`}>
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {reviews > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold">{rating}</span>
              {isList && (
                <span className="text-xs text-muted-foreground">({reviews})</span>
              )}
            </div>
          )}

          {isList && (
            <Button
              onClick={handleAddToCart}
              className="w-full sm:w-auto sm:ml-auto rounded-full font-bold h-10 px-6"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Bag
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
