'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MorphingShapesProps {
  scrollProgress: number
}

export default function MorphingShapes({ scrollProgress }: MorphingShapesProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (!groupRef.current) return
    
    // スクロールに応じた形状の変化
    const rotationSpeed = 0.5 + scrollProgress * 0.5
    groupRef.current.rotation.x += 0.01 * rotationSpeed
    groupRef.current.rotation.y += 0.01 * rotationSpeed
  })
  
  return (
    <group ref={groupRef}>
      {/* 形状の実装 */}
    </group>
  )
} 