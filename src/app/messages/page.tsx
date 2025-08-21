'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  id: number
  text: string
  sender: string
  timestamp: Date
  emoji: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('💕')

  const emojis = ['💕', '💖', '💝', '💗', '🌹', '✨', '🌸', '💐', '🦋', '🌟', '💫', '🎀']

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem('loveMessages')
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
      setMessages(parsedMessages)
    }

    // Load sender name from localStorage
    const savedName = localStorage.getItem('senderName')
    if (savedName) {
      setSenderName(savedName)
    }
  }, [])

  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem('loveMessages', JSON.stringify(newMessages))
    setMessages(newMessages)
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !senderName.trim()) return

    const message: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: senderName.trim(),
      timestamp: new Date(),
      emoji: selectedEmoji
    }

    const updatedMessages = [...messages, message]
    saveMessages(updatedMessages)
    setNewMessage('')
    
    // Save sender name for future use
    localStorage.setItem('senderName', senderName)
  }

  const deleteMessage = (id: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== id)
    saveMessages(updatedMessages)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const getRandomLoveQuote = () => {
    const quotes = [
      "Distance means nothing when someone means everything 💕",
      "Every love story is beautiful, but ours is my favorite 💖",
      "You are my today and all of my tomorrows ✨",
      "In a sea of people, my eyes will always search for you 🌊",
      "You make my heart smile 😊💝",
      "Together is my favorite place to be 🏠💕"
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="love-card mb-6 text-center">
          <h1 className="text-4xl font-bold text-love-purple mb-2">Love Messages 💌</h1>
          <p className="text-gray-600">Send sweet messages to each other</p>
          <div className="mt-4 p-4 bg-pink-50 rounded-lg">
            <p className="text-love-purple font-medium italic">
              "{getRandomLoveQuote()}"
            </p>
          </div>
        </div>

        {/* Message Input */}
        <div className="love-card mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose an emoji
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-2 rounded-lg transition duration-200 ${
                      selectedEmoji === emoji
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
                Your Message
              </label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write your love message here..."
                rows={3}
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-love-pink focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || !senderName.trim()}
              className={`heart-button w-full ${
                !newMessage.trim() || !senderName.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              Send Love Message {selectedEmoji}
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="love-card text-center py-12">
              <div className="text-6xl mb-4">💌</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No messages yet</h3>
              <p className="text-gray-500">Be the first to send a love message!</p>
            </div>
          ) : (
            messages
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((message) => (
                <div key={message.id} className="love-card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{message.emoji}</span>
                        <span className="font-semibold text-love-purple">
                          {message.sender}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="text-gray-400 hover:text-red-500 transition duration-200 ml-4"
                      title="Delete message"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>

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
