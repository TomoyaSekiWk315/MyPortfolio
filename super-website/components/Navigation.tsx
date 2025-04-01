'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  
  // スクロール位置を追跡
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Works', href: '#works' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ]
  
  // スクロール位置に応じたナビゲーションの背景色を計算
  const navBackground = scrollPosition > 100 
    ? '' 
    : 'bg-transparent'
  
  const textColor = scrollPosition > 100 ? 'text-text' : 'text-white'
  
  return (
    <>
      <nav className={`fixed w-full transition-all duration-300 ${navBackground}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#hero">
            <h1 className={`text-2xl font-heading font-bold ${textColor}`}>
              Creative<span className="text-primary">Orange</span>
            </h1>
          </Link>
          
          {/* デスクトップメニュー */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`${textColor} hover:text-primary transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* モバイルハンバーガーメニュー */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5 z-50"
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 ${isMenuOpen ? 'bg-white' : textColor}`}
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-0.5 ${isMenuOpen ? 'bg-white' : textColor}`}
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 ${isMenuOpen ? 'bg-white' : textColor}`}
            />
          </button>
        </div>
      </nav>
      
      {/* モバイルフルスクリーンメニュー */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-primary-dark z-40 flex items-center justify-center"
          >
            <ul className="text-center space-y-8">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="text-white text-2xl hover:text-primary-light transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}