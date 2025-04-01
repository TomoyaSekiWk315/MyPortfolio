'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FluidBackground from '@/components/three/FluidBackground'
import Particles from '../effects/Particles'
import MouseLight from '../effects/MouseLight'
import MorphingShapes from '../effects/MorphingShapes'

// GSAPプラグインの登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  
  // スクロールに応じたアニメーション値
  const opacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0.2, 0.7], [0.8, 0.6])
  const y = useTransform(scrollYProgress, [0.2, 0.7], [0, -100])
  
  useEffect(() => {
    // マウス移動の追跡
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  useEffect(() => {
    // スクロールアニメーション
    if (!sectionRef.current || !titleRef.current) return
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=50%',
        scrub: 0.5
      }
    })
    
    tl.to(titleRef.current, {
      y: -100,
      scale: 0.8,
      opacity: 0
    })
    
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
  
  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 背景エフェクト */}
      <div className="absolute inset-0 w-full h-full bg-background">
        <Canvas 
          camera={{ position: [0, 0, 1.5], fov: 30 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ 
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true
          }}
        >
          <color attach="background" args={['#121212']} />
          <FluidBackground />
          <Particles mousePosition={mousePosition} />
          <MorphingShapes scrollProgress={scrollYProgress.get()} />
        </Canvas>
      </div>
      
      {/* マウスライトエフェクト */}
      <div className="absolute inset-0 w-full h-full">
        <MouseLight position={mousePosition} />
      </div>
      
      {/* オーバーレイ */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
      
      {/* メインタイトル */}
      <motion.div 
        ref={titleRef}
        style={{ opacity, scale, y }}
        initial={{ opacity: 0, y: 20, x: 0 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: 0,
          transition: { duration: 1, delay: 0.5 }
        }}
        whileInView={{
          x: typeof window !== 'undefined' ? -window.innerWidth * 0.35 : 0,
          y: 0,
          scale: 0.8,
          transition: {
            delay: 2,
            duration: 1.2,
            ease: "easeInOut"
          }
        }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-heading font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Tomoya
          </motion.span>
          <motion.span
            className="text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Portfolio
          </motion.span>
        </motion.h1>
        <motion.p 
          className="text-white text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Interactive Design & Development
        </motion.p>
      </motion.div>

      {/* セクションリンク */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 3.5,
            duration: 0.8,
            ease: "easeOut"
          }
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-8"
      >
        <motion.a
          href="#works"
          className="text-white text-3xl md:text-4xl font-medium hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Works
        </motion.a>
        <motion.a
          href="#skills"
          className="text-white text-3xl md:text-4xl font-medium hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Skills & Expertise
        </motion.a>
        <motion.a
          href="#services"
          className="text-white text-3xl md:text-4xl font-medium hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Services
        </motion.a>
        <motion.a
          href="#contact"
          className="text-white text-3xl md:text-4xl font-medium hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.a>
      </motion.div>
      
      {/* スクロールインジケーター */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center mb-2">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </div>
        <p className="text-white text-sm">SCROLL DOWN</p>
      </motion.div>
    </section>
  )
}