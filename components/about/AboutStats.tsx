'use client'

import AnimatedStatsSection, { type StatConfig } from '@/components/ui/AnimatedStatsSection'

const aboutStats: StatConfig[] = [
  { value: 50, suffix: 'K+', label: 'Happy Customers' },
  { value: 2500, suffix: '+', label: 'Products' },
  { value: 25, suffix: '+', label: 'Countries' },
  { value: 99, suffix: '%', label: 'Satisfaction' },
]

export default function AboutStats() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
      <div className="container-responsive mx-auto max-w-6xl">
        <AnimatedStatsSection
          stats={aboutStats}
          columns={4}
          valueClassName="text-4xl md:text-5xl font-serif"
        />
      </div>
    </section>
  )
}
