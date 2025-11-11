import React, { useState } from 'react';
import './MultiplayerStyles.css';
import SpectatorSection from './SpectatorSection';
import GamblingSection from './GamblingSection';
import TournamentSection from './TournamentSection';
import CasualSection from './CasualSection';

const MultiplayerHub = ({ 
  language, 
  onClose, 
  userCoins, 
  setUserCoins,
  userSubscriptions,
  setShowVerificationModal,
  setVerificationType,
  setUserSubscriptions
}) => {
  const [activeSection, setActiveSection] = useState('casual');

  const t = {
    en: {
      title: "Multiplayer Arena",
      casual: "🎮 Casual",
      spectator: "📺 Live Spectator",
      gambling: "🎲 Gambling Arena",
      tournaments: "🏆 Championship",
      coinBalance: "Your Coins:",
      minBet: "Min: 100 coins",
      subscribeReq: "Subscribe Required",
      verifyNow: "Verify Now"
    }
  }[language] || t.en;

  const handleSectionClick = (section) => {
    if (section === 'gambling' && userCoins < 100) {
      alert(`You need at least 100 coins to enter the gambling section! You have ${userCoins} coins.`);
      return;
    }

    if (section === 'tournaments') {
      if (!userSubscriptions.youtube || !userSubscriptions.instagram) {
        setVerificationType('tournament');
        setShowVerificationModal(true);
        return;
      }
    }

    if (section === 'spectator' && !userSubscriptions.youtube) {
      setVerificationType('spectator');
      setShowVerificationModal(true);
      return;
    }

    setActiveSection(section);
  };

  return (
    <div className="multiplayer-hub-overlay">
      <div className="multiplayer-hub-container">
        <div className="hub-header">
          <h2>{t.title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="hub-stats">
          <div className="coin-display">
            <span className="coin-icon">💰</span>
            <span>{t.coinBalance} {userCoins.toLocaleString()}</span>
          </div>
          <div className="subscription-status">
            <div className={`status-badge ${userSubscriptions.youtube ? 'active' : 'inactive'}`}>
              YouTube: {userSubscriptions.youtube ? '✓' : '✗'}
            </div>
            <div className={`status-badge ${userSubscriptions.instagram ? 'active' : 'inactive'}`}>
              Instagram: {userSubscriptions.instagram ? '✓' : '✗'}
            </div>
          </div>
        </div>

        <div className="section-nav">
          <button 
            className={`nav-btn ${activeSection === 'casual' ? 'active' : ''}`}
            onClick={() => handleSectionClick('casual')}
          >
            {t.casual}
          </button>
          <button 
            className={`nav-btn ${activeSection === 'spectator' ? 'active' : ''}`}
            onClick={() => handleSectionClick('spectator')}
          >
            {t.spectator}
          </button>
          <button 
            className={`nav-btn ${activeSection === 'gambling' ? 'active' : ''}`}
            onClick={() => handleSectionClick('gambling')}
            disabled={userCoins < 100}
          >
            {t.gambling}
            {userCoins < 100 && <span className="req-badge">{t.minBet}</span>}
          </button>
          <button 
            className={`nav-btn ${activeSection === 'tournaments' ? 'active' : ''}`}
            onClick={() => handleSectionClick('tournaments')}
            disabled={!userSubscriptions.youtube || !userSubscriptions.instagram}
          >
            {t.tournaments}
            {(!userSubscriptions.youtube || !userSubscriptions.instagram) && (
              <span className="req-badge">{t.subscribeReq}</span>
            )}
          </button>
        </div>

        <div className="section-content">
          {activeSection === 'casual' && <CasualSection language={language} />}
          {activeSection === 'spectator' && <SpectatorSection language={language} isSubscribed={userSubscriptions.youtube} />}
          {activeSection === 'gambling' && <GamblingSection language={language} userCoins={userCoins} setUserCoins={setUserCoins} />}
          {activeSection === 'tournaments' && <TournamentSection language={language} userSubscriptions={userSubscriptions} />}
        </div>
      </div>
    </div>
  );
};

export default MultiplayerHub;
