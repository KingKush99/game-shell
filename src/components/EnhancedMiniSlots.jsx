import React, { useState } from 'react';
import './EnhancedMiniSlots.css';

/**
 * EnhancedMiniSlots
 * - Opens as a small modal in the BOTTOM‑RIGHT of the screen (same size as chatbot)
 * - "Spin" button is renamed to "PUSH", circular, and centered on the bottom of the modal
 * - Left drop‑up: bet size (10 / 25 / 50 / 100 / 500)
 * - Right drop‑up: reel count (3 – 6)
 * - Modal closes when:
 *   - user clicks the red ❌ in the top‑right, OR
 *   - user double‑clicks anywhere outside the modal
 */
const EnhancedMiniSlots = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [reelCount, setReelCount] = useState(3);
  const [betSize, setBetSize] = useState(10);
  const [reels, setReels] = useState(Array(3).fill('🍒'));
  const [isSpinning, setIsSpinning] = useState(false);
  const betOptions = [10, 25, 50, 100, 500];
  const reelOptions = [3, 4, 5, 6];
  const symbols = ['🍒', '🍋', '🔔', '⭐', '🍀', '💎'];

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleBackdropClick = (e) => {
    // close only if user DOUBLE‑clicks the backdrop (not the modal itself)
    if (e.detail === 2 && e.target.classList.contains('mini-slots-backdrop')) {
      handleClose();
    }
  };

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const newReels = [];
    for (let i = 0; i < reelCount; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      newReels.push(symbol);
    }
    setReels(newReels);

    setTimeout(() => setIsSpinning(false), 700);
  };

  if (!isOpen) return null;

  return (
    <div
      className="mini-slots-backdrop"
      onClick={handleBackdropClick}
    >
      <div
        className="mini-slots-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mini-slots-header">
          <span className="mini-slots-title">Mini Slots</span>
          <button
            className="mini-slots-close"
            aria-label="Close"
            onClick={handleClose}
          >
            ✖
          </button>
        </div>

        {/* Reels */}
        <div className="mini-slots-reel-area">
          <div
            className="mini-slots-reels"
            style={{ gridTemplateColumns: `repeat(${reelCount}, 1fr)` }}
          >
            {Array.from({ length: reelCount }).map((_, idx) => (
              <div
                key={idx}
                className={`mini-slots-reel ${isSpinning ? 'spinning' : ''}`}
              >
                {reels[idx] || '❓'}
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="mini-slots-controls-row">
          {/* Bet size drop‑up */}
          <div className="mini-slots-dropup-wrapper">
            <button className="mini-slots-dropup-button">
              Bet: {betSize}
            </button>
            <div className="mini-slots-dropup-menu">
              {betOptions.map((bet) => (
                <button
                  key={bet}
                  className={`mini-slots-dropup-item ${
                    bet === betSize ? 'active' : ''
                  }`}
                  onClick={() => setBetSize(bet)}
                >
                  {bet}
                </button>
              ))}
            </div>
          </div>

          {/* PUSH button */}
          <button
            className={`mini-slots-push-button ${
              isSpinning ? 'disabled' : ''
            }`}
            onClick={spin}
            disabled={isSpinning}
          >
            PUSH
          </button>

          {/* Reel count drop‑up */}
          <div className="mini-slots-dropup-wrapper">
            <button className="mini-slots-dropup-button">
              Reels: {reelCount}
            </button>
            <div className="mini-slots-dropup-menu">
              {reelOptions.map((count) => (
                <button
                  key={count}
                  className={`mini-slots-dropup-item ${
                    count === reelCount ? 'active' : ''
                  }`}
                  onClick={() => {
                    setReelCount(count);
                    setReels((prev) => {
                      const next = [...prev];
                      while (next.length < count) next.push('🍒');
                      return next.slice(0, count);
                    });
                  }}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMiniSlots;
