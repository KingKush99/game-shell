import React, { useState } from 'react';
import './SinglePlayerLobby.css';

/**
 * SinglePlayerLobby
 * - User chooses difficulty (Easy / Normal / Hard / Expert)
 * - User chooses a character from 10 options
 *   * First 3 choices are free
 *   * 4th = 100 coins, 5th = 200, 6th = 400, 7th = 800, 8th = 1600,
 *     9th = 3200, 10th = 6400 coins
 * - We don't actually debit coins here; we just compute the cost and return
 *   it to the parent via onStartGame.
 */
const difficulties = ['Easy', 'Normal', 'Hard', 'Expert'];

const characters = [
  'Blitz', 'Nova', 'Rook', 'Tempest', 'Echo',
  'Shade', 'Prism', 'Volt', 'Mirage', 'Titan'
];

const characterCost = (index) => {
  if (index < 3) return 0;
  const core = [100, 200, 400, 800, 1600, 3200, 6400];
  return core[index - 3] || 0;
};

const SinglePlayerLobby = ({ language, onClose, onStartGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('Normal');
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);

  const handleStart = () => {
    const cost = characterCost(selectedCharacterIndex);
    if (onStartGame) {
      onStartGame({
        difficulty: selectedDifficulty,
        character: characters[selectedCharacterIndex],
        characterIndex: selectedCharacterIndex,
        characterCost: cost
      });
    }
  };

  return (
    <div className="spl-backdrop" onClick={onClose}>
      <div className="spl-modal" onClick={(e) => e.stopPropagation()}>
        <div className="spl-header">
          <h2>Single Player Setup</h2>
          <button className="spl-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="spl-body">
          {/* Difficulty selection */}
          <section className="spl-section">
            <h3>Difficulty</h3>
            <div className="spl-pill-row">
              {difficulties.map((level) => (
                <button
                  key={level}
                  className={
                    'spl-pill' +
                    (level === selectedDifficulty ? ' spl-pill-active' : '')
                  }
                  onClick={() => setSelectedDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </section>

          {/* Character selection */}
          <section className="spl-section">
            <h3>Character</h3>
            <div className="spl-grid">
              {characters.map((name, idx) => {
                const cost = characterCost(idx);
                const isSelected = idx === selectedCharacterIndex;
                return (
                  <button
                    key={name}
                    className={
                      'spl-character-card' + (isSelected ? ' selected' : '')
                    }
                    onClick={() => setSelectedCharacterIndex(idx)}
                  >
                    <div className="spl-character-avatar">
                      <span>{name[0]}</span>
                    </div>
                    <div className="spl-character-info">
                      <div className="spl-character-name">{name}</div>
                      <div className="spl-character-cost">
                        {cost === 0 ? 'FREE' : `${cost} coins`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="spl-footer">
          <button className="spl-start-button" onClick={handleStart}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerLobby;
