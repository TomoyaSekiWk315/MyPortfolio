'use client'
import { useState, useRef, useEffect } from 'react'
import { projects } from '@/data/projects'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function WorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nextSectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLastProject, setIsLastProject] = useState(false)
  const isScrollingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  
  // GSAPアニメーションの設定
  useEffect(() => {
    const section = sectionRef.current
    const nextSection = nextSectionRef.current

    if (!section || !nextSection) return

    // 次のセクションを最初は100%下に配置
    gsap.set(nextSection, { yPercent: 100 })

    // セクションを固定
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      endTrigger: nextSection,
      end: "top top",
      pin: true,
      pinSpacing: false,
      onUpdate: (self) => {
        // スクロール位置に応じて次のセクションをスライドイン
        const progress = self.progress
        gsap.to(nextSection, {
          yPercent: (1 - progress) * 100,
          ease: "none"
        })
      }
    })

    return () => {
      if (pinTrigger) pinTrigger.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // スクロール検知
  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return
    
    // スクロール状態を監視して現在のインデックスを更新
    const updateCurrentIndex = () => {
      const scrollPosition = container.scrollLeft
      const containerWidth = container.clientWidth
      const scrollWidth = container.scrollWidth
      const newIndex = Math.round(scrollPosition / containerWidth)
      
      // 最後のプロジェクトまでスクロールしたかチェック
      const isAtEnd = Math.abs(scrollPosition + containerWidth - scrollWidth) < 10
      setIsLastProject(isAtEnd)
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }
    
    // スクロールハンドラー
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(updateCurrentIndex)
    }
    
    // ホイールスクロールを水平/垂直スクロールに変換
    const handleWheel = (e: WheelEvent) => {
      // 現在のスクロール位置を取得
      const currentScroll = container.scrollLeft
      const containerWidth = container.clientWidth
      
      // 最後のプロジェクトで下スクロールの場合、縦スクロールを許可
      if (isLastProject && e.deltaY > 0) {
        window.scrollBy({
          top: e.deltaY * 2,
          behavior: 'smooth'
        })
        return
      }

      // 最初のプロジェクトで上方向へのスクロールを許可
      if (currentScroll <= 0 && e.deltaY < 0) {
        return
      }

      // それ以外の場合は水平スクロールを制御
      e.preventDefault()
      e.stopPropagation()
      
      // 現在のスクロール位置から最も近いプロジェクトを計算
      const currentProjectIndex = Math.round(currentScroll / containerWidth)
      
      // スクロール方向に応じて次の/前のプロジェクトに移動
      if (e.deltaY > 0) {
        // 下スクロールで次へ
        if (currentProjectIndex < projects.length - 1) {
          scrollToProject(currentProjectIndex + 1)
        }
      } else if (e.deltaY < 0) {
        // 上スクロールで前へ
        if (currentProjectIndex > 0) {
          scrollToProject(currentProjectIndex - 1)
        }
      }
    }
    
    // タッチスワイプ対応
    let touchStartX = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return
      
      const touchEndX = e.changedTouches[0].clientX
      const deltaX = touchStartX - touchEndX
      
      if (Math.abs(deltaX) > 50) {
        // 50px以上のスワイプでのみ反応
        isScrollingRef.current = true
        
        if (deltaX > 0 && currentIndex < projects.length - 1) {
          // 左スワイプで次へ
          scrollToProject(currentIndex + 1)
        } else if (deltaX < 0 && currentIndex > 0) {
          // 右スワイプで前へ
          scrollToProject(currentIndex - 1)
        }
        
        setTimeout(() => {
          isScrollingRef.current = false
        }, 300)
      }
    }
    
    // スクロールイベントリスナーの登録
    container.addEventListener('scroll', handleScroll, { passive: true })
    
    // ホイールイベントをセクション全体でキャプチャ
    section.addEventListener('wheel', handleWheel, { passive: false })
    section.addEventListener('touchstart', handleTouchStart, { passive: true })
    section.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      section.removeEventListener('wheel', handleWheel)
      section.removeEventListener('touchstart', handleTouchStart)
      section.removeEventListener('touchend', handleTouchEnd)
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [currentIndex, isLastProject])
  
  // 次/前のプロジェクトに移動
  const scrollToProject = (index: number) => {
    const targetIndex = Math.max(0, Math.min(projects.length - 1, index))
    
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: targetIndex * containerRef.current.clientWidth,
        behavior: 'smooth'
      })
    }
  }
  
  return (
    <section
      id="works-section"
      ref={sectionRef}
      className="relative h-[80vh] w-full"
    >
      {/* タイトル */}
      <div className="absolute top-10 left-10 z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text">
          <span className="text-primary">Works</span>
        </h2>
      </div>
      
      {/* 現在のプロジェクト名 */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
        <p className="text-xl font-medium text-text">
          {projects[currentIndex]?.title}
        </p>
      </div>
      
      {/* スクロールコンテナ */}
      <div 
        ref={containerRef}
        className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory pointer-events-auto scroll-smooth z-20"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
          width: '100%',
          height: '75%',
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          userSelect: 'none'
        }}
      >
        {projects.map((project) => (
          <div 
            key={project.id}
            className="relative w-full h-full flex-shrink-0 snap-center flex"
            style={{
              minWidth: '100%',
              width: '100%'
            }}
          >
            {/* 左側の画像 */}
            <div className="w-1/3 h-full relative">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* 右側のコンテンツ */}
            <div className="w-2/3 h-full flex flex-col justify-center p-8 relative overflow-hidden">
              {/* 背景動画 */}
              <video
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* コンテンツ */}
              <div className="relative z-10 bg-black/50 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
                <p className="text-lg mb-6 whitespace-pre-line text-white">{project.description}</p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 mb-6 inline-block"
                  >
                    → プロジェクトを見る
                  </a>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white/30 rounded-full text-sm text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* ナビゲーションドット */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToProject(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-primary' : 'bg-primary/50'
            }`}
            aria-label={`Project ${index + 1}`}
          />
        ))}
      </div>
      
      {/* 前へ/次へボタン */}
      <div className="absolute bottom-1/2 w-full flex justify-between px-4 z-40">
        <button
          onClick={() => scrollToProject(Math.max(0, currentIndex - 1))}
          className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-opacity duration-300 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white'
          }`}
          disabled={currentIndex === 0}
        >
          ←
        </button>
        <button
          onClick={() => scrollToProject(currentIndex + 1)}
          className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-opacity duration-300 ${
            currentIndex === projects.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white'
          }`}
          disabled={currentIndex === projects.length - 1}
        >
          →
        </button>
      </div>
      
      {/* スワイプ/スクロール指示 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center text-text opacity-60">
        <p className="text-sm mb-1">スクロールで移動</p>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* 次のセクションの参照用要素 */}
      <div ref={nextSectionRef} className="absolute top-full left-0 w-full h-screen pointer-events-none" />

      {/* プロジェクトカード */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* メディアコンテナ */}
        <div className="w-full lg:w-6/10 relative aspect-square lg:aspect-auto lg:h-[500px]">
          <motion.div
            className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.5 }
            }}
          >
            <video
              src={projects[currentIndex].videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        {/* コンテンツ */}
        <div className="w-full lg:w-4/10 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-4">{projects[currentIndex].title}</h3>
            <p className="text-lg mb-6 whitespace-pre-line">{projects[currentIndex].description}</p>
            {projects[currentIndex].url && (
              <a
                href={projects[currentIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 mb-6 inline-block"
              >
                → プロジェクトを見る
              </a>
            )}
            <div className="flex flex-wrap gap-2">
              {projects[currentIndex].technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-white/30 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}