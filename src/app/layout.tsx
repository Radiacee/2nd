import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Our 2nd Monthsary Celebration 💕',
  description: 'A special interactive website to celebrate our love, even from far away',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-love-light via-pink-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
}
