import React, { useState } from 'react';
import './Leaderboard.css';
import { translations } from '../translations';

const Leaderboard = ({ language = 'en', onClose }) => {
  const [activeTab, setActiveTab] = useState('myLeague');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Trophy tier system (11 tiers with 1-2-3 subdivisions)
  const trophyTiers = [
    // Unranked (0-500)
    { name: 'Unranked', subdivision: '', minTrophies: 0, maxTrophies: 500, icon: '🔰', color: '#8B4513' },
    
    // Rookie (501-800)
    { name: 'Rookie', subdivision: 'I', minTrophies: 501, maxTrophies: 600, icon: '🥉', color: '#CD853F' },
    { name: 'Rookie', subdivision: 'II', minTrophies: 601, maxTrophies: 700, icon: '🥉', color: '#CD853F' },
    { name: 'Rookie', subdivision: 'III', minTrophies: 701, maxTrophies: 800, icon: '🥉', color: '#CD853F' },
    
    // Bronze (801-1100)
    { name: 'Bronze', subdivision: 'I', minTrophies: 801, maxTrophies: 900, icon: '🥉', color: '#CD7F32' },
    { name: 'Bronze', subdivision: 'II', minTrophies: 901, maxTrophies: 1000, icon: '🥉', color: '#CD7F32' },
    { name: 'Bronze', subdivision: 'III', minTrophies: 1001, maxTrophies: 1100, icon: '🥉', color: '#CD7F32' },
    
    // Silver (1101-1400)
    { name: 'Silver', subdivision: 'I', minTrophies: 1101, maxTrophies: 1200, icon: '🥈', color: '#C0C0C0' },
    { name: 'Silver', subdivision: 'II', minTrophies: 1201, maxTrophies: 1300, icon: '🥈', color: '#C0C0C0' },
    { name: 'Silver', subdivision: 'III', minTrophies: 1301, maxTrophies: 1400, icon: '🥈', color: '#C0C0C0' },
    
    // Gold (1401-1700)
    { name: 'Gold', subdivision: 'I', minTrophies: 1401, maxTrophies: 1500, icon: '🥇', color: '#FFD700' },
    { name: 'Gold', subdivision: 'II', minTrophies: 1501, maxTrophies: 1600, icon: '🥇', color: '#FFD700' },
    { name: 'Gold', subdivision: 'III', minTrophies: 1601, maxTrophies: 1700, icon: '🥇', color: '#FFD700' },
    
    // Crystal (1701-2000)
    { name: 'Crystal', subdivision: 'I', minTrophies: 1701, maxTrophies: 1800, icon: '💎', color: '#00FFFF' },
    { name: 'Crystal', subdivision: 'II', minTrophies: 1801, maxTrophies: 1900, icon: '💎', color: '#00FFFF' },
    { name: 'Crystal', subdivision: 'III', minTrophies: 1901, maxTrophies: 2000, icon: '💎', color: '#00FFFF' },
    
    // Master (2001-2300)
    { name: 'Master', subdivision: 'I', minTrophies: 2001, maxTrophies: 2100, icon: '👑', color: '#9932CC' },
    { name: 'Master', subdivision: 'II', minTrophies: 2101, maxTrophies: 2200, icon: '👑', color: '#9932CC' },
    { name: 'Master', subdivision: 'III', minTrophies: 2201, maxTrophies: 2300, icon: '👑', color: '#9932CC' },
    
    // Champion (2301-2600)
    { name: 'Champion', subdivision: 'I', minTrophies: 2301, maxTrophies: 2400, icon: '🏆', color: '#FF4500' },
    { name: 'Champion', subdivision: 'II', minTrophies: 2401, maxTrophies: 2500, icon: '🏆', color: '#FF4500' },
    { name: 'Champion', subdivision: 'III', minTrophies: 2501, maxTrophies: 2600, icon: '🏆', color: '#FF4500' },
    
    // Titan (2601-2900)
    { name: 'Titan', subdivision: 'I', minTrophies: 2601, maxTrophies: 2700, icon: '⚡', color: '#FF6347' },
    { name: 'Titan', subdivision: 'II', minTrophies: 2701, maxTrophies: 2800, icon: '⚡', color: '#FF6347' },
    { name: 'Titan', subdivision: 'III', minTrophies: 2801, maxTrophies: 2900, icon: '⚡', color: '#FF6347' },
    
    // Legend (2901-2999)
    { name: 'Legend', subdivision: 'I', minTrophies: 2901, maxTrophies: 2950, icon: '🌟', color: '#FF1493' },
    { name: 'Legend', subdivision: 'II', minTrophies: 2951, maxTrophies: 2999, icon: '🌟', color: '#FF1493' },
    
    // Pro (3000+)
    { name: 'Pro', subdivision: '', minTrophies: 3000, maxTrophies: 9999, icon: '⭐', color: '#FF0000' }
  ];

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'BlizzJesus', clan: 'ZooS 2', trophies: 6604, attacksWon: 159, defensesWon: 1, tier: 'Pro' },
    { rank: 2, name: 'H*S Hay-500s!', clan: 'Drunkin Monkeyz', trophies: 6436, attacksWon: 159, defensesWon: 0, tier: 'Pro' },
    { rank: 3, name: 'HedgeHog', clan: 'ZooS 2', trophies: 6331, attacksWon: 159, defensesWon: 4, tier: 'Pro' },
    { rank: 4, name: 'GameMaster', clan: 'Elite Squad', trophies: 6250, attacksWon: 145, defensesWon: 2, tier: 'Pro' },
    { rank: 5, name: 'ProPlayer', clan: 'Champions', trophies: 6180, attacksWon: 142, defensesWon: 3, tier: 'Pro' },
    { rank: 6, name: 'WarLord', clan: 'Battle Kings', trophies: 6120, attacksWon: 138, defensesWon: 1, tier: 'Pro' },
    { rank: 7, name: 'SkillMaster', clan: 'Victory', trophies: 6050, attacksWon: 135, defensesWon: 2, tier: 'Pro' },
    { rank: 8, name: 'TopGamer', clan: 'Legends', trophies: 5980, attacksWon: 132, defensesWon: 0, tier: 'Pro' }
  ];

  const currentSeason = {
    name: 'Legend League Tournament',
    subtitle: 'February 2023 Season',
    timeLeft: '8d 1h',
    previousSeason: 'January 2023 Season',
    previousWinners: [
      { rank: 1, name: '★★★★★★★', trophies: 7086 },
      { rank: 2, name: '★★★★★★★', trophies: 7081 },
      { rank: 3, name: 'E.G Jesus', trophies: 7017 }
    ]
  };

  const getTierByTrophies = (trophies) => {
    return trophyTiers.find(tier => trophies >= tier.minTrophies && trophies <= tier.maxTrophies) || trophyTiers[0];
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setShowPlayerModal(true);
  };

  const handlePlayerAction = (action, player) => {
    switch(action) {
      case 'addFriend':
        alert(`Friend request sent to ${player.name}!`);
        break;
      case 'viewProfile':
        alert(`Opening ${player.name}'s profile...`);
        break;
      case 'viewClan':
        alert(`Opening ${player.clan} clan page...`);
        break;
      case 'sendMessage':
        alert(`Opening message to ${player.name}...`);
        break;
      default:
        break;
    }
    setShowPlayerModal(false);
  };

  const renderMyLeague = () => (
    <div className="leaderboard-content">
      {/* Trophy Tiers */}
      <div className="trophy-tiers">
        <h3>Trophy Leagues</h3>
        <div className="tiers-grid">
          {trophyTiers.map((tier, index) => (
            <div key={index} className="tier-item" style={{ borderColor: tier.color }}>
              <span className="tier-icon">{tier.icon}</span>
              <div className="tier-info">
                <div className="tier-name" style={{ color: tier.color }}>
                  {tier.name} {tier.subdivision}
                </div>
                <div className="tier-range">
                  {tier.minTrophies} - {tier.maxTrophies === 9999 ? '∞' : tier.maxTrophies} 🏆
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Season Tournament */}
      <div className="tournament-section">
        <div className="tournament-header">
          <div className="tournament-trophy">🏆</div>
          <div className="tournament-info">
            <h3>{currentSeason.name}</h3>
            <p>{currentSeason.subtitle}</p>
            <p className="time-left">Ends in: {currentSeason.timeLeft}</p>
          </div>
        </div>
        
        <div className="previous-season">
          <h4>Previous: {currentSeason.previousSeason}</h4>
          {currentSeason.previousWinners.map((winner, index) => (
            <div key={index} className="previous-winner">
              <span className="winner-rank">{winner.rank})</span>
              <span className="winner-name">{winner.name}</span>
              <span className="winner-trophies">🏆 {winner.trophies}</span>
            </div>
          ))}
          <button className="more-info-btn">⋯</button>
        </div>
      </div>
    </div>
  );

  const renderTopPlayers = () => (
    <div className="leaderboard-content">
      <div className="region-selector">
        <button 
          className={`region-btn ${selectedRegion === 'global' ? 'active' : ''}`}
          onClick={() => setSelectedRegion('global')}
        >
          🌍 Global
        </button>
        <button 
          className={`region-btn ${selectedRegion === 'local' ? 'active' : ''}`}
          onClick={() => setSelectedRegion('local')}
        >
          🇺🇸 Local: US
        </button>
      </div>

      <div className="players-list">
        {leaderboardData.map((player, index) => {
          const tier = getTierByTrophies(player.trophies);
          return (
            <div key={index} className="player-item">
              <div className="player-rank">
                <span className="rank-number">{player.rank}.</span>
                <span className="rank-change">
                  {index < 3 ? '▲' : index === 3 ? '=' : '▼'}
                  {index + 1}
                </span>
              </div>
              
              <div className="player-tier">
                <span className="tier-icon" style={{ color: tier.color }}>{tier.icon}</span>
                <span className="tier-badge" style={{ backgroundColor: tier.color }}>240</span>
              </div>
              
              <div className="player-info">
                <div 
                  className="player-name clickable" 
                  onClick={() => handlePlayerClick(player)}
                >
                  {player.name}
                </div>
                <div className="player-clan">🏴 {player.clan}</div>
              </div>
              
              <div className="player-stats">
                <div className="stat-item">
                  <span className="stat-label">Attacks Won:</span>
                  <span className="stat-value">{player.attacksWon}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Defenses Won:</span>
                  <span className="stat-value">{player.defensesWon}</span>
                </div>
              </div>
              
              <div className="player-trophies">
                <span className="trophy-count">{player.trophies}</span>
                <span className="trophy-icon">🏆</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTopClans = () => (
    <div className="leaderboard-content">
      <div className="coming-soon">
        <h3>Top Clans</h3>
        <p>Clan rankings coming soon!</p>
      </div>
    </div>
  );

  const renderClanWarLeague = () => (
    <div className="leaderboard-content">
      <div className="coming-soon">
        <h3>Clan War League</h3>
        <p>Clan war rankings coming soon!</p>
      </div>
    </div>
  );

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-modal">
        <div className="leaderboard-header">
          <div className="leaderboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'myLeague' ? 'active' : ''}`}
              onClick={() => setActiveTab('myLeague')}
            >
              My League
            </button>
            <button 
              className={`tab-btn ${activeTab === 'topClans' ? 'active' : ''}`}
              onClick={() => setActiveTab('topClans')}
            >
              Top Clans
            </button>
            <button 
              className={`tab-btn ${activeTab === 'topPlayers' ? 'active' : ''}`}
              onClick={() => setActiveTab('topPlayers')}
            >
              Top Players
            </button>
            <button 
              className={`tab-btn ${activeTab === 'clanWarLeague' ? 'active' : ''}`}
              onClick={() => setActiveTab('clanWarLeague')}
            >
              Clan War League
            </button>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="leaderboard-body">
          {activeTab === 'myLeague' && renderMyLeague()}
          {activeTab === 'topPlayers' && renderTopPlayers()}
          {activeTab === 'topClans' && renderTopClans()}
          {activeTab === 'clanWarLeague' && renderClanWarLeague()}
        </div>
      </div>

      {/* Player Interaction Modal */}
      {showPlayerModal && selectedPlayer && (
        <div className="player-modal-overlay" onClick={() => setShowPlayerModal(false)}>
          <div className="player-modal" onClick={(e) => e.stopPropagation()}>
            <div className="player-modal-header">
              <div className="player-modal-info">
                <div className="player-modal-avatar">
                  {getTierByTrophies(selectedPlayer.trophies).icon}
                </div>
                <div className="player-modal-details">
                  <h3 className="player-modal-name">{selectedPlayer.name}</h3>
                  <p className="player-modal-clan">🏴 {selectedPlayer.clan}</p>
                  <p className="player-modal-trophies">🏆 {selectedPlayer.trophies} Trophies</p>
                  <p className="player-modal-tier">
                    {getTierByTrophies(selectedPlayer.trophies).name} {getTierByTrophies(selectedPlayer.trophies).subdivision}
                  </p>
                </div>
              </div>
              <button 
                className="player-modal-close" 
                onClick={() => setShowPlayerModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="player-modal-stats">
              <div className="stat-box">
                <span className="stat-number">{selectedPlayer.attacksWon}</span>
                <span className="stat-label">Attacks Won</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{selectedPlayer.defensesWon}</span>
                <span className="stat-label">Defenses Won</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">#{selectedPlayer.rank}</span>
                <span className="stat-label">Global Rank</span>
              </div>
            </div>

            <div className="player-modal-actions">
              <button 
                className="action-btn add-friend-btn"
                onClick={() => handlePlayerAction('addFriend', selectedPlayer)}
              >
                <span className="action-icon">👥</span>
                <span className="action-text">Add Friend</span>
              </button>
              
              <button 
                className="action-btn view-profile-btn"
                onClick={() => handlePlayerAction('viewProfile', selectedPlayer)}
              >
                <span className="action-icon">👤</span>
                <span className="action-text">View Profile</span>
              </button>
              
              <button 
                className="action-btn view-clan-btn"
                onClick={() => handlePlayerAction('viewClan', selectedPlayer)}
              >
                <span className="action-icon">🏴</span>
                <span className="action-text">View Clan</span>
              </button>
              
              <button 
                className="action-btn send-message-btn"
                onClick={() => handlePlayerAction('sendMessage', selectedPlayer)}
              >
                <span className="action-icon">💬</span>
                <span className="action-text">Send Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

