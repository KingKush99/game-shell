import React, { useState, useEffect, useRef } from 'react'
import './Odometer.css'

const OdometerDigit = ({ value, isLast, shouldAnimate }) => {
  const [currentValue, setCurrentValue] = useState(value)
  const [nextValue, setNextValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const digitRef = useRef(null)

  useEffect(() => {
    if (value !== currentValue && shouldAnimate) {
      setNextValue(value)
      setIsAnimating(true)
      
      // Start the slot machine animation
      setTimeout(() => {
        setCurrentValue(value)
        setIsAnimating(false)
      }, 600) // Animation duration
    } else if (!shouldAnimate) {
      setCurrentValue(value)
      setNextValue(value)
    }
  }, [value, currentValue, shouldAnimate])

  return (
    <div className={`odometer-digit ${isLast ? 'last-digit' : ''}`}>
      <div className={`digit-container ${isAnimating ? 'animating' : ''}`}>
        <div className="digit current-digit">
          {currentValue}
        </div>
        {isAnimating && (
          <div className="digit next-digit">
            {nextValue}
          </div>
        )}
      </div>
    </div>
  )
}

const Odometer = ({ value, label, threshold = 1000, onThresholdReached }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setShouldAnimate(true)
      setDisplayValue(value)
      
      // Check if threshold is reached
      if (value >= threshold && prevValueRef.current < threshold && onThresholdReached) {
        onThresholdReached()
      }
      
      prevValueRef.current = value
      
      // Reset animation flag after animation completes
      setTimeout(() => {
        setShouldAnimate(false)
      }, 700)
    }
  }, [value, threshold, onThresholdReached])

  // Convert number to array of digits with leading zeros
  const formatNumber = (num) => {
    const str = num.toString().padStart(6, '0')
    return str.split('').map(Number)
  }

  const digits = formatNumber(displayValue)

  return (
    <div className="odometer-container">
      <div className="odometer-label">{label}</div>
      <div className="odometer-display">
        {digits.map((digit, index) => (
          <React.Fragment key={index}>
            <OdometerDigit 
              value={digit}
              isLast={index === digits.length - 1}
              shouldAnimate={shouldAnimate}
            />
            {index < digits.length - 1 && <div className="digit-separator"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Odometer

