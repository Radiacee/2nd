'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [hearts, setHearts] = useState<number[]>([])
  const [currentMessage, setCurrentMessage] = useState(0)
  
  const loveMessages = [
    "Two months of amazing memories together 💕",
    "Distance means nothing when you mean everything ✨",
    "Every day with you is a celebration 🎉",
    "Our love grows stronger with each passing day 💖"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loveMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const createHeart = () => {
    const newHeart = Date.now()
    setHearts(prev => [...prev, newHeart])
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart !== newHeart))
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Animation */}
      {hearts.map(heart => (
        <div
          key={heart}
          className="absolute text-4xl animate-bounce pointer-events-none"
          style={{
            left: Math.random() * 90 + '%',
            animationDuration: '3s',
            animationFillMode: 'forwards'
          }}
        >
          💖
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-6xl font-bold text-love-purple mb-4 animate-pulse-slow">
          🌸 Our 2nd Monthsary! 🌸
        </h1>

        {/* Rotating Love Messages */}
        <div className="h-20 flex items-center justify-center">
          <p className="text-2xl text-gray-700 font-medium transition-all duration-1000 transform">
            {loveMessages[currentMessage]}
          </p>
        </div>

        {/* Interactive Heart Button */}
        <button
          onClick={createHeart}
          className="heart-button text-xl animate-heart-beat"
        >
          Click for Love! 💕
        </button>

        {/* Game Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          
          {/* Love Quiz */}
          <Link href="/quiz" className="group">
            <div className="love-card hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4 group-hover:animate-bounce">🧠</div>
              <h3 className="text-xl font-bold text-love-purple mb-2">Love Quiz</h3>
              <p className="text-gray-600">Test how well we know each other!</p>
            </div>
          </Link>

          {/* Memory Lane */}
          <Link href="/memories" className="group">
            <div className="love-card hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4 group-hover:animate-bounce">📸</div>
              <h3 className="text-xl font-bold text-love-purple mb-2">Memory Lane</h3>
              <p className="text-gray-600">Our beautiful moments together</p>
            </div>
          </Link>

          {/* Love Messages */}
          <Link href="/messages" className="group">
            <div className="love-card hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4 group-hover:animate-bounce">💌</div>
              <h3 className="text-xl font-bold text-love-purple mb-2">Love Messages</h3>
              <p className="text-gray-600">Send sweet messages to each other</p>
            </div>
          </Link>

          {/* Couple Games */}
          <Link href="/games" className="group">
            <div className="love-card hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4 group-hover:animate-bounce">🎮</div>
              <h3 className="text-xl font-bold text-love-purple mb-2">Fun Games</h3>
              <p className="text-gray-600">Play games together online!</p>
            </div>
          </Link>

          {/* Love Calculator */}
          <Link href="/calculator" className="group">
            <div className="love-card hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4 group-hover:animate-bounce">💕</div>
              <h3 className="text-xl font-bold text-love-purple mb-2">Love Calculator</h3>
              <p className="text-gray-600">Calculate our love compatibility!</p>
            </div>
          </Link>

          {/* Countdown Timer */}
          <Link href="/countdown" className="group">
            <div className="love-card hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4 group-hover:animate-bounce">⏰</div>
              <h3 className="text-xl font-bold text-love-purple mb-2">Love Countdown</h3>
              <p className="text-gray-600">Count down to special moments</p>
            </div>
          </Link>

        </div>

        {/* Bottom Message */}
        <div className="mt-12 p-6 bg-white/60 rounded-full">
          <p className="text-lg text-gray-700 font-medium">
            Distance means nothing when someone means everything 💖
          </p>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-pink-300 text-6xl opacity-50 floating-heart">💕</div>
      <div className="absolute top-32 right-20 text-purple-300 text-4xl opacity-50 floating-heart">✨</div>
      <div className="absolute bottom-20 left-20 text-pink-300 text-5xl opacity-50 floating-heart">💖</div>
      <div className="absolute bottom-32 right-10 text-purple-300 text-3xl opacity-50 floating-heart">🌸</div>
    </div>
  )
}
