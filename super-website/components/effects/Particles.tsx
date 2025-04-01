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
  const positions = useMemo(() => {
    const positions = new Float32Array(12000 * 3) // パーティクル数を増やす
    const center = new THREE.Vector3(0, 0, 0)
    
    for (let i = 0; i < 12000; i++) {
      let radius, theta, phi
      
      // 70%のパーティクルは球面上に、30%は中心付近に配置
      if (Math.random() > 0.3) {
        // 外側のパーティクル
        radius = 2.5 + Math.random() * 0.5 // 半径にばらつきを持たせる
        theta = Math.random() * Math.PI * 2
        phi = Math.acos(2 * Math.random() - 1)
      } else {
        // 中心付近のパーティクル
        radius = Math.random() * 1.5 // 中心から1.5以内
        theta = Math.random() * Math.PI * 2
        phi = Math.acos(2 * Math.random() - 1)
      }
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
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
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
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