'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8, // Elegant, slightly longer duration for dynamic sliding
  className = ''
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Highly efficient native IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold: 0.05,
        rootMargin: '-30px', // Triggers animation dynamically as it enters viewport
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Exact sliding translations for pronounced and stunning effects
  const transformOffsets = {
    up: 'translateY(60px)',
    down: 'translateY(-60px)',
    left: 'translateX(60px)',
    right: 'translateX(-60px)',
    none: 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transformOffsets[direction],
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple-grade premium transition curve
        willChange: 'transform, opacity', // Promotes to GPU compositor layer for 120Hz smooth scrolling
      }}
      className={className}
    >
      {children}
    </div>
  )
}
