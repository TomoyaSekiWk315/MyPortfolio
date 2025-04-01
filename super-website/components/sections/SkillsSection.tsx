'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { skills, skillCategories, Skill } from '@/data/skills'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// パーティクルを別のクライアントコンポーネントに分離
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    width: number;
    height: number;
    color: string;
    left: string;
    top: string;
    animationDuration: number;
    animationDelay: number;
  }>>([]);

  useEffect(() => {
    // クライアントサイドでのみパーティクルを生成
    const newParticles = Array.from({ length: 20 }).map((_, i) => {
      const categoryIndex = i % skillCategories.length;
      return {
        id: i,
        width: Math.random() * 40 + 10,
        height: Math.random() * 40 + 10,
        color: skillCategories[categoryIndex].color,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: Math.random() * 10 + 20,
        animationDelay: Math.random() * 5
      };
    });
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            backgroundColor: particle.color,
            left: particle.left,
            top: particle.top,
            animation: `float ${particle.animationDuration}s linear infinite`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(100px, 100px) rotate(90deg);
          }
          50% {
            transform: translate(200px, 50px) rotate(180deg);
          }
          75% {
            transform: translate(100px, -50px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const nextSectionRef = useRef<HTMLDivElement>(null)
  
  // スクロール位置に基づくアニメーション
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // スクロールに基づく変換（初期値を調整）
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 1])
  
  // 浮遊アニメーション
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
  
  // カテゴリフィルターハンドラー
  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId)
    setSelectedSkill(null)
  }
  
  // フィルター後のスキル
  const filteredSkills = selectedCategory
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills
  
  // スキルのカテゴリに対応する色を取得
  const getSkillColor = (categoryId: string) => {
    const category = skillCategories.find(cat => cat.id === categoryId)
    return category ? category.color : '#FFFFFF'
  }
  
  useEffect(() => {
    const section = sectionRef.current
    const nextSection = nextSectionRef.current

    if (!section || !nextSection) return

    // 次のセクションを最初は100%下に配置
    gsap.set(nextSection, { yPercent: 100 })

    // スクロールに応じて次のセクションをスライドイン
    gsap.to(nextSection, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end: "+=100%",
        scrub: true,
      }
    })

    // セクションを固定
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      endTrigger: nextSection,
      end: "top top",
      pin: true,
      pinSpacing: false,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full bg-background"
    >
      {/* パーティクルを背面に */}
      <div className="absolute inset-0 z-0">
        <FloatingParticles />
      </div>
      
      {/* メインコンテンツを前面に */}
      <motion.div 
        className="container mx-auto px-4 relative z-50"
        style={{ y, scale, opacity }}
        animate={floatAnimation}
        initial={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row gap-10">
          {/* 左側のテキストエリア */}
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 mt-20"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                <span className="text-primary">Skills</span> & <span className="text-text">Expertise</span>
              </h2>
              
              <p className="text-gray-700 mb-8">
                様々な技術を駆使してクリエイティブなWeb体験を構築します。
                特にフロントエンド技術と3Dビジュアライゼーションに強みを持っています。
              </p>
              
              {/* カテゴリフィルター */}
              <h3 className="text-lg font-semibold mb-2 text-text">カテゴリでフィルター</h3>
              <div className="flex flex-wrap gap-2">
                {skillCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id 
                        ? 'text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    style={{ 
                      backgroundColor: selectedCategory === category.id ? category.color : undefined,
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* スキルグリッド */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-20">
              <AnimatePresence>
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 1, scale: 1, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="cursor-pointer"
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div
                      className="bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg h-full transform-gpu transition-all duration-300 hover:shadow-2xl"
                      style={{ 
                        borderLeft: `4px solid ${getSkillColor(skill.category)}`,
                        background: selectedSkill?.id === skill.id 
                          ? `linear-gradient(135deg, ${getSkillColor(skill.category)}20, ${getSkillColor(skill.category)}10)`
                          : undefined
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-text">{skill.name}</h3>
                      <p className="text-sm text-primary mb-3">
                        {skillCategories.find(cat => cat.id === skill.category)?.name}
                      </p>
                      
                      {/* スキルレベルバー */}
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: `${skill.level * 100}%` }}
                          animate={{ width: `${skill.level * 100}%` }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: getSkillColor(skill.category) }}
                        />
                      </div>
                      
                      {selectedSkill?.id === skill.id && (
                        <motion.div
                          initial={{ opacity: 1, height: 'auto' }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 text-sm text-gray-600 overflow-hidden"
                        >
                          {skill.description}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 次のセクションの参照用要素 */}
      <div ref={nextSectionRef} className="absolute top-full left-0 w-full h-screen" />
    </section>
  )
}