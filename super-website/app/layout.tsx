import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'CreativeOrange - Interactive Portfolio',
  description: 'A showcase of creative web design and development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}