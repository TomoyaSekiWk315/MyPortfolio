'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import FluidBackground from '@/components/three/FluidBackground'
import Particles from '../effects/Particles'
import MouseLight from '../effects/MouseLight'
import MorphingShapes from '../effects/MorphingShapes'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  // スクロールに応じたアニメーション値
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? -100 : 0])
  const x = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? 0 : -300])
  
  useEffect(() => {
    // デバイスの判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

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
  
  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
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
        style={{ 
          opacity, 
          scale, 
          y, 
          x,
          position: 'fixed',
          top: isMobile ? '30%' : '50%',
          left: isMobile ? '0%' : '10%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '100%' : 'auto',
          padding: isMobile ? '0 2rem' : '0',
          boxSizing: 'border-box'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 1, delay: 0.5 }
        }}
        className="text-center z-10 max-w-4xl mx-auto"
      >
        <motion.h1 
          className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'} font-heading font-bold text-white mb-4`}
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
          className={`${isMobile ? 'text-sm sm:text-base' : 'text-lg sm:text-xl md:text-2xl'} text-white`}
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
        className={`absolute ${isMobile ? 'bottom-20' : 'top-1/2'} left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-3 sm:gap-4 md:gap-6`}
      >
        <motion.a
          href="#works-section"
          className={`${isMobile ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl md:text-4xl'} text-white font-medium hover:text-primary transition-colors`}
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Works
        </motion.a>
        <motion.a
          href="#skills-section"
          className={`${isMobile ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl md:text-4xl'} text-white font-medium hover:text-primary transition-colors`}
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Skills & Expertise
        </motion.a>
        <motion.a
          href="#services"
          className={`${isMobile ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl md:text-4xl'} text-white font-medium hover:text-primary transition-colors`}
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Services
        </motion.a>
        <motion.a
          href="#contact"
          className={`${isMobile ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl md:text-4xl'} text-white font-medium hover:text-primary transition-colors`}
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
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center mb-2">
          <motion.div 
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </div>
        <p className="text-white text-xs sm:text-sm">SCROLL DOWN</p>
      </motion.div>
    </section>
  )
}