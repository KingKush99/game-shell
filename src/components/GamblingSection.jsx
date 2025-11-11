import React, { useState } from 'react';

const GamblingSection = ({ language, userCoins, setUserCoins }) => {
  const [betAmount, setBetAmount] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const handlePlaceBet = () => {
    if (betAmount > userCoins) {
      alert(`You don't have enough coins! You have ${userCoins} coins.`);
      return;
    }

    if (betAmount < 100) {
      alert('Minimum bet is 100 coins!');
      return;
    }

    setIsPlaying(true);
    setLastResult(null);

    // Simulate game (52% house edge)
    setTimeout(() => {
      const won = Math.random() > 0.52;
      const winnings = won ? betAmount * 2 : 0;
      const loss = won ? 0 : betAmount;

      setLastResult({
        won,
        amount: won ? winnings : loss
      });

      setUserCoins(prev => prev + (won ? betAmount : -betAmount));
      localStorage.setItem('userCoins', (userCoins + (won ? betAmount : -betAmount)).toString());
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <div className="gambling-section">
      <h3>💰 High Roller Arena</h3>
      
      <div className="gambling-balance">
        <span>Balance: </span>
        <span className="balance-amount">{userCoins.toLocaleString()} coins</span>
      </div>

      <div className="gambling-controls">
        <div className="bet-input-group">
          <label>Bet Amount:</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            min="100"
            max={userCoins}
            step="100"
            className="bet-input"
          />
          <span className="min-bet-text">Min: 100 coins</span>
        </div>

        <button
          onClick={handlePlaceBet}
          disabled={isPlaying || betAmount > userCoins}
          className="gamble-btn"
        >
          {isPlaying ? '🎲 Rolling...' : 'Place Bet & Play'}
        </button>

        {lastResult && (
          <div className={`result-display ${lastResult.won ? 'win' : 'lose'}`}>
            <h4>{lastResult.won ? '🎉 You Won!' : '😢 You Lost'}</h4>
            <p>{lastResult.won ? `+${lastResult.amount}` : `-${lastResult.amount}`} coins</p>
          </div>
        )}
      </div>

      <div className="gambling-info">
        <h4>Double or Nothing!</h4>
        <ul>
          <li>Minimum bet: 100 coins</li>
          <li>Win: Double your stake (48% chance)</li>
          <li>Lose: Lose your stake (52% chance)</li>
          <li>House edge: 4%</li>
        </ul>
      </div>
    </div>
  );
};

export default GamblingSection;
