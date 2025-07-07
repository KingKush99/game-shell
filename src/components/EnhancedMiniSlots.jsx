import { useState } from 'react'
import { t } from '../translations'
import './EnhancedMiniSlots.css'

const EnhancedMiniSlots = ({ language, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [reelCount, setReelCount] = useState(3)
  const [reels, setReels] = useState(['🍒', '🍒', '🍒'])
  const [bet, setBet] = useState(50)
  const [balance, setBalance] = useState(10000)
  const [lastWin, setLastWin] = useState(0)
  const [isHandlePulled, setIsHandlePulled] = useState(false)
  const [animatingReels, setAnimatingReels] = useState([])

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎', '7️⃣']
  const betOptions = [50, 100, 250, 500, 1000]
  const reelCountOptions = [
    { count: 3, multiplier: 1 },
    { count: 4, multiplier: 1.5 },
    { count: 5, multiplier: 2 }
  ]

  // Initialize reels when reel count changes
  const initializeReels = (count) => {
    const newReels = []
    for (let i = 0; i < count; i++) {
      newReels.push('🍒')
    }
    setReels(newReels)
  }

  const checkWin = (newReels) => {
    // Check if all reels match
    const firstSymbol = newReels[0]
    const allMatch = newReels.every(symbol => symbol === firstSymbol)
    
    if (allMatch) {
      const symbolMultipliers = {
        '🍒': 2, '🍋': 3, '🍊': 4, '🍇': 5,
        '🔔': 10, '⭐': 15, '💎': 25, '7️⃣': 50
      }
      const baseWin = bet * (symbolMultipliers[firstSymbol] || 1)
      // Bonus multiplier based on number of reels
      const reelMultiplier = reelCount === 3 ? 1 : reelCount === 4 ? 1.5 : 2
      return Math.floor(baseWin * reelMultiplier)
    }
    return 0
  }

  const pullHandle = () => {
    if (isSpinning || balance < bet) return
    
    setIsHandlePulled(true)
    setTimeout(() => setIsHandlePulled(false), 300)
    
    setIsSpinning(true)
    setBalance(prev => prev - bet)
    setLastWin(0)

    // Animate symbols rotating while keeping them visible
    const spinDuration = 1500
    const animationInterval = 100 // Change symbols every 100ms
    
    const animationTimer = setInterval(() => {
      // Keep changing symbols during animation - symbols stay visible
      const animatedReels = []
      for (let i = 0; i < reelCount; i++) {
        animatedReels.push(symbols[Math.floor(Math.random() * symbols.length)])
      }
      setReels(animatedReels)
    }, animationInterval)
    
    setTimeout(() => {
      clearInterval(animationTimer)
      
      // Final result
      const finalReels = []
      for (let i = 0; i < reelCount; i++) {
        finalReels.push(symbols[Math.floor(Math.random() * symbols.length)])
      }
      
      setReels(finalReels)
      
      const winAmount = checkWin(finalReels)
      
      if (winAmount > 0) {
        setLastWin(winAmount)
        setBalance(prev => prev + winAmount)
      }
      
      setIsSpinning(false)
    }, spinDuration)
  }

  const handleReelCountChange = (newCount) => {
    if (!isSpinning) {
      setReelCount(newCount)
      initializeReels(newCount)
    }
  }

  const getReelMultiplier = () => {
    return reelCount === 3 ? 1 : reelCount === 4 ? 1.5 : 2
  }

  const formatCoins = (amount) => {
    return amount.toLocaleString()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border-4 border-yellow-400">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 text-center flex-1">
            {t('miniSlots', language)}
          </h2>
          <button
            onClick={onClose}
            className="text-yellow-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Balance and Controls on Same Line */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="text-yellow-400 font-bold text-sm">Balance</div>
            <div className="text-white text-lg flex items-center">
              <span className="text-yellow-400 mr-1">🪙</span>
              {formatCoins(balance)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold text-sm">Reels</div>
            <select
              value={reelCount}
              onChange={(e) => handleReelCountChange(Number(e.target.value))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-sm border-none"
              disabled={isSpinning}
            >
              {reelCountOptions.map(option => (
                <option key={option.count} value={option.count} className="bg-gray-800">
                  {option.count} (x{option.multiplier})
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold text-sm">Bet</div>
            <select
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-2 py-1 rounded-full text-sm border-none"
              disabled={isSpinning}
            >
              {betOptions.map(option => (
                <option key={option} value={option} className="bg-gray-800">
                  🪙{formatCoins(option)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Slot Machine */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl mb-6 border-2 border-yellow-400">
          {/* Reels and Lever Container */}
          <div className="flex items-center justify-center mb-4">
            {/* Reels - No scroll bar, fixed width */}
            <div className="flex space-x-2 mr-6">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className="reel-container"
                >
                  <div className="horizontal-line"></div>
                  <div className="reel-symbol">
                    <div className="symbol-content">
                      {symbol}
                    </div>
                  </div>
                  <div className="vertical-separator"></div>
                </div>
              ))}
            </div>

            {/* Pull Lever on Right Side */}
            <div className="flex flex-col items-center">
              <div
                className={`slot-lever ${isHandlePulled ? 'pulled' : ''}`}
                onClick={pullHandle}
                onMouseDown={() => setIsHandlePulled(true)}
                onMouseUp={() => setTimeout(() => setIsHandlePulled(false), 200)}
                onMouseLeave={() => setTimeout(() => setIsHandlePulled(false), 200)}
              >
                <div className="lever-handle"></div>
                <div className="lever-arm"></div>
                <div className="lever-knob"></div>
              </div>
              <div className="text-yellow-400 text-xs mt-2 font-bold">PULL</div>
            </div>
          </div>

          {/* Win Display */}
          {lastWin > 0 && (
            <div className="text-center mb-4">
              <div className="text-yellow-400 text-2xl font-bold animate-pulse">
                {t('win', language)} 🪙{formatCoins(lastWin)}
              </div>
            </div>
          )}
        </div>

        {/* Spin Button */}
        <button
          onClick={pullHandle}
          disabled={isSpinning || balance < bet}
          className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
            isSpinning || balance < bet
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 transform hover:scale-105'
          }`}
        >
          {isSpinning ? 'SPINNING...' : t('pullHandle', language)}
        </button>

        {/* Instructions */}
        <div className="mt-4 text-center text-yellow-400 text-sm">
          {t('pullHandle', language)} • Match all {reelCount} symbols to win!
        </div>
      </div>
    </div>
  )
}

export default EnhancedMiniSlots

