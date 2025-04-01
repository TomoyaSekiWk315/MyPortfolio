import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import WorksSection from '@/components/sections/WorksSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        {/* Hero Section - 最初の画面 */}
        <div className="relative w-full">
          <HeroSection />
        </div>

        {/* Works Section - 2番目の画面 */}
        <section className="relative h-screen w-full">
          <WorksSection />
        </section>

        {/* Skills Section - 3番目の画面 */}
        <section className="relative h-screen w-full">
          <SkillsSection />
        </section>

        <section className="relative h-screen w-full">
          <ServicesSection />
        </section>
        
        <section className="relative h-screen w-full">
          <ContactSection />
        </section>
      </Suspense>
    </main>
  )
}