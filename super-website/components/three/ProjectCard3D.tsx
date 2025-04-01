'use client'
import { useRef, useState, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
  active: boolean
  onClick: () => void
}

function ProjectCardContent({ project, index, active, onClick }: ProjectCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [textureError, setTextureError] = useState(false)
  
  // テクスチャの読み込み
  const texture = useLoader(THREE.TextureLoader, project.imageUrl, undefined, (error) => {
    console.error('Error loading texture:', error)
    setTextureError(true)
  })
  
  // アニメーションフレームごとの更新
  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return
    
    // ホバー時の拡大
    const targetScale = hovered ? 1.05 : 1
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.1)
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1)
    
    // アイドル状態での緩やかな動き
    if (!hovered && !active) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.05
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1)
    }
    
    // Z位置の調整
    const targetZ = hovered ? 0.5 : 0
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1)
  })
  
  const xPosition = (index - (projects.length - 1) / 2) * 2.5
  
  return (
    <group 
      ref={groupRef}
      position={[xPosition, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* カード本体 */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial 
          map={!textureError ? texture : null}
          color={active ? project.color : "#ffffff"} 
          roughness={1}
          metalness={0.0}
          emissive={active ? project.color : "#ffffff"}
          emissiveIntensity={0.01}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

// メインのProjectCard3Dコンポーネント
export default function ProjectCard3D(props: ProjectCardProps) {
  return (
    <Suspense fallback={null}>
      <ProjectCardContent {...props} />
    </Suspense>
  )
}

// ダミーデータ - このコンポーネント内で使用
const projects = [
  {
    id: 1,
    title: "DogLife+",
    category: "モバイルアプリ",
    color: "#FF7A00",
    imageUrl: "/images/project1.png"
  },
  {
    id: 2,
    title: "上司AI",
    category: "Webアプリ",
    color: "#3D6CB3",
    imageUrl: "/images/project2.png"
  },
  {
    id: 3,
    title: "えがく日記",
    category: "モバイルアプリ",
    color: "#FFB74D",
    imageUrl: "/images/project3.png"
  },
  {
    id: 4,
    title: "WISEMAP",
    category: "Webアプリ",
    color: "#FF4081",
    imageUrl: "/images/project4.png"
  },
  {
    id: 5,
    title: "DogLife+",
    category: "モバイルアプリ",
    color: "#FF7A00",
    imageUrl: "/images/project1.png"
  },
  {
    id: 6,
    title: "上司AI",
    category: "Webアプリ",
    color: "#3D6CB3",
    imageUrl: "/images/project2.png"
  },
  {
    id: 7,
    title: "えがく日記",
    category: "モバイルアプリ",
    color: "#FFB74D",
    imageUrl: "/images/project3.png"
  },
  {
    id: 8,
    title: "WISEMAP",
    category: "Webアプリ",
    color: "#FF4081",
    imageUrl: "/images/project4.png"
  }
];