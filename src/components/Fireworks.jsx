import React, { useState, useEffect, useRef } from 'react'
import './Fireworks.css'

const FireworkParticle = ({ x, y, color, delay, type = 'explosion' }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={`firework-particle ${type} ${isVisible ? 'active' : ''}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}, 0 0 12px ${color}`
      }}
    />
  )
}

const FireworkLaunch = ({ startX, startY, endX, endY, color, onComplete }) => {
  const [isLaunching, setIsLaunching] = useState(false)
  
  useEffect(() => {
    setIsLaunching(true)
    const timer = setTimeout(() => {
      onComplete()
    }, 1000) // Launch duration
    
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div 
      className={`firework-launch ${isLaunching ? 'active' : ''}`}
      style={{
        left: `${startX}px`,
        top: `${startY}px`,
        '--end-x': `${endX}px`,
        '--end-y': `${endY}px`,
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`
      }}
    />
  )
}

const FireworkExplosion = ({ x, y, colors, onComplete }) => {
  const [particles, setParticles] = useState([])
  const [isExploding, setIsExploding] = useState(false)
  
  useEffect(() => {
    // Create explosion particles
    const newParticles = []
    const particleCount = 24
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * 2 * Math.PI
      const distance = 80 + Math.random() * 40
      const particleX = x + Math.cos(angle) * distance
      const particleY = y + Math.sin(angle) * distance
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      newParticles.push({
        id: i,
        x: particleX,
        y: particleY,
        color: color,
        delay: Math.random() * 200
      })
    }
    
    setParticles(newParticles)
    setIsExploding(true)
    
    // Complete explosion after animation
    const timer = setTimeout(() => {
      onComplete()
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [x, y, colors, onComplete])

  return (
    <div className="firework-explosion">
      {/* Central explosion flash */}
      <div 
        className={`explosion-center ${isExploding ? 'active' : ''}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
      
      {/* Radiating particles */}
      {particles.map(particle => (
        <FireworkParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          color={particle.color}
          delay={particle.delay}
          type="explosion"
        />
      ))}
    </div>
  )
}

const FireworkFall = ({ particles, onComplete }) => {
  const [isFalling, setIsFalling] = useState(false)
  
  useEffect(() => {
    setIsFalling(true)
    const timer = setTimeout(() => {
      onComplete()
    }, 2000) // Fall duration
    
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="firework-fall">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`falling-particle ${isFalling ? 'active' : ''}`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 4px ${particle.color}`,
            animationDelay: `${particle.delay}ms`
          }}
        />
      ))}
    </div>
  )
}

const SingleFirework = ({ startX, startY, endX, endY, colors, onComplete }) => {
  const [phase, setPhase] = useState('launch') // launch, explosion, fall, complete
  const [explosionParticles, setExplosionParticles] = useState([])

  const handleLaunchComplete = () => {
    setPhase('explosion')
  }

  const handleExplosionComplete = () => {
    // Create falling particles
    const fallParticles = []
    const particleCount = 16
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * 2 * Math.PI
      const distance = 60 + Math.random() * 30
      const particleX = endX + Math.cos(angle) * distance
      const particleY = endY + Math.sin(angle) * distance
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      fallParticles.push({
        id: i,
        x: particleX,
        y: particleY,
        color: color,
        delay: Math.random() * 300
      })
    }
    
    setExplosionParticles(fallParticles)
    setPhase('fall')
  }

  const handleFallComplete = () => {
    setPhase('complete')
    onComplete()
  }

  return (
    <div className="single-firework">
      {phase === 'launch' && (
        <FireworkLaunch
          startX={startX}
          startY={startY}
          endX={endX}
          endY={endY}
          color={colors[0]}
          onComplete={handleLaunchComplete}
        />
      )}
      
      {phase === 'explosion' && (
        <FireworkExplosion
          x={endX}
          y={endY}
          colors={colors}
          onComplete={handleExplosionComplete}
        />
      )}
      
      {phase === 'fall' && (
        <FireworkFall
          particles={explosionParticles}
          onComplete={handleFallComplete}
        />
      )}
    </div>
  )
}

const FireworksDisplay = ({ isActive, onComplete }) => {
  const [fireworks, setFireworks] = useState([])
  const [completedCount, setCompletedCount] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    // Create multiple fireworks with different timings and positions
    const newFireworks = []
    const fireworkCount = 5
    
    for (let i = 0; i < fireworkCount; i++) {
      const startX = Math.random() * (window.innerWidth - 200) + 100
      const startY = window.innerHeight - 50
      const endX = Math.random() * (window.innerWidth - 300) + 150
      const endY = Math.random() * 200 + 100
      
      const colorSets = [
        ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
        ['#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'],
        ['#00D2D3', '#FF9F43', '#EE5A24', '#0984E3'],
        ['#A29BFE', '#FD79A8', '#FDCB6E', '#6C5CE7'],
        ['#74B9FF', '#E17055', '#00B894', '#FDCB6E']
      ]
      
      newFireworks.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        colors: colorSets[i % colorSets.length],
        delay: i * 300
      })
    }
    
    setFireworks(newFireworks)
    setCompletedCount(0)
  }, [isActive])

  const handleFireworkComplete = () => {
    setCompletedCount(prev => {
      const newCount = prev + 1
      if (newCount >= fireworks.length) {
        setTimeout(() => {
          onComplete()
        }, 500)
      }
      return newCount
    })
  }

  if (!isActive) return null

  return (
    <div className="fireworks-display" ref={containerRef}>
      {fireworks.map((firework, index) => (
        <div key={firework.id} style={{ animationDelay: `${firework.delay}ms` }}>
          <SingleFirework
            startX={firework.startX}
            startY={firework.startY}
            endX={firework.endX}
            endY={firework.endY}
            colors={firework.colors}
            onComplete={handleFireworkComplete}
          />
        </div>
      ))}
    </div>
  )
}

export default FireworksDisplay

