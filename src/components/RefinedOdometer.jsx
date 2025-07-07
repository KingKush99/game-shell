import React, { useState, useEffect, useRef } from 'react'
import './RefinedOdometer.css'

const RefinedOdometer = ({ value, label, isRed = false }) => {
  const [displayValue, setDisplayValue] = useState(value.toString().padStart(6, '0'))
  const [animatingDigits, setAnimatingDigits] = useState(new Set())
  const prevValueRef = useRef(value)

  useEffect(() => {
    const prevValue = prevValueRef.current
    const newValue = value
    
    if (prevValue !== newValue) {
      const prevStr = prevValue.toString().padStart(6, '0')
      const newStr = newValue.toString().padStart(6, '0')
      
      // Determine which digits need to animate
      const digitsToAnimate = new Set()
      
      // Find the rightmost digit that changed
      let rightmostChanged = -1
      for (let i = 5; i >= 0; i--) {
        if (prevStr[i] !== newStr[i]) {
          rightmostChanged = i
          break
        }
      }
      
      if (rightmostChanged !== -1) {
        // Check for cascading 9s
        let startIndex = rightmostChanged
        
        // If we're going from 9 to 0, check for cascading
        if (prevStr[rightmostChanged] === '9' && newStr[rightmostChanged] === '0') {
          // Look for consecutive 9s to the left
          for (let i = rightmostChanged - 1; i >= 0; i--) {
            if (prevStr[i] === '9' && newStr[i] !== '9') {
              startIndex = i
            } else {
              break
            }
          }
        }
        
        // Add all digits from startIndex to rightmostChanged to animation set
        for (let i = startIndex; i <= rightmostChanged; i++) {
          digitsToAnimate.add(i)
        }
      }
      
      setAnimatingDigits(digitsToAnimate)
      
      // Start animation
      setTimeout(() => {
        setDisplayValue(newStr)
        
        // Clear animation after completion
        setTimeout(() => {
          setAnimatingDigits(new Set())
        }, 600) // Match CSS animation duration
      }, 50)
      
      prevValueRef.current = newValue
    }
  }, [value])

  const digits = displayValue.split('')

  return (
    <div className="odometer-container">
      <div className="odometer-label">{label}</div>
      <div className="odometer-display">
        {digits.map((digit, index) => (
          <div key={index} className="digit-container">
            <div 
              className={`digit-display ${animatingDigits.has(index) ? 'animating' : ''} ${
                isRed && index === digits.length - 1 ? 'red-digit' : 'black-digit'
              }`}
            >
              <div className="digit-current">{digit}</div>
              {animatingDigits.has(index) && (
                <div className="digit-next">
                  {digit}
                </div>
              )}
            </div>
            {index < digits.length - 1 && <div className="digit-separator"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RefinedOdometer

