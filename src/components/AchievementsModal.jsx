import React, { useState, useEffect } from 'react';
import './AchievementsModal.css';
import { translations } from '../translations';

const AchievementsModal = ({ 
  language = 'en', 
  onClose, 
  selectedVariation, 
  selectedPlayerMode,
  prestigeLevel,
  totalXP,
  onPrestigeReset,
  onDifficultyReset,
  achievements,
  onAchievementUpdate
}) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetType, setResetType] = useState(null);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Generate achievement bank based on variation and player mode
  const generateAchievementBank = () => {
    const variations = ['1', '2', '3', '4'];
    const playerModes = ['1', '2', '3', '4'];
    const gameTypes = ['singlePlayer', 'multiplayer'];
    
    const achievementTemplates = [
      { type: 'wins', name: 'Victory Streak', description: 'Win {count} consecutive games', icon: '🏆' },
      { type: 'games', name: 'Game Master', description: 'Play {count} total games', icon: '🎮' },
      { type: 'score', name: 'High Scorer', description: 'Achieve a score of {count}', icon: '⭐' },
      { type: 'time', name: 'Speed Demon', description: 'Complete a game in under {count} seconds', icon: '⚡' },
      { type: 'perfect', name: 'Perfectionist', description: 'Get {count} perfect scores', icon: '💎' },
      { type: 'combo', name: 'Combo King', description: 'Achieve a {count}x combo', icon: '🔥' },
      { type: 'survival', name: 'Survivor', description: 'Survive for {count} minutes', icon: '🛡️' },
      { type: 'collection', name: 'Collector', description: 'Collect {count} items', icon: '📦' },
      { type: 'level', name: 'Level Master', description: 'Reach level {count}', icon: '📈' },
      { type: 'challenge', name: 'Challenge Accepted', description: 'Complete {count} daily challenges', icon: '🎯' },
      { type: 'social', name: 'Social Butterfly', description: 'Play with {count} different players', icon: '👥' },
      { type: 'tournament', name: 'Tournament Champion', description: 'Win {count} tournaments', icon: '🏅' },
      { type: 'streak', name: 'Unstoppable', description: 'Maintain a {count} day login streak', icon: '📅' },
      { type: 'coins', name: 'Wealthy', description: 'Earn {count} coins', icon: '🪙' },
      { type: 'experience', name: 'Experienced', description: 'Gain {count} XP', icon: '✨' },
      { type: 'precision', name: 'Precision Master', description: 'Achieve {count}% accuracy', icon: '🎯' },
      { type: 'endurance', name: 'Endurance Runner', description: 'Play for {count} hours total', icon: '⏰' },
      { type: 'comeback', name: 'Comeback Kid', description: 'Win {count} games from behind', icon: '🔄' },
      { type: 'domination', name: 'Dominator', description: 'Win by {count}+ points', icon: '💪' },
      { type: 'consistency', name: 'Consistent Player', description: 'Score within 10% variance for {count} games', icon: '📊' },
      { type: 'exploration', name: 'Explorer', description: 'Discover {count} hidden areas', icon: '🗺️' },
      { type: 'mastery', name: 'Master of All', description: 'Master {count} different skills', icon: '🎓' },
      { type: 'legendary', name: 'Legendary', description: 'Achieve legendary status {count} times', icon: '👑' },
      { type: 'dedication', name: 'Dedicated Player', description: 'Play every day for {count} days', icon: '💝' },
      { type: 'ultimate', name: 'Ultimate Champion', description: 'Complete the ultimate challenge {count} times', icon: '🌟' }
    ];

    const difficultyMultipliers = {
      easy: [1, 5, 10, 25, 50],
      medium: [10, 25, 50, 100, 250],
      hard: [50, 100, 250, 500, 1000],
      expert: [100, 500, 1000, 2500, 5000],
      legendary: [500, 1000, 5000, 10000, 25000]
    };

    const difficulties = ['easy', 'medium', 'hard', 'expert', 'legendary'];
    const currentDifficulty = difficulties[Math.min(prestigeLevel, 4)];
    const multipliers = difficultyMultipliers[currentDifficulty];

    const bank = [];
    for (let i = 0; i < 100; i++) {
      const template = achievementTemplates[i % achievementTemplates.length];
      const multiplier = multipliers[Math.floor(i / 20)];
      const count = template.type === 'precision' ? Math.min(95 + (i % 5), 99) : 
                   template.type === 'time' ? Math.max(300 - (multiplier * 10), 30) : 
                   multiplier;
      
      bank.push({
        id: `${selectedVariation}_${selectedPlayerMode}_${i}`,
        name: template.name + (i >= 20 ? ` ${Math.floor(i / 20) + 1}` : ''),
        description: template.description.replace('{count}', count.toLocaleString()),
        icon: template.icon,
        difficulty: currentDifficulty,
        progress: 0,
        target: count,
        completed: false,
        type: template.type
      });
    }
    
    return bank;
  };

  const achievementBank = generateAchievementBank();
  const currentAchievements = achievementBank.slice(currentSet * 25, (currentSet + 1) * 25);
  const completedCount = currentAchievements.filter(a => a.completed).length;
  const canReset = completedCount === 25 || completedCount > 0;

  const handleReset = (type) => {
    setResetType(type);
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    if (resetType === 'prestige') {
      onPrestigeReset();
    } else {
      onDifficultyReset();
    }
    setShowResetConfirm(false);
    setResetType(null);
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
    setResetType(null);
  };

  return (
    <div className="achievements-modal-overlay">
      <div className="achievements-modal">
        <div className="achievements-header">
          <div className="header-info">
            <h2>🏆 Achievements & Awards</h2>
            <div className="player-stats">
              <span className="prestige">Prestige Level: {prestigeLevel}</span>
              <span className="xp">Total XP: {totalXP.toLocaleString()}</span>
              <span className="variation">Variation: {selectedVariation}</span>
              <span className="mode">Mode: {selectedPlayerMode} Player</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="achievements-content">
          {/* Set Navigation */}
          <div className="set-navigation">
            <h3>Achievement Sets (25 each)</h3>
            <div className="set-buttons">
              {[0, 1, 2, 3].map(setIndex => (
                <button
                  key={setIndex}
                  className={`set-btn ${currentSet === setIndex ? 'active' : ''}`}
                  onClick={() => setCurrentSet(setIndex)}
                >
                  Set {setIndex + 1}
                  <span className="set-progress">
                    {achievementBank.slice(setIndex * 25, (setIndex + 1) * 25)
                      .filter(a => a.completed).length}/25
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Set Progress */}
          <div className="set-progress-bar">
            <div className="progress-info">
              <span>Set {currentSet + 1} Progress: {completedCount}/25</span>
              <span>{Math.round((completedCount / 25) * 100)}% Complete</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(completedCount / 25) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="achievements-grid">
            {currentAchievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`achievement-card ${achievement.completed ? 'completed' : ''}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                  <div className="achievement-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {achievement.progress.toLocaleString()}/{achievement.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="achievement-difficulty">
                    Difficulty: <span className={`difficulty ${achievement.difficulty}`}>
                      {achievement.difficulty.toUpperCase()}
                    </span>
                  </div>
                </div>
                {achievement.completed && (
                  <div className="completion-badge">✅</div>
                )}
              </div>
            ))}
          </div>

          {/* Reset Options */}
          <div className="reset-section">
            <h3>Reset Options</h3>
            <div className="reset-buttons">
              <button 
                className="reset-btn prestige"
                onClick={() => handleReset('prestige')}
                disabled={completedCount < 25}
              >
                🌟 Prestige Reset
                <span className="reset-description">
                  Complete all 25 achievements to unlock prestige (+1 level, +10,000 XP)
                </span>
              </button>
              <button 
                className="reset-btn difficulty"
                onClick={() => handleReset('difficulty')}
                disabled={completedCount === 0}
              >
                😰 Too Hard Reset
                <span className="reset-description">
                  Reset if achievements are too difficult (no prestige, no XP bonus)
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="reset-confirm-overlay">
            <div className="reset-confirm-modal">
              <h3>Confirm Reset</h3>
              {resetType === 'prestige' ? (
                <div className="confirm-content">
                  <p>🎉 Congratulations! You've completed all 25 achievements!</p>
                  <p>Prestige Reset will give you:</p>
                  <ul>
                    <li>+1 Prestige Level</li>
                    <li>+10,000 XP Bonus</li>
                    <li>New harder achievement set</li>
                    <li>Prestige badge on your profile</li>
                  </ul>
                  <p>Are you ready to prestige?</p>
                </div>
              ) : (
                <div className="confirm-content">
                  <p>⚠️ Are you sure you want to reset because achievements are too hard?</p>
                  <p>This will:</p>
                  <ul>
                    <li>Reset all current progress</li>
                    <li>Generate easier achievements</li>
                    <li>Give NO prestige level</li>
                    <li>Give NO XP bonus</li>
                  </ul>
                  <p>Consider trying a bit more before resetting!</p>
                </div>
              )}
              <div className="confirm-buttons">
                <button className="confirm-btn" onClick={confirmReset}>
                  {resetType === 'prestige' ? 'Prestige Now!' : 'Reset Anyway'}
                </button>
                <button className="cancel-btn" onClick={cancelReset}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsModal;

