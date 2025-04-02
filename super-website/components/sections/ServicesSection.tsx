'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceIcon from '../icons/ServiceIcons'
import { services } from '@/data/services'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

// ソート可能なカードコンポーネント
function SortableCard({ service, index, hoveredIndex, setHoveredIndex }: {
  service: typeof services[0]
  index: number
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: service.id,
    transition: null,
    data: {
      type: 'card',
      index,
    },
    disabled: false,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: isDragging ? 0.9 : 1,
    scale: isDragging ? 1.05 : 1,
    zIndex: isDragging ? 1 : 0,
    boxShadow: isDragging ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none',
    touchAction: 'none',
    cursor: 'grab',
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      aria-disabled={false}
      aria-pressed={undefined}
      aria-roledescription="sortable"
    >
      <div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8
                  border border-white/20 hover:border-primary/20 relative overflow-hidden h-full
                  transform-gpu will-change-transform active:scale-[1.02]"
      >
        {/* 背景のグラデーション */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ 
            background: `radial-gradient(circle at 50% 0%, ${service.color}, transparent 70%)` 
          }}
        />

        <div className="relative z-10 h-full flex flex-col">
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
              size={38}
              className="transform transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
          
          {/* タイトル */}
          <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          
          {/* 説明文 */}
          <p className="text-gray-700 mb-6">
            {service.description}
          </p>
          
          {/* 特徴リスト */}
          <ul className="space-y-3 flex-grow">
            {service.features.map((feature, i) => (
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
  )
}

export default function ServicesSection() {
  const [items, setItems] = useState(services)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

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
      <div className="absolute inset-0 w-full h-[120vh]">
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

      {/* サービスカード */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-h-[calc(100vh-300px)] overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
            accessibility={{
              announcements: {
                onDragStart: () => 'ドラッグを開始しました',
                onDragOver: () => 'ドラッグ中です',
                onDragEnd: () => 'ドラッグを終了しました',
                onDragCancel: () => 'ドラッグをキャンセルしました',
              },
            }}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((service, index) => (
                <SortableCard
                  key={service.id}
                  service={service}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </section>
  )
}