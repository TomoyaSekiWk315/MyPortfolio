'use client'

import { Suspense, useEffect, useState } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import WorksSection from '@/components/sections/WorksSection'
import WorksSectionMobile from '@/components/sections/WorksSectionMobile'
import SkillsSection from '@/components/sections/SkillsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    setIsMounted(true)
    return () => {
      window.removeEventListener('resize', checkMobile)
      setIsMounted(false)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <main className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        {/* Hero Section - 最初の画面 */}
        <div className="relative w-full">
          <HeroSection />
        </div>

        {/* Works Section - 2番目の画面 */}
        <section className="relative h-screen w-full">
          {isMobile ? <WorksSectionMobile /> : <WorksSection />}
        </section>

        {/* Skills Section - 3番目の画面 */}
        <section className="relative h-screen w-full">
          <SkillsSection />
        </section>

        {/* Services Section */}
        {isMounted && (
          <section className="relative h-screen w-full">
            <ServicesSection />
          </section>
        )}
        
        {/* Contact Section */}
        <section className="relative h-screen w-full">
          <ContactSection />
        </section>
      </Suspense>
    </main>
  )
}