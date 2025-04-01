'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceIcon from '@/components/icons/ServiceIcons'
import { services } from '@/data/services'

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(error => {
        console.error('動画の再生に失敗しました:', error)
      })
    }
  }, [])

  return (
    <section 
      id="services" 
      className="relative bg-background min-h-screen py-20 px-6 md:px-10 overflow-hidden"
    >
      {/* 動画背景 */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/video/service-poster.jpg"
        >
          <source src="/videos/service.mp4" type="video/mp4" />
          お使いのブラウザは動画の再生に対応していません。
        </video>
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* セクションヘッダー */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
          <span className="text-primary">Services</span>
        </h2>
        <p className="mt-4 text-xl text-gray-200 max-w-2xl">
          最新のテクノロジーと創造的なアプローチで、あなたのビジョンを実現します。
        </p>
      </div>
      
      {/* サービスグリッド */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div 
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full
                          border border-white/20 hover:border-primary/20 relative overflow-hidden"
              >
                {/* 背景のグラデーション */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${service.color}, transparent 70%)` 
                  }}
                />

                <div className="relative z-10">
                  {/* アイコン */}
                  <div 
                    className="p-6 inline-block rounded-2xl mb-6 transition-all duration-300
                              group-hover:scale-110 group-hover:shadow-lg"
                    style={{ 
                      backgroundColor: `${service.color}10`,
                      border: `2px solid ${service.color}20`
                    }}
                  >
                    <ServiceIcon 
                      name={service.icon} 
                      color={service.color} 
                      size={48}
                      className="transform transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>
                  
                  {/* タイトル */}
                  <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* 説明文 */}
                  <p className="text-gray-700 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* 特徴リスト */}
                  <ul className="space-y-3">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start text-sm text-gray-800"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: hoveredIndex === index ? 1 : 0.7,
                          x: hoveredIndex === index ? 0 : -5
                        }}
                        transition={{ 
                          duration: 0.3,
                          delay: i * 0.1
                        }}
                      >
                        <span 
                          className="w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5
                                    shadow-sm transform transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: service.color }}
                        >
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}