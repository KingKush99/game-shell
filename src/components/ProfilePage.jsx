import React, { useState } from 'react';
import './ProfilePage.css';
import { translations } from '../translations';

const ProfilePage = ({ language = 'en', onClose }) => {
  const [activeMainTab, setActiveMainTab] = useState("customization");
  const [activeSubTab, setActiveSubTab] = useState('stats');
  const [showSettings, setShowSettings] = useState(false);
  const [followersDropdown, setFollowersDropdown] = useState('followers');
  const [characterRotation, setCharacterRotation] = useState(0);
  const [characterZoom, setCharacterZoom] = useState(1);
  const [characterPose, setCharacterPose] = useState(0);
  
  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const rotateCharacter = () => {
    setCharacterRotation(prev => prev + 90);
  };

  const zoomCharacter = () => {
    setCharacterZoom(prev => prev === 1 ? 1.2 : prev === 1.2 ? 0.8 : 1);
  };

  const changePose = () => {
    setCharacterPose(prev => (prev + 1) % 3);
  };

  const getPoseEmojis = () => {
    const poses = [
      { head: '😊', torso: '👔', legs: '👖', feet: '👟' },
      { head: '😎', torso: '🏃‍♂️', legs: '🦵', feet: '👟' },
      { head: '🤔', torso: '🤸‍♂️', legs: '🦵', feet: '👟' }
    ];
    return poses[characterPose];
  };

  // Mock user data
  const userData = {
    profilePhoto: '👤',
    username: 'Player123',
    level: 12,
    currentXP: 26674969,
    totalXPForNextLevel: 39000000,
    followers: 1250,
    following: 890,
    friends: 156,
    novaCoinBalance: 2847.50
  };

  const calculateXPForLevel = (level) => {
    let totalXP = 0;
    for (let i = 1; i <= level; i++) {
      totalXP += i * 1000;
    }
    return totalXP;
  };

  const getXPProgress = () => {
    const currentLevelXP = calculateXPForLevel(userData.level);
    const nextLevelXP = calculateXPForLevel(userData.level + 1);
    const progressXP = userData.currentXP - currentLevelXP;
    const neededXP = nextLevelXP - currentLevelXP;
    return {
      current: progressXP,
      needed: neededXP,
      percentage: (progressXP / neededXP) * 100
    };
  };

  const xpProgress = getXPProgress();

  return (
    <div className="profile-page">
      {/* Top Navigation */}
      <div className="profile-header">
        <button className="back-button" onClick={onClose}>
          ←
        </button>
        
        <div className="profile-photo-container">
          <div className="profile-photo">
            {userData.profilePhoto}
          </div>
          <button className="edit-photo-btn">✏️</button>
        </div>
        
        <button className="settings-button" onClick={() => setShowSettings(true)}>
          ⚙️
        </button>
      </div>

      {/* Followers/Following/Friends Dropdowns with Search */}
      <div className="social-stats">
        <div className="social-stats-row">
          <div className="social-dropdown-container">
            <select className="social-dropdown">
              <option value="">{userData.followers} {t('followers')}</option>
              <option value="user1">@john_doe</option>
              <option value="user2">@jane_smith</option>
              <option value="user3">@gamer_pro</option>
            </select>
          </div>
          <div className="social-dropdown-container">
            <select className="social-dropdown">
              <option value="">{userData.following} {t('following')}</option>
              <option value="user4">@streamer_king</option>
              <option value="user5">@pro_player</option>
              <option value="user6">@game_master</option>
            </select>
          </div>
          <div className="social-dropdown-container">
            <select className="social-dropdown">
              <option value="">{userData.friends} {t('friends')}</option>
              <option value="user7">@best_friend</option>
              <option value="user8">@teammate_1</option>
              <option value="user9">@guild_leader</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header Tabs */}
      <div className="main-tabs">
        <button 
          className={`main-tab ${activeMainTab === 'customization' ? 'active' : ''}`}
          onClick={() => setActiveMainTab("customization")}
        >
          {t('customization')}
        </button>
        <button 
          className={`main-tab ${activeMainTab === 'nfts' ? 'active' : ''}`}
          onClick={() => setActiveMainTab("nfts")}
        >
          {t('nfts')}
        </button>
        <button 
          className={`main-tab ${activeMainTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveMainTab("social")}
        >
          📤 {t('share')}
        </button>
        <button className="user-search-btn" title={t('searchUsers')}>
          🔍
        </button>
      </div>

      {/* Full-Body 3D Character Area */}
      <div className="character-container">
        <div className="character-placeholder-fullbody">
          <div 
            className="character-avatar-fullbody"
            style={{
              transform: `rotate(${characterRotation}deg) scale(${characterZoom})`,
              transition: 'transform 0.5s ease'
            }}
          >
            <img 
              src="/character.png" 
              alt="Character" 
              className="character-image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: characterPose === 1 ? 'none' : characterPose === 2 ? 'hue-rotate(30deg)' : 'hue-rotate(60deg)'
              }}
            />
          </div>
        </div>
        
        <div className="character-controls">
          <button className="rotate-btn" title="Rotate Character" onClick={rotateCharacter}>↻</button>
          <button className="zoom-btn" title="Zoom" onClick={zoomCharacter}>🔍</button>
          <button className="pose-btn" title="Change Pose" onClick={changePose}>🤸</button>
        </div>
      </div>

      {/* Sub Header Tabs */}
      <div className="sub-tabs">
        <button 
          className={`sub-tab ${activeSubTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('stats')}
        >
          {t('stats')}
        </button>
        <button 
          className={`sub-tab ${activeSubTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('items')}
        >
          {t('items')}
        </button>
        <button 
          className={`sub-tab ${activeSubTab === 'campaign' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('campaign')}
        >
          {t('campaign')}
        </button>
        <button 
          className={`sub-tab ${activeSubTab === 'cashOut' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('cashOut')}
        >
          {t('cashOut')}
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {activeSubTab === 'stats' && (
          <div className="stats-content">
            <h3>{t('experienceStats')}</h3>
            <div className="stat-item">
              <span>{t('singlePlayer')}:</span>
              <span>15,420 XP</span>
            </div>
            <div className="stat-item">
              <span>{t('multiplayer')}:</span>
              <span>8,750 XP</span>
            </div>
            <div className="stat-item">
              <span>{t('crypto')}:</span>
              <span>2,504 XP</span>
            </div>
            <div className="stat-item">
              <span>{t('teamMode')}:</span>
              <span>890 XP</span>
            </div>
            <div className="stat-item">
              <span>{t('campaign')}:</span>
              <span>12,110 XP</span>
            </div>
          </div>
        )}

        {activeSubTab === 'items' && (
          <div className="items-content">
            <h3>{t('inventory')}</h3>
            <div className="item-categories">
              <div className="item-category">
                <h4>{t('backpack')}</h4>
                <div className="item-grid">
                  <div className="item-slot">🎒</div>
                  <div className="item-slot">⚔️</div>
                  <div className="item-slot">🛡️</div>
                </div>
              </div>
              <div className="item-category">
                <h4>{t('accessories')}</h4>
                <div className="item-grid">
                  <div className="item-slot">👑</div>
                  <div className="item-slot">👓</div>
                  <div className="item-slot">⌚</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'campaign' && (
          <div className="campaign-content">
            <h3>{t('campaignProgress')}</h3>
            <div className="campaign-map">
              <div className="chapter completed">Chapter 1 ✓</div>
              <div className="chapter completed">Chapter 2 ✓</div>
              <div className="chapter current">Chapter 3 ⭐</div>
              <div className="chapter locked">Chapter 4 🔒</div>
            </div>
          </div>
        )}

        {activeSubTab === 'cashOut' && (
          <div className="cashout-content">
            <h3>{t('novaCoinBalance')}</h3>
            <div className="balance-display">
              <span className="balance-amount">{userData.novaCoinBalance.toFixed(2)} NC</span>
            </div>
            <button className="withdraw-btn">{t('withdraw')}</button>
            <div className="transaction-history">
              <h4>{t('recentTransactions')}</h4>
              <div className="transaction">+150.00 NC - {t('gameWin')}</div>
              <div className="transaction">-50.00 NC - {t('purchase')}</div>
            </div>
          </div>
        )}
      </div>

      {/* XP Level Bar - Moved to Bottom */}
      <div className="xp-container-bottom">
        <div className="level-info">
          <span className="level-text">{t('level')} {userData.level}</span>
          <span className="xp-text">
            {userData.currentXP.toLocaleString()} / {userData.totalXPForNextLevel.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-bar">
          <div 
            className="xp-progress" 
            style={{ width: `${xpProgress.percentage}%` }}
          ></div>
        </div>
        <div className="xp-tooltip">
          {t('progress')}: {xpProgress.current.toLocaleString()} / {xpProgress.needed.toLocaleString()} XP
        </div>
      </div>

      {/* Sticky Back Button */}
      <div className="sticky-back">
        <button className="back-to-menu" onClick={onClose}>
          {t('backToMainMenu')}
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="settings-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{t('settings')}</h3>
              <button className="close-modal" onClick={() => setShowSettings(false)}>×</button>
            </div>
            <div className="settings-options">
              <div className="setting-item">
                <span>{t('sound')}</span>
                <input type="range" min="0" max="100" defaultValue="75" />
              </div>
              <div className="setting-item">
                <span>{t('language')}</span>
                <select defaultValue={language}>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div className="setting-item">
                <span>{t('theme')}</span>
                <select>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

