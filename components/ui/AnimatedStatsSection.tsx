'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import FadeIn from '@/components/ui/fade-in'
import { cn } from '@/lib/utils'

export type StatConfig = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  showStar?: boolean
}

type AnimatedStatsSectionProps = {
  stats: StatConfig[]
  columns?: 2 | 3 | 4
  className?: string
  valueClassName?: string
}

function AnimatedValue({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  showStar = false,
  className,
}: Pick<StatConfig, 'value' | 'prefix' | 'suffix' | 'decimals' | 'showStar'> & {
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 1800
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString()

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1 text-4xl font-bold text-accent mb-2 tabular-nums',
        className,
      )}
    >
      {prefix}
      {formatted}
      {suffix}
      {showStar && <Star className="w-7 h-7 fill-accent text-accent shrink-0" />}
    </span>
  )
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
}

export default function AnimatedStatsSection({
  stats,
  columns = 3,
  className,
  valueClassName,
}: AnimatedStatsSectionProps) {
  return (
    <div className={cn('grid gap-8 text-center', columnClasses[columns], className)}>
      {stats.map((stat, index) => (
        <FadeIn key={stat.label} delay={index * 0.12} className="text-center">
          <AnimatedValue
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals}
            showStar={stat.showStar}
            className={valueClassName}
          />
          <p className="text-muted-foreground">{stat.label}</p>
        </FadeIn>
      ))}
    </div>
  )
}
