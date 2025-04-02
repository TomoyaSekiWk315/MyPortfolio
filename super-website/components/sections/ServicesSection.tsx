'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
import { services } from '@/data/services'
import ServiceIcon from '../icons/ServiceIcons'

// ソート可能なカードコンポーネント
function SortableCard({ service, index, hoveredIndex, onHover }: {
  service: typeof services[0]
  index: number
  hoveredIndex: number | null
  onHover: (index: number | null) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    boxShadow: isDragging ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none',
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      {...attributes}
      {...listeners}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-white/20 hover:border-primary/20 relative overflow-hidden h-full">
        <div className="relative z-10 h-full flex flex-col">
          <div className="p-6 inline-block rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{ backgroundColor: `${service.color}10`, border: `2px solid ${service.color}20` }}>
            <ServiceIcon name={service.icon} color={service.color} size={38} className="transform transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-700 mb-6">
            {service.description}
          </p>
          <ul className="space-y-3 flex-grow">
            {service.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start text-sm text-gray-800"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0.7,
                  x: hoveredIndex === index ? 0 : -5,
                }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-sm transform transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: service.color }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  const [isMounted, setIsMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
      setItems(services)
      setHoveredIndex(null)
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative bg-background h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden"
    >
      {/* 背景映像 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/SERVICE.MP4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      </div>
      
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            <span className="text-primary">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pb-8">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((service, index) => (
                <SortableCard
                  key={service.id}
                  service={service}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  onHover={setHoveredIndex}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </motion.div>
    </section>
  )
}