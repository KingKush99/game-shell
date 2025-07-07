import React, { useState, useEffect } from 'react';
import './DailyDiceGame.css';

// Dice face component with proper dot patterns
const DiceFace = ({ value }) => {
  const renderDots = (num) => {
    const dots = [];
    const dotPositions = {
      1: [[50, 50]], // center
      2: [[25, 25], [75, 75]], // diagonal
      3: [[25, 25], [50, 50], [75, 75]], // diagonal with center
      4: [[25, 25], [75, 25], [25, 75], [75, 75]], // corners
      5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]], // corners + center
      6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]] // two columns
    };

    const positions = dotPositions[num] || dotPositions[1];
    
    positions.forEach((pos, index) => {
      dots.push(
        <div
          key={index}
          className="dice-dot"
          style={{
            left: `${pos[0]}%`,
            top: `${pos[1]}%`
          }}
        />
      );
    });

    return dots;
  };

  return (
    <div className="dice-face-container">
      <div className="dice-face-background">
        {renderDots(value)}
      </div>
    </div>
  );
};

// Red cup component
const RedCup = ({ isShaking, isRolling, position, onClick, onMouseDown, onMouseUp, onMouseLeave }) => {
  return (
    <div 
      className={`red-cup ${isShaking ? 'shaking' : ''} ${isRolling ? 'rolling' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        cursor: (onClick || onMouseDown) ? 'pointer' : 'default'
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div className="cup-body">
        <div className="cup-rim"></div>
        <div className="cup-main"></div>
        <div className="cup-bottom"></div>
      </div>
    </div>
  );
};

const DailyDiceGame = ({ language = 'en', onClose, onComplete }) => {
  const [gameState, setGameState] = useState('waiting'); // waiting, shaking, rolling, result
  const [dice, setDice] = useState([]);
  const [cupPosition, setCupPosition] = useState({ x: 50, y: 40 });
  const [isShaking, setIsShaking] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdTimer, setHoldTimer] = useState(null);
  const [canRoll, setCanRoll] = useState(false);
  const [result, setResult] = useState(null);

  // Check if user has already played today
  useEffect(() => {
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem('dailyDiceLastPlayed');
    
    if (lastPlayed === today) {
      // Already played today
      setGameState('completed');
      const savedResult = localStorage.getItem('dailyDiceResult');
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      }
    }
  }, []);

  // Reset at midnight UTC
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      
      if (utcHours === 0 && utcMinutes === 0) {
        // Reset the game at midnight UTC
        localStorage.removeItem('dailyDiceLastPlayed');
        localStorage.removeItem('dailyDiceResult');
        setGameState('waiting');
        setResult(null);
      }
    };

    const interval = setInterval(checkMidnight, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleCupGrab = () => {
    if (gameState !== 'waiting') return;
    setGameState('shaking');
    setCanRoll(true); // Allow immediate rolling
  };

  const handleCupMouseDown = () => {
    if (gameState !== 'shaking') return;
    
    setIsHolding(true);
    setIsShaking(true);
    
    // Start shaking animation
    const shakeInterval = setInterval(() => {
      const shakeIntensity = 15;
      setCupPosition({
        x: 50 + (Math.random() - 0.5) * shakeIntensity,
        y: 40 + (Math.random() - 0.5) * shakeIntensity
      });
    }, 100);
    
    setHoldTimer(shakeInterval);
  };

  const handleCupMouseUp = () => {
    if (gameState !== 'shaking' || !isHolding) return;
    
    setIsHolding(false);
    setIsShaking(false);
    
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
    }
    
    // Reset cup position and roll dice
    setCupPosition({ x: 50, y: 40 });
    handleRoll();
  };

  const handleCupMouseLeave = () => {
    if (isHolding) {
      handleCupMouseUp();
    }
  };

  const handleRollDiceButton = () => {
    if (!canRoll || gameState !== 'shaking') return;
    handleRoll();
  };

  const handleRoll = () => {
    if (gameState !== 'shaking') return;
    
    setGameState('rolling');
    setIsShaking(false);
    
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
    }
    
    // Animate cup turning over
    setTimeout(() => {
      // Generate 5 random dice
      const newDice = Array(5).fill(0).map((_, index) => ({
        id: index,
        value: Math.floor(Math.random() * 6) + 1,
        x: 30 + Math.random() * 40, // Random positions on felt
        y: 60 + Math.random() * 20,
        rotation: Math.random() * 360
      }));
      
      setDice(newDice);
      
      // Calculate result
      const total = newDice.reduce((sum, die) => sum + die.value, 0);
      const newResult = {
        dice: newDice.map(d => d.value),
        total,
        timestamp: new Date().toISOString()
      };
      
      setResult(newResult);
      setGameState('result');
      
      // Save to localStorage
      const today = new Date().toDateString();
      localStorage.setItem('dailyDiceLastPlayed', today);
      localStorage.setItem('dailyDiceResult', JSON.stringify(newResult));
      
      if (onComplete) {
        onComplete(newResult);
      }
    }, 1000);
  };

  const handleSkip = () => {
    const today = new Date().toDateString();
    localStorage.setItem('dailyDiceLastPlayed', today);
    onClose();
  };

  const getDiceEmoji = (value) => {
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceEmojis[value - 1] || '⚀';
  };

  if (gameState === 'completed') {
    return (
      <div className="daily-dice-overlay">
        <div className="daily-dice-modal">
          <div className="dice-header">
            <h2>🎲 Daily Dice Game</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          
          <div className="dice-content">
            <div className="already-played">
              <h3>Already Played Today!</h3>
              <p>Come back tomorrow for your next daily roll.</p>
              {result && (
                <div className="previous-result">
                  <p>Today's Result: {result.total}</p>
                  <div className="result-dice">
                    {result.dice.map((value, index) => (
                      <div key={index} className="result-die">
                        <DiceFace value={value} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-dice-overlay">
      <div className="daily-dice-modal">
        <div className="dice-header">
          <h2>🎲 Daily Dice Game</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="dice-content">
          {gameState === 'waiting' && (
            <div className="game-instructions">
              <h3>Ready to Roll?</h3>
              <p>Grab the cup with your hands 🤲, shake it, and roll the dice!</p>
              <div className="action-buttons">
                <button className="roll-btn" onClick={handleCupGrab}>
                  🤲 Grab Cup
                </button>
                <button className="skip-btn" onClick={handleSkip}>
                  Skip Today
                </button>
              </div>
            </div>
          )}

          <div className="dice-table">
            {/* Green felt surface */}
            <div className="green-felt">
              
              {/* Dice cup */}
              <RedCup 
                isShaking={isShaking}
                isRolling={gameState === 'rolling'}
                position={cupPosition}
                onClick={gameState === 'shaking' ? undefined : undefined}
                onMouseDown={gameState === 'shaking' ? handleCupMouseDown : undefined}
                onMouseUp={gameState === 'shaking' ? handleCupMouseUp : undefined}
                onMouseLeave={gameState === 'shaking' ? handleCupMouseLeave : undefined}
              />

              {/* Emoji hands */}
              {gameState === 'shaking' && (
                <div className="hands">
                  <div className="hand left-hand">🤲</div>
                </div>
              )}

              {/* Dice */}
              {dice.map(die => (
                <div
                  key={die.id}
                  className="dice-piece"
                  style={{
                    left: `${die.x}%`,
                    top: `${die.y}%`,
                    transform: `rotate(${die.rotation}deg)`
                  }}
                >
                  <DiceFace value={die.value} />
                </div>
              ))}

              {/* Instructions overlay */}
              {gameState === 'shaking' && (
                <div className="shake-instructions">
                  <p>Hold the cup to shake, then release to roll!</p>
                  <p>Or click the button below:</p>
                  <button className="roll-dice-btn" onClick={handleRollDiceButton}>
                    🎲 Roll Dice!
                  </button>
                </div>
              )}

              {gameState === 'rolling' && (
                <div className="rolling-message">
                  <p>Rolling dice...</p>
                </div>
              )}

              {gameState === 'result' && result && (
                <div className="result-display">
                  <h3>Your Roll: {result.total}</h3>
                  <div className="dice-breakdown">
                    {result.dice.map((value, index) => (
                      <div key={index} className="result-die">
                        <DiceFace value={value} />
                      </div>
                    ))}
                  </div>
                  <p>Come back tomorrow for your next daily roll!</p>
                  <button className="done-btn" onClick={onClose}>
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDiceGame;

