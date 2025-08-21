'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const questions: Question[] = [
    {
      id: 1,
      question: "What was our first conversation topic?",
      options: ["Movies", "Music", "Food", "Dreams"],
      correct: 3
    },
    {
      id: 2,
      question: "What's my favorite thing about you?",
      options: ["Your smile", "Your laugh", "Your kindness", "All of the above"],
      correct: 3
    },
    {
      id: 3,
      question: "What's our favorite activity to do together (virtually)?",
      options: ["Watch movies", "Play games", "Video calls", "All together"],
      correct: 3
    },
    {
      id: 4,
      question: "What do I miss most about you?",
      options: ["Your hugs", "Your voice", "Your presence", "Everything"],
      correct: 3
    },
    {
      id: 5,
      question: "What makes our relationship special?",
      options: ["Trust", "Communication", "Love", "All of the above"],
      correct: 3
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "Perfect! You know me so well! 💕"
    if (percentage >= 80) return "Amazing! We're so connected! 💖"
    if (percentage >= 60) return "Great job! We understand each other! 💝"
    return "We can get to know each other even better! 💕"
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="love-card max-w-2xl text-center">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-love-purple mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-love-pink mb-4">
            {score} / {questions.length}
          </div>
          <p className="text-xl text-gray-700 mb-8">{getScoreMessage()}</p>
          
          <div className="space-y-4">
            <button
              onClick={resetQuiz}
              className="heart-button w-full"
            >
              Take Quiz Again 💕
            </button>
            <Link href="/" className="block">
              <button className="w-full py-3 px-6 border-2 border-love-pink text-love-pink rounded-full hover:bg-love-pink hover:text-white transition duration-200">
                Back to Home 🏠
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="love-card max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-love-purple mb-4">Love Quiz 💕</h1>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
            <div 
              className="bg-love-pink h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition duration-200 ${
                  selectedAnswer === index
                    ? 'border-love-pink bg-love-light text-love-purple'
                    : 'border-gray-200 hover:border-love-pink hover:bg-pink-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/">
            <button className="py-2 px-4 text-gray-600 hover:text-love-purple transition duration-200">
              ← Back to Home
            </button>
          </Link>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`py-3 px-6 rounded-full font-semibold transition duration-200 ${
              selectedAnswer !== null
                ? 'bg-love-pink text-white hover:bg-love-purple'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'} →
          </button>
        </div>
      </div>
    </div>
  )
}
