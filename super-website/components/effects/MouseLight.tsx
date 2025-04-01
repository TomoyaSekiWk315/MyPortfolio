'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface MouseLightProps {
  position: {
    x: number
    y: number
  }
}

export default function MouseLight({ position }: MouseLightProps) {
  const lightRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* ベースレイヤー */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden bg-black/5"
      />
      
      {/* メインの光エフェクト */}
      <motion.div
        ref={lightRef}
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        style={{
          background: `
            radial-gradient(
              800px circle at ${position.x}px ${position.y}px,
              transparent 0%,
              rgba(0, 0, 0, 0.2) 100%
            )
          `,
          mixBlendMode: 'normal'
        }}
      />
      
      {/* オレンジの光エフェクト */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
        style={{
          background: `
            radial-gradient(
              400px circle at ${position.x}px ${position.y}px,
              rgba(255, 107, 0, 0.1) 0%,
              rgba(255, 107, 0, 0.05) 30%,
              rgba(255, 107, 0, 0.02) 50%,
              transparent 70%
            )
          `,
          mixBlendMode: 'screen'
        }}
      />
    </>
  )
} 