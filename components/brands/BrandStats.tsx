'use client'

import AnimatedStatsSection, { type StatConfig } from '@/components/ui/AnimatedStatsSection'

const brandStats: StatConfig[] = [
  { value: 50, suffix: '+', label: 'Premium Brands' },
  { value: 2500, suffix: '+', label: 'Quality Products' },
  { value: 4.8, decimals: 1, label: 'Average Rating', showStar: true },
]

export default function BrandStats() {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container-responsive mx-auto">
        <AnimatedStatsSection stats={brandStats} columns={3} />
      </div>
    </section>
  )
}
