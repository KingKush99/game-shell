import React, { useState, useEffect } from 'react';
import './SinglePlayerLobby.css';

const SinglePlayerLobby = ({ language = 'en', onClose, onStartGame }) => {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState(null);
  const [unlockedSlogans, setUnlockedSlogans] = useState({});

  useEffect(() => {
    // Load unlocked slogans from localStorage
    const saved = localStorage.getItem('unlockedSlogans');
    if (saved) {
      setUnlockedSlogans(JSON.parse(saved));
    }
  }, []);

  const skillLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      icon: '🌱',
      description: 'Perfect for newcomers! Learn the basics with guided tutorials and forgiving gameplay. Build your confidence and master fundamental skills.',
      slogan: 'Every Expert Was Once a Beginner',
      lockedSlogan: '**********',
      difficulty: 1,
      xpMultiplier: 1.0,
      coinReward: 100,
      features: ['Tutorial Mode', 'Hint System', 'Slower Pace', 'Extra Lives']
    },
    {
      id: 'novice',
      name: 'Novice',
      icon: '🎯',
      description: 'Ready to step up? Face moderate challenges while still enjoying helpful features. Perfect for building consistent skills.',
      slogan: 'Progress Through Practice',
      lockedSlogan: '**********',
      difficulty: 2,
      xpMultiplier: 1.2,
      coinReward: 200,
      features: ['Basic Hints', 'Standard Pace', 'Fair Challenges', 'Skill Building']
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      icon: '⚡',
      description: 'The sweet spot for most players! Balanced difficulty with engaging challenges. Test your growing expertise.',
      slogan: 'Mastery in Motion',
      lockedSlogan: '**********',
      difficulty: 3,
      xpMultiplier: 1.5,
      coinReward: 350,
      features: ['Balanced Gameplay', 'Strategic Depth', 'Skill Rewards', 'Competitive Edge']
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: '🔥',
      description: 'For serious players only! High-stakes gameplay with complex scenarios. Prove your advanced skills and tactical thinking.',
      slogan: 'Excellence is Not a Skill, It\'s an Attitude',
      lockedSlogan: '**********',
      difficulty: 4,
      xpMultiplier: 2.0,
      coinReward: 500,
      features: ['Advanced Mechanics', 'High Pressure', 'Elite Rewards', 'Prestige Points']
    },
    {
      id: 'worldclass',
      name: 'World Class',
      icon: '👑',
      description: 'The ultimate challenge! Only the most skilled players survive here. Face impossible odds and legendary opponents.',
      slogan: 'Legends Are Made, Not Born',
      lockedSlogan: '**********',
      difficulty: 5,
      xpMultiplier: 3.0,
      coinReward: 1000,
      features: ['Maximum Difficulty', 'Legendary Rewards', 'Hall of Fame', 'Ultimate Prestige']
    }
  ];

  const handleSkillLevelSelect = (skillLevel) => {
    setSelectedSkillLevel(skillLevel);
  };

  const handleStartGame = () => {
    if (selectedSkillLevel) {
      // Save the selected skill level
      localStorage.setItem('lastSelectedSkillLevel', selectedSkillLevel.id);
      onStartGame(selectedSkillLevel);
    }
  };

  const isSkillLevelUnlocked = (skillLevel) => {
    // For demo purposes, unlock based on some criteria
    // In a real game, this would be based on player progress
    const playerLevel = parseInt(localStorage.getItem('playerLevel') || '1');
    return playerLevel >= skillLevel.difficulty;
  };

  const getSloganDisplay = (skillLevel) => {
    const isUnlocked = unlockedSlogans[skillLevel.id] || isSkillLevelUnlocked(skillLevel);
    return isUnlocked ? skillLevel.slogan : skillLevel.lockedSlogan;
  };

  const getDifficultyStars = (difficulty) => {
    return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  return (
    <div className="single-player-lobby-overlay">
      <div className="single-player-lobby">
        <div className="lobby-header">
          <h2>🎮 Single Player Lobby</h2>
          <button onClick={onClose} className="close-button">✕</button>
        </div>
        
        <div className="lobby-content">
          <div className="skill-level-intro">
            <h3>Choose Your Challenge Level</h3>
            <p>Select a skill level that matches your experience. Each level offers unique rewards and challenges!</p>
          </div>
          
          <div className="skill-levels-grid">
            {skillLevels.map((skillLevel) => {
              const isUnlocked = isSkillLevelUnlocked(skillLevel);
              const isSelected = selectedSkillLevel?.id === skillLevel.id;
              
              return (
                <div
                  key={skillLevel.id}
                  className={`skill-level-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`}
                  onClick={() => isUnlocked && handleSkillLevelSelect(skillLevel)}
                >
                  <div className="skill-level-header">
                    <div className="skill-level-icon">{skillLevel.icon}</div>
                    <div className="skill-level-info">
                      <h4 className="skill-level-name">{skillLevel.name}</h4>
                      <div className="difficulty-stars">
                        {getDifficultyStars(skillLevel.difficulty)}
                      </div>
                    </div>
                    {!isUnlocked && <div className="lock-icon">🔒</div>}
                  </div>
                  
                  <div className="skill-level-description">
                    {skillLevel.description}
                  </div>
                  
                  <div className="skill-level-slogan">
                    <em>"{getSloganDisplay(skillLevel)}"</em>
                  </div>
                  
                  <div className="skill-level-rewards">
                    <div className="reward-item">
                      <span className="reward-label">XP Multiplier:</span>
                      <span className="reward-value">x{skillLevel.xpMultiplier}</span>
                    </div>
                    <div className="reward-item">
                      <span className="reward-label">Base Coins:</span>
                      <span className="reward-value">🪙{skillLevel.coinReward}</span>
                    </div>
                  </div>
                  
                  <div className="skill-level-features">
                    <h5>Features:</h5>
                    <ul>
                      {skillLevel.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {isSelected && (
                    <div className="selected-indicator">
                      ✅ Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="lobby-footer">
          <div className="selection-info">
            {selectedSkillLevel ? (
              <div className="selected-skill-info">
                <span className="selected-icon">{selectedSkillLevel.icon}</span>
                <span className="selected-text">
                  Ready to play <strong>{selectedSkillLevel.name}</strong> level
                </span>
              </div>
            ) : (
              <span className="no-selection">Please select a skill level to continue</span>
            )}
          </div>
          
          <div className="action-buttons">
            <button onClick={onClose} className="cancel-button">
              ← Back to Menu
            </button>
            <button 
              onClick={handleStartGame} 
              disabled={!selectedSkillLevel}
              className={`start-button ${!selectedSkillLevel ? 'disabled' : ''}`}
            >
              Start Game →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerLobby;

