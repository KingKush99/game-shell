import React, { useState, useEffect } from 'react';
import './ThemesModal.css';
import { translations } from '../translations';

const ThemesModal = ({ language = 'en', onClose }) => {
  const [activeTab, setActiveTab] = useState('mainMenu');
  const [selectedThemes, setSelectedThemes] = useState({
    mainMenu: localStorage.getItem('mainMenuTheme') || 'default',
    inGame: localStorage.getItem('inGameTheme') || 'default',
    profile: localStorage.getItem('profileTheme') || 'default'
  });

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const tabs = [
    { id: 'mainMenu', name: 'Main Menu', icon: '🏠' },
    { id: 'inGame', name: 'In Game', icon: '🎮' },
    { id: 'profile', name: 'Profile', icon: '👤' }
  ];

  const themes = {
    mainMenu: [
      {
        id: 'default',
        name: 'Classic Blue',
        description: 'The original GameShell experience with blue gradients',
        preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        isPremium: false
      },
      {
        id: 'dark',
        name: 'Midnight Dark',
        description: 'Sleek dark theme perfect for night gaming',
        preview: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        isPremium: false
      },
      {
        id: 'neon',
        name: 'Neon Cyber',
        description: 'Futuristic neon theme with electric colors',
        preview: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
        isPremium: true
      },
      {
        id: 'forest',
        name: 'Forest Green',
        description: 'Natural green theme inspired by nature',
        preview: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
        isPremium: false
      },
      {
        id: 'sunset',
        name: 'Sunset Orange',
        description: 'Warm sunset colors for a cozy feel',
        preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        isPremium: true
      },
      {
        id: 'ocean',
        name: 'Ocean Blue',
        description: 'Deep ocean blues for a calming experience',
        preview: 'linear-gradient(135deg, #667db6 0%, #0082c8 100%)',
        isPremium: false
      }
    ],
    inGame: [
      {
        id: 'default',
        name: 'Standard Game',
        description: 'Balanced colors optimized for gameplay',
        preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        isPremium: false
      },
      {
        id: 'highContrast',
        name: 'High Contrast',
        description: 'Enhanced visibility for competitive play',
        preview: 'linear-gradient(135deg, #000000 0%, #ffffff 100%)',
        isPremium: false
      },
      {
        id: 'retro',
        name: 'Retro Arcade',
        description: 'Classic arcade machine aesthetics',
        preview: 'linear-gradient(135deg, #ff0099 0%, #493240 100%)',
        isPremium: true
      },
      {
        id: 'minimal',
        name: 'Minimal Clean',
        description: 'Clean and distraction-free interface',
        preview: 'linear-gradient(135deg, #f7f7f7 0%, #e3e3e3 100%)',
        isPremium: false
      },
      {
        id: 'gaming',
        name: 'Gaming RGB',
        description: 'RGB lighting effects for gaming setups',
        preview: 'linear-gradient(135deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
        isPremium: true
      },
      {
        id: 'space',
        name: 'Space Theme',
        description: 'Cosmic colors for space exploration',
        preview: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        isPremium: true
      }
    ],
    profile: [
      {
        id: 'default',
        name: 'Professional',
        description: 'Clean professional look for your profile',
        preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        isPremium: false
      },
      {
        id: 'elegant',
        name: 'Elegant Gold',
        description: 'Luxurious gold accents for VIP feel',
        preview: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        isPremium: true
      },
      {
        id: 'modern',
        name: 'Modern Gradient',
        description: 'Contemporary design with smooth gradients',
        preview: 'linear-gradient(135deg, #667db6 0%, #0082c8 100%)',
        isPremium: false
      },
      {
        id: 'artistic',
        name: 'Artistic Flair',
        description: 'Creative theme for artistic personalities',
        preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        isPremium: true
      },
      {
        id: 'tech',
        name: 'Tech Savvy',
        description: 'High-tech theme for tech enthusiasts',
        preview: 'linear-gradient(135deg, #0f0f23 0%, #262626 100%)',
        isPremium: false
      },
      {
        id: 'rainbow',
        name: 'Rainbow Pride',
        description: 'Colorful rainbow theme for self-expression',
        preview: 'linear-gradient(135deg, #ff0000 0%, #ff7f00 16%, #ffff00 33%, #00ff00 50%, #0000ff 66%, #4b0082 83%, #9400d3 100%)',
        isPremium: true
      }
    ]
  };

  const handleThemeSelect = (themeId) => {
    const newSelectedThemes = {
      ...selectedThemes,
      [activeTab]: themeId
    };
    setSelectedThemes(newSelectedThemes);
    localStorage.setItem(`${activeTab}Theme`, themeId);
    
    // Apply theme immediately (in a real app, this would update the global theme)
    console.log(`Applied ${activeTab} theme:`, themeId);
  };

  const renderThemeCard = (theme) => (
    <div 
      key={theme.id} 
      className={`theme-card ${selectedThemes[activeTab] === theme.id ? 'selected' : ''}`}
      onClick={() => handleThemeSelect(theme.id)}
    >
      <div className="theme-preview" style={{ background: theme.preview }}>
        {theme.isPremium && <div className="premium-badge">💎</div>}
        {selectedThemes[activeTab] === theme.id && <div className="selected-badge">✓</div>}
      </div>
      <div className="theme-info">
        <h3 className="theme-name">{theme.name}</h3>
        <p className="theme-description">{theme.description}</p>
        <div className="theme-actions">
          {theme.isPremium ? (
            <button className="premium-btn" disabled>
              💎 Premium
            </button>
          ) : (
            <button className="apply-btn">
              {selectedThemes[activeTab] === theme.id ? 'Applied' : 'Apply'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="themes-modal-overlay">
      <div className="themes-modal">
        <div className="themes-modal-header">
          <div className="header-left">
            <h2>🎨 Themes & Customization</h2>
            <p>Personalize your gaming experience</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="themes-modal-body">
          {/* Tab Navigation */}
          <div className="tabs-section">
            <div className="tabs-list">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-name">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Content */}
          <div className="themes-content">
            <div className="section-header">
              <h3>{tabs.find(t => t.id === activeTab)?.name} Themes</h3>
              <div className="theme-stats">
                <span>{themes[activeTab].length} themes available</span>
                <span>•</span>
                <span>{themes[activeTab].filter(t => !t.isPremium).length} free</span>
                <span>•</span>
                <span>{themes[activeTab].filter(t => t.isPremium).length} premium</span>
              </div>
            </div>

            <div className="themes-grid">
              {themes[activeTab].map(theme => renderThemeCard(theme))}
            </div>
          </div>

          {/* Premium Upgrade */}
          <div className="premium-section">
            <div className="premium-card">
              <div className="premium-icon">💎</div>
              <div className="premium-content">
                <h3>Unlock Premium Themes</h3>
                <p>Get access to exclusive themes and customization options</p>
                <button className="upgrade-btn">⬆️ Upgrade Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesModal;

