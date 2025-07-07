import React, { useState, useEffect, useRef } from 'react'
import { t } from '../translations'

const MiniSlots = ({ language, isOpen, onClose }) => {
  const [reels, setReels] = useState([['🍒', '🍋', '🍊'], ['🍒', '🍋', '🍊'], ['🍒', '🍋', '🍊']])
  const [isSpinning, setIsSpinning] = useState(false)
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [lastWin, setLastWin] = useState(0)
  const [message, setMessage] = useState('')
  const [showFireworks, setShowFireworks] = useState(false)

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎', '7️⃣']
  const spinDuration = 2000

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)]

  const checkWin = (newReels) => {
    const centerRow = newReels.map(reel => reel[1]) // Middle row
    
    // Check for three of a kind
    if (centerRow[0] === centerRow[1] && centerRow[1] === centerRow[2]) {
      const symbol = centerRow[0]
      let multiplier = 1
      
      switch (symbol) {
        case '💎': multiplier = 100; break
        case '7️⃣': multiplier = 50; break
        case '⭐': multiplier = 25; break
        case '🔔': multiplier = 10; break
        case '🍇': multiplier = 5; break
        case '🍊': multiplier = 3; break
        case '🍋': multiplier = 2; break
        case '🍒': multiplier = 1.5; break
        default: multiplier = 1
      }
      
      return bet * multiplier
    }
    
    // Check for two of a kind
    if (centerRow[0] === centerRow[1] || centerRow[1] === centerRow[2] || centerRow[0] === centerRow[2]) {
      return bet * 0.5
    }
    
    return 0
  }

  const spin = () => {
    if (isSpinning || balance < bet) return
    
    setIsSpinning(true)
    setBalance(prev => prev - bet)
    setLastWin(0)
    setMessage('')
    setShowFireworks(false)
    
    // Animate reels spinning
    const spinInterval = setInterval(() => {
      setReels(prev => prev.map(reel => 
        reel.map(() => getRandomSymbol())
      ))
    }, 100)
    
    setTimeout(() => {
      clearInterval(spinInterval)
      
      // Final result
      const finalReels = [
        [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
        [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
        [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
      ]
      
      setReels(finalReels)
      
      const winAmount = checkWin(finalReels)
      if (winAmount > 0) {
        setLastWin(winAmount)
        setBalance(prev => prev + winAmount)
        
        if (winAmount >= bet * 50) {
          setMessage(t('jackpot', language))
          setShowFireworks(true)
        } else if (winAmount >= bet * 10) {
          setMessage(t('bigWin', language))
        } else {
          setMessage(t('winner', language))
        }
      }
      
      setIsSpinning(false)
    }, spinDuration)
  }

  const adjustBet = (amount) => {
    const newBet = Math.max(1, Math.min(balance, bet + amount))
    setBet(newBet)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 rounded-lg shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{t('miniSlotsTitle', language)}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-red-400 text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* Slot Machine Display */}
        <div className="bg-black rounded-lg p-4 mb-4 border-4 border-yellow-400">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {reels.map((reel, reelIndex) => (
              <div key={reelIndex} className="bg-white rounded border-2 border-gray-300">
                {reel.map((symbol, symbolIndex) => (
                  <div 
                    key={symbolIndex}
                    className={`text-4xl text-center py-2 ${
                      symbolIndex === 1 ? 'bg-yellow-200' : 'bg-gray-100'
                    } ${isSpinning ? 'animate-pulse' : ''}`}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Win Message */}
          {message && (
            <div className="text-center text-yellow-400 font-bold text-xl mb-2 animate-bounce">
              {message}
            </div>
          )}
          
          {/* Fireworks Effect */}
          {showFireworks && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="animate-ping absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full"></div>
              <div className="animate-ping absolute top-1/3 right-1/4 w-4 h-4 bg-red-400 rounded-full" style={{animationDelay: '0.2s'}}></div>
              <div className="animate-ping absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-400 rounded-full" style={{animationDelay: '0.4s'}}></div>
              <div className="animate-ping absolute bottom-1/4 right-1/3 w-4 h-4 bg-green-400 rounded-full" style={{animationDelay: '0.6s'}}></div>
            </div>
          )}
        </div>
        
        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-white text-center">
          <div>
            <div className="text-sm opacity-75">{t('balance', language)}</div>
            <div className="font-bold text-lg">{balance}</div>
          </div>
          <div>
            <div className="text-sm opacity-75">{t('bet', language)}</div>
            <div className="font-bold text-lg">{bet}</div>
          </div>
          <div>
            <div className="text-sm opacity-75">{t('win', language)}</div>
            <div className="font-bold text-lg text-yellow-400">{lastWin}</div>
          </div>
        </div>
        
        {/* Bet Controls */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button 
            onClick={() => adjustBet(-5)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            disabled={isSpinning}
          >
            -5
          </button>
          <button 
            onClick={() => adjustBet(-1)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            disabled={isSpinning}
          >
            -1
          </button>
          <span className="text-white font-bold px-4">{bet}</span>
          <button 
            onClick={() => adjustBet(1)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            disabled={isSpinning}
          >
            +1
          </button>
          <button 
            onClick={() => adjustBet(5)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            disabled={isSpinning}
          >
            +5
          </button>
        </div>
        
        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={isSpinning || balance < bet}
          className={`w-full py-3 px-6 rounded-lg font-bold text-xl transition-all duration-200 ${
            isSpinning || balance < bet
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {isSpinning ? '🎰 SPINNING...' : t('spin', language)}
        </button>
        
        {/* Paytable */}
        <div className="mt-4 text-xs text-gray-300">
          <div className="text-center font-bold mb-2">PAYTABLE</div>
          <div className="grid grid-cols-2 gap-1 text-center">
            <div>💎💎💎 = {bet * 100}</div>
            <div>7️⃣7️⃣7️⃣ = {bet * 50}</div>
            <div>⭐⭐⭐ = {bet * 25}</div>
            <div>🔔🔔🔔 = {bet * 10}</div>
            <div>🍇🍇🍇 = {bet * 5}</div>
            <div>🍊🍊🍊 = {bet * 3}</div>
            <div>🍋🍋🍋 = {bet * 2}</div>
            <div>🍒🍒🍒 = {bet * 1.5}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniSlots

