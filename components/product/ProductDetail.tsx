'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, Share2, Star, Truck, RotateCcw } from 'lucide-react'
import { useWishlist, useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Product } from '@/lib/mockData'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [mainImage, setMainImage] = useState(product.image)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [quantity, setQuantity] = useState(1)
  
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const allImages = [product.image, ...(product.images || [])]
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative">
        {/* Left: Compact Image Grid */}
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative aspect-[4/5] bg-secondary/20 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500 ${
                  idx === 0 ? 'sm:col-span-2 aspect-[3/2]' : ''
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={idx === 0}
                />
                {idx === 0 && product.isNew && (
                  <Badge className="absolute top-6 left-6 bg-black text-white px-4 py-1 rounded-full font-bold tracking-widest text-[9px]">
                    NEW
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Refined Sticky Sidebar */}
        <div className="lg:col-span-5 xl:col-span-5">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 space-y-8"
          >
            {/* Header & Price */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent/80">
                  {product.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-black">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  {product.reviews} Reviews
                </span>
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-bold tracking-tight">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground/40 line-through decoration-red-500/20 font-light">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description Preview */}
            <p className="text-muted-foreground leading-relaxed text-base font-light border-t border-border/50 pt-6">
              {product.description}
            </p>

            {/* Selection Controls */}
            <div className="space-y-8">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-2 rounded-full border text-[11px] font-bold transition-all duration-300 ${
                          selectedColor === color
                            ? 'bg-black border-black text-white shadow-md'
                            : 'border-border hover:border-black bg-white text-gray-500'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3.5rem] h-11 flex items-center justify-center rounded-xl border text-[11px] font-bold transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-black border-black text-white shadow-md'
                            : 'border-border hover:border-black bg-white text-gray-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center bg-secondary/20 rounded-xl p-1 border border-border/50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-lg font-light"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-lg font-light"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1 h-14 rounded-xl text-xs font-bold bg-black hover:bg-black/90 shadow-xl transition-all active:scale-95 tracking-widest uppercase"
                  >
                    Add to Bag
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlist}
                    className={`w-14 h-14 rounded-xl border-2 transition-all duration-300 ${
                      inWishlist ? 'bg-red-50 border-red-100 text-red-500 shadow-sm' : 'hover:border-black border-border'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 group">
                <Truck className="w-4 h-4 text-muted-foreground/60" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 group">
                <RotateCcw className="w-4 h-4 text-muted-foreground/60" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs / Full Width Content - OUTSIDE THE GRID */}
      <div className="w-full mt-40 pt-32 border-t border-border clear-both">
        <Tabs defaultValue="description" className="w-full max-w-5xl mx-auto">
          <TabsList className="w-full justify-center bg-transparent border-b border-border rounded-none h-auto p-0 mb-16 gap-16">
            <TabsTrigger 
              value="description" 
              className="px-0 py-6 data-[state=active]:bg-transparent data-[state=active]:!shadow-none data-[state=active]:!border-none data-[state=active]:border-b-2 data-[state=active]:!border-b-black data-[state=active]:text-black rounded-none text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/60 transition-all"
            >
              The Story
            </TabsTrigger>
            <TabsTrigger 
              value="specs" 
              className="px-0 py-6 data-[state=active]:bg-transparent data-[state=active]:!shadow-none data-[state=active]:!border-none data-[state=active]:border-b-2 data-[state=active]:!border-b-black data-[state=active]:text-black rounded-none text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/60 transition-all"
            >
              Craftsmanship
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="px-0 py-6 data-[state=active]:bg-transparent data-[state=active]:!shadow-none data-[state=active]:!border-none data-[state=active]:border-b-2 data-[state=active]:!border-b-black data-[state=active]:text-black rounded-none text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/60 transition-all"
            >
              Voices ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="focus-visible:outline-none">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-3xl sm:text-4xl leading-snug font-serif italic text-black/90 mb-12 text-center">
                  "{product.description}"
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 text-base leading-loose font-light">
                  <p>
                    Each garment is a testament to our pursuit of perfection. We believe that true luxury lies in the details that often go unnoticed, from the precision of a single stitch to the tactile quality of the raw materials we source from the world's finest mills.
                  </p>
                  <p>
                    Our design philosophy centers on longevity and effortless elegance. By eschewing fleeting trends in favor of timeless silhouettes, we create pieces that evolve with you, becoming cherished staples of your personal narrative.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="focus-visible:outline-none">
            <div className="bg-secondary/10 rounded-[3rem] p-12 lg:p-20 border border-border/30">
              <div className="max-w-4xl mx-auto">
                <h3 className="font-serif text-3xl font-bold mb-12 text-center">Technical Integrity</h3>
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-end border-b border-border/50 pb-4 group">
                        <span className="font-bold text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 group-hover:text-black transition-colors">{key}</span>
                        <span className="font-medium text-sm text-black/80">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-center py-10">Standard high-performance specifications apply.</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="focus-visible:outline-none">
            <div className="text-center py-32 bg-black text-white rounded-[4rem] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="max-w-xl mx-auto px-8 relative z-10">
                <div className="flex justify-center gap-1 mb-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <h3 className="font-serif text-4xl sm:text-5xl font-bold mb-6">The Community</h3>
                <p className="text-white/60 mb-12 leading-loose text-lg font-light">
                  A collection of shared experiences from our global collective. Your perspective helps us refine our craft.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    className="rounded-full px-12 h-14 font-bold bg-white text-black hover:bg-white/90 transition-all text-sm tracking-widest uppercase"
                  >
                    <Link href="/products">Shop</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-12 h-14 font-bold border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all text-sm tracking-widest uppercase shadow-none"
                  >
                    Share Your Story
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
