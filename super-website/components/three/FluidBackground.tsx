'use client'
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// フラグメントシェーダー（流体シミュレーション）
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  
  vec3 orange = vec3(1.0, 0.478, 0.0);
  vec3 blue = vec3(0.102, 0.212, 0.365);
  
  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    // マウス位置との距離を計算
    float dist = distance(uv, uMouse);
    
    // 時間を基にした波パターン
    float wave = sin(uv.x * 10.0 + uTime * 0.5) * 0.5 + 0.5;
    wave += sin(uv.y * 8.0 - uTime * 0.3) * 0.5 + 0.5;
    wave /= 2.0;
    
    // マウス位置の影響
    wave += (1.0 - dist) * 0.3 * sin(dist * 10.0 - uTime);
    
    // オレンジと青のグラデーション
    vec3 color = mix(orange, blue, wave);
    
    // ビネット効果
    float vignette = 1.0 - dist * 1.2;
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export default function FluidBackground() {
  const mesh = useRef<THREE.Mesh>(null)
  const mousePosition = useRef(new THREE.Vector2(0.5, 0.5))
  const { size } = useThree()
  
  // シェーダーのuniforms
  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) }
  })
  
  // マウスイベントリスナー
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX / window.innerWidth
      mousePosition.current.y = 1 - e.clientY / window.innerHeight // Y座標を反転
    }
    
    // タッチイベント用ハンドラ
    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosition.current.x = e.touches[0].clientX / window.innerWidth
        mousePosition.current.y = 1 - e.touches[0].clientY / window.innerHeight
      }
    }
    
    // リサイズハンドラー
    const handleResize = () => {
      uniforms.current.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('touchmove', updateTouchPosition)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('touchmove', updateTouchPosition)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // アニメーションの更新
  useFrame(({ clock }) => {
    if (!mesh.current) return
    
    uniforms.current.uTime.value = clock.getElapsedTime()
    uniforms.current.uMouse.value.copy(mousePosition.current)
  })
  
  return (
    <mesh ref={mesh} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}