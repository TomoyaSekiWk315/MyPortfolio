'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface MorphingShapesProps {
  scrollProgress: number
}

export default function MorphingShapes({ scrollProgress }: MorphingShapesProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // スクロールに応じて形状を変化させる
    meshRef.current.rotation.x = scrollProgress * Math.PI
    meshRef.current.rotation.y = scrollProgress * Math.PI * 0.5
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <sphereGeometry args={[2, 64, 64]} />
      <MeshDistortMaterial
        color="#ff6b00"
        speed={1.5}
        distort={0.4}
        radius={2}
        transparent
        opacity={0.1}
      />
    </mesh>
  )
} 