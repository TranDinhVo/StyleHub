'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  
  const cursorX = useSpring(0, { damping: 20, stiffness: 100 })
  const cursorY = useSpring(0, { damping: 20, stiffness: 100 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      
      const target = e.target as HTMLElement
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer')
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black pointer-events-none z-[9999] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'rgba(0,0,0,0.05)' : 'transparent'
      }}
      transition={{ scale: { type: 'spring', damping: 15 } }}
    />
  )
}
