import React, { useState, useEffect } from 'react';
import './PageRefreshFireworks.css';

const PageRefreshFireworks = ({ trigger }) => {
  const [fireworks, setFireworks] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      startFireworksShow();
    }
  }, [trigger]);

  const startFireworksShow = () => {
    setIsActive(true);
    setFireworks([]);

    // Create fireworks that launch sporadically over 12 seconds
    const totalFireworks = 30;
    const showDuration = 12000; // 12 seconds
    
    for (let i = 0; i < totalFireworks; i++) {
      // Random delay spread over 12 seconds - more sporadic timing
      const delay = Math.random() * showDuration;
      
      setTimeout(() => {
        const firework = {
          id: `firework-${Date.now()}-${i}`,
          startX: Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1),
          startY: window.innerHeight,
          targetX: Math.random() * (window.innerWidth * 0.6) + (window.innerWidth * 0.2),
          // Different heights in top half of screen (5% to 45% from top)
          targetY: Math.random() * (window.innerHeight * 0.4) + (window.innerHeight * 0.05),
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          phase: 'launch',
          // Random launch duration for different speeds (1-2 seconds)
          launchDuration: 1000 + Math.random() * 1000
        };
        
        setFireworks(prev => [...prev, firework]);
      }, delay);
    }

    // End the show after 18 seconds (12 seconds + 6 seconds for final explosions)
    setTimeout(() => {
      setIsActive(false);
      setFireworks([]);
    }, 18000);
  };

  return (
    <div className={`page-refresh-fireworks ${isActive ? 'active' : ''}`}>
      {fireworks.map((firework) => (
        <FireworkElement key={firework.id} firework={firework} />
      ))}
    </div>
  );
};

const FireworkElement = ({ firework }) => {
  const [phase, setPhase] = useState('launch');
  const [streaks, setStreaks] = useState([]);
  const [position, setPosition] = useState({ x: firework.startX, y: firework.startY });

  useEffect(() => {
    // Launch phase: use dynamic duration with constant opacity
    const launchDuration = firework.launchDuration; // Use the firework's specific duration
    const deltaX = firework.targetX - firework.startX;
    const deltaY = firework.startY - firework.targetY;
    const steps = Math.floor(launchDuration / 16); // 60fps animation steps
    const stepDuration = launchDuration / steps;
    
    let currentStep = 0;
    
    const animateTrajectory = () => {
      if (currentStep < steps) {
        const progress = currentStep / steps;
        // Smooth easing function for more fluid motion
        const easedProgress = 1 - Math.pow(1 - progress, 2); // Ease-out quadratic for smoother motion
        
        const x = firework.startX + deltaX * easedProgress;
        const arcHeight = Math.abs(deltaY) * 0.3; // Dynamic arc based on distance
        const y = firework.startY - deltaY * easedProgress - Math.sin(easedProgress * Math.PI) * arcHeight;
        
        setPosition({ x, y });
        currentStep++;
        setTimeout(animateTrajectory, stepDuration);
      } else {
        // IMMEDIATELY explode when reaching destination - NO PAUSE
        setPosition({ x: firework.targetX, y: firework.targetY });
        setPhase('explode');
        setStreaks(createExplosionStreaks(firework));
      }
    };
    
    animateTrajectory();
  }, [firework]);

  useEffect(() => {
    if (phase === 'explode') {
      const interval = setInterval(() => {
        setStreaks(prevStreaks => 
          prevStreaks.map(streak => {
            const newExpansion = Math.min(streak.expansion + 0.02, 1); // Gradual expansion
            const currentLength = streak.length + (streak.maxLength - streak.length) * newExpansion;
            
            return {
              ...streak,
              x: streak.x + streak.vx,
              y: streak.y + streak.vy,
              vy: streak.vy + 0.2, // Gravity effect
              life: streak.life - 0.003, // Slower fade rate for longer visibility
              expansion: newExpansion,
              currentLength: currentLength
            };
          }).filter(streak => streak.life > 0)
        );
      }, 16); // 60fps for smooth animation

      return () => clearInterval(interval);
    }
  }, [phase]);

  const createExplosionStreaks = (firework) => {
    const streaks = [];
    const streakCount = 24; // Many streaks like in image 1
    const colors = ['#ff0000', '#ffffff', '#0000ff']; // Red, White, Blue
    
    for (let i = 0; i < streakCount; i++) {
      const angle = (i / streakCount) * 2 * Math.PI;
      const velocity = Math.random() * 6 + 5; // Random velocity for varied explosion
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      streaks.push({
        id: `${firework.id}-streak-${i}`,
        x: firework.targetX,
        y: firework.targetY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3, // Start with upward velocity
        color: color,
        life: 1.0,
        angle: angle * (180 / Math.PI),
        length: Math.random() * 20 + 10, // Start very small: 10-30px
        maxLength: Math.random() * 180 + 120, // Expand to 3x: 120-300px
        expansion: 0 // Track expansion progress
      });
    }
    
    return streaks;
  };

  const getStreakDirection = () => {
    const deltaX = firework.targetX - firework.startX;
    const deltaY = firework.startY - firework.targetY;
    const angleRad = Math.atan2(-deltaY, deltaX);
    const angleDeg = (angleRad * 180 / Math.PI) - 90;
    return angleDeg;
  };

  return (
    <>
      {/* White launch streak with 3x trailing length */}
      {phase === 'launch' && (
        <div 
          className="firework-launch-streak"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `rotate(${getStreakDirection()}deg)`,
            background: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.9), rgba(255,255,255,0.5), transparent)',
            boxShadow: '0 0 12px #ffffff, 0 0 24px rgba(255,255,255,0.5)',
            opacity: 1.0, // Constant opacity throughout launch
            height: '90px', // 3x length trailing streak
            width: '4px'
          }}
        />
      )}
      
      {/* Red, White, Blue explosion streaks - start small and expand to 3x */}
      {phase === 'explode' && streaks.map(streak => (
        <div
          key={streak.id}
          className="firework-explosion-streak"
          style={{
            left: `${streak.x}px`,
            top: `${streak.y}px`,
            background: `linear-gradient(to bottom, ${streak.color}, transparent)`,
            opacity: streak.life,
            transform: `rotate(${Math.atan2(streak.vy, streak.vx) * (180 / Math.PI) + 90}deg)`,
            height: `${streak.currentLength || streak.length}px`,
            boxShadow: `0 0 6px ${streak.color}, 0 0 12px ${streak.color}40`
          }}
        />
      ))}
    </>
  );
};

export default PageRefreshFireworks;

