import React, { useState, useEffect, useRef } from 'react';
import './PreciseOdometer.css';

const PreciseOdometer = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [animatingDigits, setAnimatingDigits] = useState(new Set());
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prevValue = prevValueRef.current;
    const newValue = value;
    
    if (prevValue !== newValue) {
      // Determine which digits need to animate
      const prevStr = prevValue.toString().padStart(6, '0');
      const newStr = newValue.toString().padStart(6, '0');
      const newAnimatingDigits = new Set();
      
      // Find the rightmost digit that changed
      let changeIndex = -1;
      for (let i = prevStr.length - 1; i >= 0; i--) {
        if (prevStr[i] !== newStr[i]) {
          changeIndex = i;
          break;
        }
      }
      
      // If a change occurred, animate from that position to the end
      if (changeIndex !== -1) {
        for (let i = changeIndex; i < prevStr.length; i++) {
          newAnimatingDigits.add(i);
        }
      }
      
      setAnimatingDigits(newAnimatingDigits);
      
      // Start animation
      setTimeout(() => {
        setDisplayValue(newValue);
        setTimeout(() => {
          setAnimatingDigits(new Set());
        }, 600); // Animation duration
      }, 100);
    }
    
    prevValueRef.current = newValue;
  }, [value]);

  const formatValue = (val) => {
    return val.toString().padStart(6, '0').split('');
  };

  const digits = formatValue(displayValue);

  return (
    <div className="precise-odometer">
      <div className="odometer-label">{label}</div>
      <div className="odometer-container">
        {digits.map((digit, index) => {
          const isLastDigit = index === digits.length - 1;
          const isAnimating = animatingDigits.has(index);
          
          return (
            <div 
              key={index} 
              className={`odometer-digit ${isLastDigit ? 'last-digit' : ''} ${isAnimating ? 'animating' : ''}`}
            >
              <div className="digit-container">
                <div className="digit-reel">
                  {/* Previous digit for animation */}
                  {isAnimating && (
                    <div className="digit-number prev-digit">
                      {formatValue(prevValueRef.current)[index]}
                    </div>
                  )}
                  {/* Current digit */}
                  <div className="digit-number current-digit">
                    {digit}
                  </div>
                  {/* Next digit for animation */}
                  {isAnimating && (
                    <div className="digit-number next-digit">
                      {(parseInt(digit) + 1) % 10}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreciseOdometer;

