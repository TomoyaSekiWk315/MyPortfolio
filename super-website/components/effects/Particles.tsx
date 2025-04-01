'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticlesProps {
  mousePosition: {
    x: number
    y: number
  }
}

export default function Particles({ mousePosition }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  
  // パーティクルの位置を生成
  const particles = useMemo(() => {
    const positions = new Float32Array(12000 * 3)
    const velocities = new Float32Array(12000 * 3)
    const colors = new Float32Array(12000 * 3)
    
    for (let i = 0; i < 12000; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
      
      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
      
      colors[i3] = Math.random()
      colors[i3 + 1] = Math.random()
      colors[i3 + 2] = Math.random()
    }
    
    return { positions, velocities, colors }
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return

    // マウス位置に基づいてパーティクルを移動
    const mouseX = (mousePosition.x / window.innerWidth) * 4 - 2
    const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1

    // 回転速度を遅くする
    ref.current.rotation.x -= delta / 20
    ref.current.rotation.y -= delta / 25

    // マウスの影響を強める
    ref.current.position.x += (mouseX - ref.current.position.x) * 0.15
    ref.current.position.y += (mouseY - ref.current.position.y) * 0.15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff6b00"
          size={0.005} // サイズを少し大きく
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending} // 加算合成で光の表現を強化
          opacity={0.8} // 不透明度を上げる
        />
      </Points>
    </group>
  )
} 