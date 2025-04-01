'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { Skill, skillCategories } from '@/data/skills'

interface SkillsGraphProps {
  skills: Skill[]
  selectedCategory: string | null
  onSelectSkill: (skill: Skill) => void
}

export default function SkillsGraph({ 
  skills, 
  selectedCategory, 
  onSelectSkill 
}: SkillsGraphProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // 回転アニメーション
  useFrame((state) => {
    if (!groupRef.current) return
    
    // 緩やかな自動回転
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })
  
  // スキルのカテゴリに対応する色を取得
  const getSkillColor = (categoryId: string) => {
    const category = skillCategories.find(cat => cat.id === categoryId)
    return category ? category.color : '#FFFFFF'
  }
  
  return (
    <group ref={groupRef}>
      {/* スキルノード */}
      {skills.map((skill, i) => {
        // フィボナッチ球面分布を使用して均等に分布
        const phi = Math.acos(-1 + (2 * i) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        
        // カテゴリに応じて半径を調整
        let radius = 2.5
        if (selectedCategory && skill.category === selectedCategory) {
          radius = 2 // 選択されたカテゴリは内側に
        } else if (selectedCategory) {
          radius = 3 // 選択されていないカテゴリは外側に
        }
        
        const x = radius * Math.cos(theta) * Math.sin(phi)
        const y = radius * Math.sin(theta) * Math.sin(phi)
        const z = radius * Math.cos(phi)
        
        const isActive = selectedCategory === null || skill.category === selectedCategory
        const scale = isActive ? skill.level * 0.5 + 0.5 : 0.3 // スキルレベルに応じたサイズ、非アクティブなら小さく
        const opacity = isActive ? 1 : 0.3 // 非アクティブなら半透明
        
        return (
          <group key={skill.id} position={[x, y, z]} scale={[scale, scale, scale]}>
            {/* スキルノード（球体） */}
            <Sphere args={[0.3, 16, 16]} onClick={() => onSelectSkill(skill)}>
              <meshStandardMaterial 
                color={getSkillColor(skill.category)} 
                transparent
                opacity={opacity}
                emissive={getSkillColor(skill.category)}
                emissiveIntensity={0.2}
              />
            </Sphere>
            
            {/* スキル名ラベル - HTMLを使用して問題を回避 */}
            <Html
              position={[0, 0.5, 0]}
              center
              distanceFactor={10}
            >
              <div 
                className="text-white text-xs font-bold bg-black bg-opacity-50 px-2 py-1 rounded whitespace-nowrap"
                style={{ opacity: opacity }}
              >
                {skill.name}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}