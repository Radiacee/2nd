'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CalculatorPage() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return

    setIsCalculating(true)
    
    // Fun algorithm to calculate "love percentage"
    setTimeout(() => {
      const combined = (name1.trim() + name2.trim()).toLowerCase()
      let score = 0
      
      // Count love letters
      const loveLetters = ['l', 'o', 'v', 'e']
      loveLetters.forEach(letter => {
        score += (combined.split(letter).length - 1) * 10
      })
      
      // Add some randomness based on name lengths
      score += (name1.length + name2.length) * 2
      
      // Make sure it's within reasonable range
      score = Math.max(65, Math.min(100, score + Math.floor(Math.random() * 20)))
      
      setResult(score)
      setIsCalculating(false)
    }, 2000)
  }

  const getResultMessage = (score: number) => {
    if (score >= 95) return "Perfect match made in heaven! 💕✨"
    if (score >= 85) return "Amazing love connection! 💖🌟"
    if (score >= 75) return "Strong love bond! 💝🦋"
    if (score >= 65) return "Sweet love growing! 🌹💕"
    return "Love is in the air! 💐✨"
  }

  const getResultColor = (score: number) => {
    if (score >= 85) return "text-pink-600"
    if (score >= 75) return "text-purple-600"
    return "text-love-purple"
  }

  const resetCalculator = () => {
    setName1('')
    setName2('')
    setResult(null)
    setIsCalculating(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="love-card max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-love-purple mb-2">Love Calculator 💕</h1>
        <p className="text-gray-600 mb-8">Discover your love compatibility percentage!</p>

        {!result && !isCalculating && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter first name..."
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent text-center text-lg"
                maxLength={20}
              />
            </div>

            <div className="text-4xl text-love-pink">
              💕
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Name
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter second name..."
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent text-center text-lg"
                maxLength={20}
              />
            </div>

            <button
              onClick={calculateLove}
              disabled={!name1.trim() || !name2.trim()}
              className={`heart-button w-full text-xl py-4 ${
                !name1.trim() || !name2.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              Calculate Our Love! 💖
            </button>
          </div>
        )}

        {isCalculating && (
          <div className="py-12">
            <div className="text-6xl mb-6 animate-heart-beat">💕</div>
            <h3 className="text-2xl font-semibold text-love-purple mb-4">
              Calculating your love...
            </h3>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-love-pink"></div>
            </div>
            <p className="text-gray-600 mt-4">The universe is working its magic! ✨</p>
          </div>
        )}

        {result && (
          <div className="py-8">
            <div className="text-8xl mb-6">💖</div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {name1} + {name2}
              </h3>
              <div className={`text-8xl font-bold ${getResultColor(result)} mb-4`}>
                {result}%
              </div>
              <p className="text-xl text-gray-700 font-medium">
                {getResultMessage(result)}
              </p>
            </div>

            {/* Love Meter */}
            <div className="mb-8">
              <div className="w-full bg-pink-100 rounded-full h-6 mb-2">
                <div
                  className="h-6 rounded-full bg-gradient-to-r from-love-pink to-love-purple transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${result}%` }}
                >
                  <span className="text-white text-sm font-semibold">💕</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Love Compatibility Meter</p>
            </div>

            {/* Fun Facts */}
            <div className="bg-pink-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-love-purple mb-2">Fun Love Facts:</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• Your names combined have {(name1 + name2).length} letters of love!</p>
                <p>• Love grows stronger every day you&apos;re together 💕</p>
                <p>• Distance cannot diminish true love ✨</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetCalculator}
                className="heart-button w-full"
              >
                Calculate Again 🔄
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Our Love Calculator Result!',
                      text: `${name1} + ${name2} = ${result}% love compatibility! ${getResultMessage(result)}`,
                    })
                  }
                }}
                className="w-full py-3 px-6 border-2 border-love-pink text-love-pink rounded-full hover:bg-love-pink hover:text-white transition duration-200"
              >
                Share Result 📱
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link href="/">
            <button className="py-2 px-4 text-gray-600 hover:text-love-purple transition duration-200">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
