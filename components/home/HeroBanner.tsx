'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    title: 'New Season Arrivals',
    description: 'Elevate your wardrobe with our latest premium clothing collection.',
    image: '/lifestyle-tee.webp',
    href: '/categories/clothing',
    color: '#1a1a1a'
  },
  {
    id: 2,
    title: 'Essential Accessories',
    description: 'Complete your look with our curated range of minimalist accessories.',
    image: '/lifestyle-tote.webp',
    href: '/categories/accessories',
    color: '#c9a876'
  },
  {
    id: 3,
    title: 'Modern Home Decor',
    description: 'Transform your living space with our contemporary interior pieces.',
    image: '/lifestyle-decor.webp',
    href: '/categories/home-decor',
    color: '#8b6f47'
  }
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isAutoplay])

  const nextSlide = () => {
    setIsAutoplay(false)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setIsAutoplay(false)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoplay(false)
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[90vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image with Zoom effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'linear' }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover opacity-80"
              priority
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/90 lg:via-black/30 lg:to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center lg:items-start justify-center px-6 sm:px-12 lg:px-24 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl text-center lg:text-left"
            >
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xs sm:text-sm uppercase tracking-[0.5em] font-bold text-white/60 mb-6 block"
              >
                Exclusive Collection
              </motion.span>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[120px] font-bold mb-8 leading-[0.9] tracking-tighter">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-xl text-white/80 font-light leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={slides[currentSlide].href}>
                  <Button size="lg" className="h-16 px-12 text-lg bg-white text-black hover:bg-black hover:text-white transition-all duration-500 rounded-full font-bold shadow-2xl">
                    Explore Now
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-16 px-12 text-lg rounded-full font-bold border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500"
                  >
                    View Catalog
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/10 hover:bg-black/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/10 hover:bg-black/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 h-1.5 rounded-full ${
              index === currentSlide
                ? 'w-12 bg-white'
                : 'w-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
