import React, { useState, useEffect } from 'react';
import './PreciseFireworks.css';

const PreciseFireworks = ({ trigger }) => {
  const [fireworks, setFireworks] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      startFireworksDisplay();
    }
  }, [trigger]);

  const startFireworksDisplay = () => {
    setIsActive(true);
    setFireworks([]);
    
    // Create multiple fireworks over 15 seconds
    const fireworksData = [];
    const totalDuration = 15000; // 15 seconds
    const numberOfFireworks = 12; // More fireworks for better effect
    
    for (let i = 0; i < numberOfFireworks; i++) {
      const delay = (i * totalDuration) / numberOfFireworks + Math.random() * 1000;
      const angle = 30 + Math.random() * 45; // Between 30-75 degrees
      const startX = 10 + Math.random() * 80; // Random horizontal position (10-90%)
      const speed = 0.8 + Math.random() * 0.4; // Varying speeds
      
      fireworksData.push({
        id: i,
        delay,
        angle,
        startX,
        speed,
        launched: false,
        exploded: false,
        falling: false
      });
    }
    
    setFireworks(fireworksData);
    
    // Launch fireworks with delays
    fireworksData.forEach((firework) => {
      setTimeout(() => {
        setFireworks(prev => prev.map(f => 
          f.id === firework.id ? { ...f, launched: true } : f
        ));
        
        // Explosion after launch
        setTimeout(() => {
          setFireworks(prev => prev.map(f => 
            f.id === firework.id ? { ...f, exploded: true } : f
          ));
          
          // Falling particles after explosion
          setTimeout(() => {
            setFireworks(prev => prev.map(f => 
              f.id === firework.id ? { ...f, falling: true } : f
            ));
          }, 800);
          
        }, 1500 * firework.speed);
        
      }, firework.delay);
    });
    
    // End the display after 15 seconds
    setTimeout(() => {
      setIsActive(false);
      setFireworks([]);
    }, totalDuration);
  };

  if (!isActive) return null;

  return (
    <div className="precise-fireworks-container">
      {fireworks.map((firework) => (
        <div key={firework.id} className="firework-wrapper">
          {/* Launch streak */}
          {firework.launched && !firework.exploded && (
            <div 
              className="firework-streak"
              style={{
                left: `${firework.startX}%`,
                transform: `rotate(${firework.angle}deg)`,
                animationDuration: `${1.5 * firework.speed}s`
              }}
            />
          )}
          
          {/* Explosion */}
          {firework.exploded && !firework.falling && (
            <div 
              className="firework-explosion"
              style={{
                left: `${firework.startX}%`,
                top: `${20 + Math.random() * 30}%`
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i} 
                  className="explosion-particle"
                  style={{
                    transform: `rotate(${i * 22.5}deg)`,
                    animationDelay: `${Math.random() * 0.2}s`
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Falling particles */}
          {firework.falling && (
            <div 
              className="firework-fall"
              style={{
                left: `${firework.startX}%`,
                top: `${20 + Math.random() * 30}%`
              }}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className="falling-particle"
                  style={{
                    left: `${(i - 12) * 8}px`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PreciseFireworks;

