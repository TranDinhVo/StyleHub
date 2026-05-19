'use client'

import dynamic from 'next/dynamic'
import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

// Client-only dynamic loading is fully supported inside Client Components
const CustomCursor = dynamic(() => import('./custom-cursor'), {
  ssr: false,
})

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll with luxurious deceleration settings
    const lenis = new Lenis({
      duration: 1.2, // Time in seconds for smooth transition slide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Standard native-like speed with momentum deceleration
    })

    let rafId: number

    // Render loop for smooth scroll synchronization
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}
