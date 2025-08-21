'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CountdownPage() {
  const [selectedDate, setSelectedDate] = useState('')
  const [eventName, setEventName] = useState('')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isActive, setIsActive] = useState(false)
  const [isCountingUp, setIsCountingUp] = useState(false)

  // Pre-set important dates
  const presetDates = [
    { name: "Our 3rd Monthsary", date: "2025-09-21" },
    { name: "Our 6 Month Anniversary", date: "2025-12-21" },
    { name: "Valentine's Day", date: "2026-02-14" },
    { name: "New Year Together", date: "2026-01-01" }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && selectedDate) {
      interval = setInterval(() => {
        const now = new Date().getTime()
        const targetDate = new Date(selectedDate).getTime()
        const difference = targetDate - now

        if (difference > 0) {
          setIsCountingUp(false)
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          })
        } else {
          // Count up from the date (how long ago it was)
          setIsCountingUp(true)
          const elapsed = Math.abs(difference)
          setTimeLeft({
            days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
            hours: Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((elapsed % (1000 * 60)) / 1000)
          })
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, selectedDate])

  const handlePresetSelect = (preset: { name: string, date: string }) => {
    setEventName(preset.name)
    setSelectedDate(preset.date)
    setIsActive(true)
  }

  const handleCustomStart = () => {
    if (selectedDate && eventName) {
      setIsActive(true)
    }
  }

  const handleReset = () => {
    setIsActive(false)
    setSelectedDate('')
    setEventName('')
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    setIsCountingUp(false)
  }

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="love-card max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-love-purple mb-2">Love Countdown ⏰</h1>
        <p className="text-gray-600 mb-8">Count down to your special moments together</p>

        {!isActive && (
          <div className="space-y-8">
            {/* Preset Dates */}
            <div>
              <h3 className="text-xl font-semibold text-love-purple mb-4">Quick Select</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {presetDates.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetSelect(preset)}
                    className="love-card hover:scale-105 transition-transform duration-300 text-left"
                  >
                    <div className="text-2xl mb-2">💕</div>
                    <h4 className="font-semibold text-love-purple">{preset.name}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(preset.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date */}
            <div>
              <h3 className="text-xl font-semibold text-love-purple mb-4">Or Create Custom Countdown</h3>
              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g., Our Next Date, Trip Together..."
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleCustomStart}
                  disabled={!selectedDate || !eventName}
                  className={`heart-button w-full ${
                    !selectedDate || !eventName
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  Start Countdown! 🚀
                </button>
              </div>
            </div>
          </div>
        )}

        {isActive && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-love-purple mb-2">{eventName}</h2>
              <p className="text-gray-600">
                {isCountingUp ? 'Time since:' : 'Time until:'} {' '}
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Countdown Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-love-pink to-love-purple text-white rounded-2xl p-6">
                <div className="text-4xl font-bold">{formatNumber(timeLeft.days)}</div>
                <div className="text-sm uppercase tracking-wide">Days</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl p-6">
                <div className="text-4xl font-bold">{formatNumber(timeLeft.hours)}</div>
                <div className="text-sm uppercase tracking-wide">Hours</div>
              </div>
              <div className="bg-gradient-to-br from-pink-400 to-red-400 text-white rounded-2xl p-6">
                <div className="text-4xl font-bold">{formatNumber(timeLeft.minutes)}</div>
                <div className="text-sm uppercase tracking-wide">Minutes</div>
              </div>
              <div className="bg-gradient-to-br from-red-400 to-pink-500 text-white rounded-2xl p-6">
                <div className="text-4xl font-bold animate-pulse">{formatNumber(timeLeft.seconds)}</div>
                <div className="text-sm uppercase tracking-wide">Seconds</div>
              </div>
            </div>

            {/* Encouraging Messages */}
            <div className="bg-pink-50 rounded-lg p-6">
              {isCountingUp ? (
                <div>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-love-purple mb-2">
                    This special day has passed!
                  </h3>
                  <p className="text-gray-700">
                    It&apos;s been {timeLeft.days} days since this beautiful moment. 
                    Time keeps moving, but our love keeps growing! 💕
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-xl font-semibold text-love-purple mb-2">
                    Almost there!
                  </h3>
                  <p className="text-gray-700">
                    {timeLeft.days === 0 
                      ? "Today is the day! 🎉" 
                      : `Just ${timeLeft.days} more ${timeLeft.days === 1 ? 'day' : 'days'} until our special moment! 💖`
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="heart-button w-full"
              >
                Create New Countdown 🔄
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Countdown: ${eventName}`,
                      text: `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes until ${eventName}! 💕`,
                    })
                  }
                }}
                className="w-full py-3 px-6 border-2 border-love-pink text-love-pink rounded-full hover:bg-love-pink hover:text-white transition duration-200"
              >
                Share Countdown 📱
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
