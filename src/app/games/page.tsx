'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GamesPage() {
  const [ticTacToeBoard, setTicTacToeBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [memoryCards, setMemoryCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [currentGame, setCurrentGame] = useState<'menu' | 'tictactoe' | 'memory' | 'rock-paper-scissors'>('menu')
  const [rpsChoice, setRpsChoice] = useState<string | null>(null)
  const [computerChoice, setComputerChoice] = useState<string | null>(null)
  const [rpsResult, setRpsResult] = useState<string | null>(null)

  // Tic Tac Toe Logic
  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleTicTacToeClick = (index: number) => {
    if (ticTacToeBoard[index] || winner) return

    const newBoard = [...ticTacToeBoard]
    newBoard[index] = isXNext ? '💕' : '💖'
    setTicTacToeBoard(newBoard)
    setIsXNext(!isXNext)

    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) setWinner(gameWinner)
  }

  const resetTicTacToe = () => {
    setTicTacToeBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  // Memory Game Logic
  const initializeMemoryGame = () => {
    const emojis = ['💕', '💖', '💝', '💗', '🌹', '✨', '🌸', '💐']
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    setMemoryCards(shuffled)
    setFlipped([])
    setMatched([])
  }

  const handleMemoryCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length >= 2) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      if (memoryCards[newFlipped[0]] === memoryCards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  // Rock Paper Scissors Logic
  const playRPS = (playerChoice: string) => {
    const choices = ['🪨', '📄', '✂️']
    const computerChoice = choices[Math.floor(Math.random() * choices.length)]
    setRpsChoice(playerChoice)
    setComputerChoice(computerChoice)

    if (playerChoice === computerChoice) {
      setRpsResult("It's a tie! 💕")
    } else if (
      (playerChoice === '🪨' && computerChoice === '✂️') ||
      (playerChoice === '📄' && computerChoice === '🪨') ||
      (playerChoice === '✂️' && computerChoice === '📄')
    ) {
      setRpsResult("You win! 🎉")
    } else {
      setRpsResult("Computer wins! Try again! 💪")
    }
  }

  const resetRPS = () => {
    setRpsChoice(null)
    setComputerChoice(null)
    setRpsResult(null)
  }

  useEffect(() => {
    if (currentGame === 'memory' && memoryCards.length === 0) {
      initializeMemoryGame()
    }
  }, [currentGame, memoryCards.length])

  if (currentGame === 'menu') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="love-card max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-love-purple mb-8">Fun Games Together! 🎮</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => setCurrentGame('tictactoe')}
              className="love-card hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4">❌⭕</div>
              <h3 className="text-xl font-bold text-love-purple">Tic Tac Toe</h3>
              <p className="text-gray-600">Classic game with love emojis!</p>
            </button>

            <button
              onClick={() => setCurrentGame('memory')}
              className="love-card hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4">🧠💝</div>
              <h3 className="text-xl font-bold text-love-purple">Memory Game</h3>
              <p className="text-gray-600">Match the love emojis!</p>
            </button>

            <button
              onClick={() => setCurrentGame('rock-paper-scissors')}
              className="love-card hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4">🪨📄✂️</div>
              <h3 className="text-xl font-bold text-love-purple">Rock Paper Scissors</h3>
              <p className="text-gray-600">Best of luck game!</p>
            </button>
          </div>

          <Link href="/" className="inline-block mt-8">
            <button className="heart-button">
              ← Back to Home 🏠
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (currentGame === 'tictactoe') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="love-card max-w-md text-center">
          <h2 className="text-3xl font-bold text-love-purple mb-4">Tic Tac Toe 💕</h2>
          
          {winner ? (
            <div className="mb-4">
              <div className="text-6xl mb-2">{winner}</div>
              <p className="text-xl font-semibold text-love-purple">Wins!</p>
            </div>
          ) : (
            <p className="text-lg mb-4">Next player: {isXNext ? '💕' : '💖'}</p>
          )}

          <div className="grid grid-cols-3 gap-2 mb-6">
            {ticTacToeBoard.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleTicTacToeClick(index)}
                className="w-20 h-20 bg-white border-2 border-pink-200 rounded-lg text-3xl hover:bg-pink-50 transition duration-200"
              >
                {cell}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={resetTicTacToe} className="heart-button w-full">
              New Game 🔄
            </button>
            <button
              onClick={() => setCurrentGame('menu')}
              className="w-full py-2 px-4 border-2 border-love-pink text-love-pink rounded-full hover:bg-love-pink hover:text-white transition duration-200"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentGame === 'memory') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="love-card max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-love-purple mb-6">Memory Game 🧠</h2>
          
          <p className="mb-4">Matched: {matched.length / 2} / 8 pairs</p>
          
          <div className="grid grid-cols-4 gap-3 mb-6">
            {memoryCards.map((card, index) => (
              <button
                key={index}
                onClick={() => handleMemoryCardClick(index)}
                className={`w-16 h-16 rounded-lg text-2xl transition duration-300 ${
                  flipped.includes(index) || matched.includes(index)
                    ? 'bg-white border-2 border-love-pink'
                    : 'bg-love-pink hover:bg-love-purple'
                }`}
              >
                {flipped.includes(index) || matched.includes(index) ? card : '?'}
              </button>
            ))}
          </div>

          {matched.length === 16 && (
            <div className="mb-4">
              <div className="text-6xl mb-2">🎉</div>
              <p className="text-xl font-semibold text-love-purple">Congratulations! You won!</p>
            </div>
          )}

          <div className="space-y-3">
            <button onClick={initializeMemoryGame} className="heart-button w-full">
              New Game 🔄
            </button>
            <button
              onClick={() => setCurrentGame('menu')}
              className="w-full py-2 px-4 border-2 border-love-pink text-love-pink rounded-full hover:bg-love-pink hover:text-white transition duration-200"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentGame === 'rock-paper-scissors') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="love-card max-w-md text-center">
          <h2 className="text-3xl font-bold text-love-purple mb-6">Rock Paper Scissors 🪨📄✂️</h2>
          
          {rpsResult ? (
            <div className="mb-6">
              <div className="flex justify-center items-center space-x-8 mb-4">
                <div>
                  <p className="text-sm text-gray-600">You</p>
                  <div className="text-6xl">{rpsChoice}</div>
                </div>
                <div className="text-2xl">VS</div>
                <div>
                  <p className="text-sm text-gray-600">Computer</p>
                  <div className="text-6xl">{computerChoice}</div>
                </div>
              </div>
              <p className="text-xl font-semibold text-love-purple">{rpsResult}</p>
            </div>
          ) : (
            <p className="text-lg mb-6">Choose your move:</p>
          )}

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => playRPS('🪨')}
              className="w-20 h-20 bg-white border-2 border-pink-200 rounded-lg text-4xl hover:bg-pink-50 transition duration-200"
            >
              🪨
            </button>
            <button
              onClick={() => playRPS('📄')}
              className="w-20 h-20 bg-white border-2 border-pink-200 rounded-lg text-4xl hover:bg-pink-50 transition duration-200"
            >
              📄
            </button>
            <button
              onClick={() => playRPS('✂️')}
              className="w-20 h-20 bg-white border-2 border-pink-200 rounded-lg text-4xl hover:bg-pink-50 transition duration-200"
            >
              ✂️
            </button>
          </div>

          <div className="space-y-3">
            {rpsResult && (
              <button onClick={resetRPS} className="heart-button w-full">
                Play Again 🔄
              </button>
            )}
            <button
              onClick={() => setCurrentGame('menu')}
              className="w-full py-2 px-4 border-2 border-love-pink text-love-pink rounded-full hover:bg-love-pink hover:text-white transition duration-200"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
