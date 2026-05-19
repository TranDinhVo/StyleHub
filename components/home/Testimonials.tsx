'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Fashion Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'StyleHub has completely transformed my wardrobe. The quality is exceptional and the styling tips are invaluable!'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'I trust StyleHub for all my home decor needs. Their collection is curated with such care and attention to detail.'
  },
  {
    id: 3,
    name: 'Emma Johnson',
    role: 'Lifestyle Blogger',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    text: 'The accessories here are simply stunning. Every piece is worth the investment and the customer service is top-notch!'
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    role: 'Professional',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 4,
    text: 'Excellent quality products and fast shipping. Would definitely recommend to anyone looking for premium items.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground mb-4 block">
            Community
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
            Loved by Connoisseurs
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-4">
            {testimonials.map((t) => (
              <div key={t.id} className="relative w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-sm font-bold ml-4">10k+ Happy Customers</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-10 rounded-[2rem] bg-secondary/20 hover:bg-white border border-transparent hover:border-border hover:shadow-2xl transition-all duration-500 group"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-xl sm:text-2xl font-serif italic text-foreground mb-10 leading-relaxed group-hover:text-black transition-colors">
              "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-base">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
