'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Memory {
  id: number
  title: string
  description: string
  date: string
  emoji: string
  color: string
}

// Sample memories to start with - moved outside component to avoid dependency issues
const sampleMemories: Memory[] = [
  {
    id: 1,
    title: "Our First Video Call",
    description: "The moment I first saw your beautiful smile through the screen. My heart skipped a beat and I knew you were special.",
    date: "2025-06-21",
    emoji: "📞",
    color: "from-pink-400 to-purple-400"
  },
  {
    id: 2,
    title: "First 'I Love You'",
    description: "When we first said those three magical words. The world felt complete and full of possibilities.",
    date: "2025-07-05",
    emoji: "💕",
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 3,
    title: "Our 1st Month Together",
    description: "Celebrating our first milestone together. 30 days of happiness, laughter, and growing love.",
    date: "2025-07-21",
    emoji: "🎉",
    color: "from-red-400 to-pink-400"
  },
  {
    id: 4,
    title: "Today - Our 2nd Month!",
    description: "Two amazing months of being together. Every day has been a gift, and I can't wait for many more months ahead.",
    date: "2025-08-21",
    emoji: "🌟",
    color: "from-pink-400 to-red-400"
  }
]

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMemory, setNewMemory] = useState({
    title: '',
    description: '',
    date: '',
    emoji: '💕',
    color: 'from-pink-400 to-purple-400'
  })

  const emojiOptions = ['💕', '💖', '💝', '💗', '🌹', '✨', '🌸', '💐', '🦋', '🌟', '💫', '🎀', '🌈', '⭐', '🎉', '🥰']
  const colorOptions = [
    'from-pink-400 to-purple-400',
    'from-purple-400 to-pink-400',
    'from-red-400 to-pink-400',
    'from-pink-400 to-red-400',
    'from-rose-400 to-pink-400',
    'from-pink-400 to-rose-400'
  ]

  useEffect(() => {
    const savedMemories = localStorage.getItem('ourMemories')
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories))
    } else {
      // Load sample memories if none exist
      setMemories(sampleMemories)
      localStorage.setItem('ourMemories', JSON.stringify(sampleMemories))
    }
  }, [])

  const saveMemories = (updatedMemories: Memory[]) => {
    setMemories(updatedMemories)
    localStorage.setItem('ourMemories', JSON.stringify(updatedMemories))
  }

  const addMemory = () => {
    if (!newMemory.title.trim() || !newMemory.description.trim() || !newMemory.date) return

    const memory: Memory = {
      id: Date.now(),
      title: newMemory.title.trim(),
      description: newMemory.description.trim(),
      date: newMemory.date,
      emoji: newMemory.emoji,
      color: newMemory.color
    }

    const updatedMemories = [...memories, memory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    saveMemories(updatedMemories)
    
    setNewMemory({
      title: '',
      description: '',
      date: '',
      emoji: '💕',
      color: 'from-pink-400 to-purple-400'
    })
    setShowAddForm(false)
  }

  const deleteMemory = (id: number) => {
    if (confirm('Are you sure you want to delete this memory?')) {
      const updatedMemories = memories.filter(memory => memory.id !== id)
      saveMemories(updatedMemories)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = today.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 0) return "In the future"
    return `${diffDays} days ago`
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="love-card mb-6 text-center">
          <h1 className="text-4xl font-bold text-love-purple mb-2">Our Memory Lane 📸</h1>
          <p className="text-gray-600 mb-4">A collection of our beautiful moments together</p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="heart-button"
            >
              {showAddForm ? 'Cancel' : 'Add Memory'} ✨
            </button>
          </div>
        </div>

        {/* Add Memory Form */}
        {showAddForm && (
          <div className="love-card mb-6">
            <h3 className="text-xl font-semibold text-love-purple mb-4">Create New Memory</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memory Title
                </label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                  placeholder="e.g., Our First Date, Movie Night Together..."
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newMemory.date}
                  onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Emoji
                </label>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewMemory({...newMemory, emoji})}
                      className={`text-2xl p-2 rounded-lg transition duration-200 ${
                        newMemory.emoji === emoji
                          ? 'bg-love-pink text-white'
                          : 'bg-gray-100 hover:bg-pink-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Color Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => setNewMemory({...newMemory, color})}
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} border-4 transition duration-200 ${
                        newMemory.color === color
                          ? 'border-love-purple scale-110'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memory Description
                </label>
                <textarea
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
                  placeholder="Describe this beautiful memory..."
                  rows={4}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={addMemory}
                disabled={!newMemory.title.trim() || !newMemory.description.trim() || !newMemory.date}
                className={`heart-button w-full ${
                  !newMemory.title.trim() || !newMemory.description.trim() || !newMemory.date
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Save Memory {newMemory.emoji}
              </button>
            </div>
          </div>
        )}

        {/* Memories Timeline */}
        <div className="space-y-6">
          {memories.length === 0 ? (
            <div className="love-card text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No memories yet</h3>
              <p className="text-gray-500">Start creating your memory collection!</p>
            </div>
          ) : (
            memories
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((memory, index) => (
                <div key={memory.id} className="relative">
                  {/* Timeline Line */}
                  {index !== memories.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-love-pink to-purple-300 opacity-30" />
                  )}
                  
                  <div className="flex items-start space-x-4">
                    {/* Timeline Dot */}
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${memory.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                      {memory.emoji}
                    </div>
                    
                    {/* Memory Card */}
                    <div className="flex-1 love-card">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-love-purple">
                            {memory.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{formatDate(memory.date)}</span>
                            <span className="text-pink-600">{getDaysAgo(memory.date)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteMemory(memory.id)}
                          className="text-gray-400 hover:text-red-500 transition duration-200"
                          title="Delete memory"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">
                        {memory.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Stats */}
        {memories.length > 0 && (
          <div className="love-card mt-8 text-center">
            <h3 className="text-xl font-semibold text-love-purple mb-4">Our Love Story Stats</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold text-love-pink">{memories.length}</div>
                <div className="text-gray-600">Beautiful Memories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-love-pink">
                  {Math.max(0, Math.floor((new Date().getTime() - new Date(memories[0]?.date).getTime()) / (1000 * 60 * 60 * 24)))}
                </div>
                <div className="text-gray-600">Days Together</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-love-pink">♾️</div>
                <div className="text-gray-600">Love Level</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link href="/">
            <button className="heart-button">
              ← Back to Home 🏠
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
