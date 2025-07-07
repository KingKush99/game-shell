import React, { useState, useEffect } from 'react';
import './SettingsModal.css';

const SettingsModal = ({ language = 'en', onClose }) => {
  const [settings, setSettings] = useState({
    // Audio Settings
    masterVolume: 75,
    musicVolume: 60,
    soundEffectsVolume: 80,
    voiceVolume: 70,
    muteAll: false,
    
    // Video Settings
    resolution: '1920x1080',
    fullscreen: false,
    vsync: true,
    frameRate: '60',
    graphicsQuality: 'high',
    
    // Gameplay Settings
    difficulty: 'normal',
    autoSave: true,
    showTutorials: true,
    showHints: true,
    fastAnimations: false,
    
    // Interface Settings
    language: language,
    showFPS: false,
    showPing: false,
    chatFilter: true,
    notifications: true,
    
    // Controls Settings
    mousesensitivity: 50,
    keyboardLayout: 'qwerty',
    invertMouse: false,
    
    // Privacy Settings
    shareStats: true,
    allowFriendRequests: true,
    showOnlineStatus: true
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('gameSettings', JSON.stringify(newSettings));
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      masterVolume: 75,
      musicVolume: 60,
      soundEffectsVolume: 80,
      voiceVolume: 70,
      muteAll: false,
      resolution: '1920x1080',
      fullscreen: false,
      vsync: true,
      frameRate: '60',
      graphicsQuality: 'high',
      difficulty: 'normal',
      autoSave: true,
      showTutorials: true,
      showHints: true,
      fastAnimations: false,
      language: 'en',
      showFPS: false,
      showPing: false,
      chatFilter: true,
      notifications: true,
      mousesensitivity: 50,
      keyboardLayout: 'qwerty',
      invertMouse: false,
      shareStats: true,
      allowFriendRequests: true,
      showOnlineStatus: true
    };
    setSettings(defaultSettings);
    localStorage.setItem('gameSettings', JSON.stringify(defaultSettings));
  };

  const [activeTab, setActiveTab] = useState('audio');

  const tabs = [
    { id: 'audio', label: '🔊 Audio', icon: '🔊' },
    { id: 'video', label: '📺 Video', icon: '📺' },
    { id: 'gameplay', label: '🎮 Gameplay', icon: '🎮' },
    { id: 'interface', label: '🖥️ Interface', icon: '🖥️' },
    { id: 'controls', label: '⌨️ Controls', icon: '⌨️' },
    { id: 'privacy', label: '🔒 Privacy', icon: '🔒' }
  ];

  const renderSlider = (key, label, min = 0, max = 100, step = 1) => (
    <div className="setting-item">
      <label className="setting-label">
        {label}
        <span className="setting-value">{settings[key]}{max === 100 ? '%' : ''}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={settings[key]}
        onChange={(e) => handleSettingChange(key, parseInt(e.target.value))}
        className="setting-slider"
      />
    </div>
  );

  const renderSelect = (key, label, options) => (
    <div className="setting-item">
      <label className="setting-label">{label}</label>
      <select
        value={settings[key]}
        onChange={(e) => handleSettingChange(key, e.target.value)}
        className="setting-select"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderToggle = (key, label, description = '') => (
    <div className="setting-item">
      <div className="setting-toggle-container">
        <div>
          <label className="setting-label">{label}</label>
          {description && <p className="setting-description">{description}</p>}
        </div>
        <label className="setting-toggle">
          <input
            type="checkbox"
            checked={settings[key]}
            onChange={(e) => handleSettingChange(key, e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'audio':
        return (
          <div className="settings-tab-content">
            <h3>Audio Settings</h3>
            {renderToggle('muteAll', 'Mute All Audio', 'Disable all game sounds')}
            {renderSlider('masterVolume', 'Master Volume')}
            {renderSlider('musicVolume', 'Music Volume')}
            {renderSlider('soundEffectsVolume', 'Sound Effects Volume')}
            {renderSlider('voiceVolume', 'Voice Volume')}
          </div>
        );
      
      case 'video':
        return (
          <div className="settings-tab-content">
            <h3>Video Settings</h3>
            {renderSelect('resolution', 'Resolution', [
              { value: '1280x720', label: '1280x720 (HD)' },
              { value: '1920x1080', label: '1920x1080 (Full HD)' },
              { value: '2560x1440', label: '2560x1440 (2K)' },
              { value: '3840x2160', label: '3840x2160 (4K)' }
            ])}
            {renderSelect('graphicsQuality', 'Graphics Quality', [
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'ultra', label: 'Ultra' }
            ])}
            {renderSelect('frameRate', 'Frame Rate', [
              { value: '30', label: '30 FPS' },
              { value: '60', label: '60 FPS' },
              { value: '120', label: '120 FPS' },
              { value: 'unlimited', label: 'Unlimited' }
            ])}
            {renderToggle('fullscreen', 'Fullscreen Mode')}
            {renderToggle('vsync', 'Vertical Sync (VSync)')}
          </div>
        );
      
      case 'gameplay':
        return (
          <div className="settings-tab-content">
            <h3>Gameplay Settings</h3>
            {renderSelect('difficulty', 'Difficulty Level', [
              { value: 'easy', label: 'Easy' },
              { value: 'normal', label: 'Normal' },
              { value: 'hard', label: 'Hard' },
              { value: 'expert', label: 'Expert' }
            ])}
            {renderToggle('autoSave', 'Auto Save', 'Automatically save game progress')}
            {renderToggle('showTutorials', 'Show Tutorials', 'Display tutorial messages for new features')}
            {renderToggle('showHints', 'Show Hints', 'Display helpful hints during gameplay')}
            {renderToggle('fastAnimations', 'Fast Animations', 'Speed up game animations')}
          </div>
        );
      
      case 'interface':
        return (
          <div className="settings-tab-content">
            <h3>Interface Settings</h3>
            {renderSelect('language', 'Language', [
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
              { value: 'fr', label: 'Français' },
              { value: 'de', label: 'Deutsch' },
              { value: 'it', label: 'Italiano' },
              { value: 'pt', label: 'Português' },
              { value: 'ru', label: 'Русский' },
              { value: 'zh', label: '中文' },
              { value: 'ja', label: '日本語' },
              { value: 'ko', label: '한국어' }
            ])}
            {renderToggle('showFPS', 'Show FPS Counter', 'Display frames per second')}
            {renderToggle('showPing', 'Show Ping', 'Display network latency')}
            {renderToggle('chatFilter', 'Chat Filter', 'Filter inappropriate language in chat')}
            {renderToggle('notifications', 'Enable Notifications', 'Show game notifications')}
          </div>
        );
      
      case 'controls':
        return (
          <div className="settings-tab-content">
            <h3>Controls Settings</h3>
            {renderSlider('mousesensitivity', 'Mouse Sensitivity', 1, 100)}
            {renderSelect('keyboardLayout', 'Keyboard Layout', [
              { value: 'qwerty', label: 'QWERTY' },
              { value: 'azerty', label: 'AZERTY' },
              { value: 'qwertz', label: 'QWERTZ' },
              { value: 'dvorak', label: 'Dvorak' }
            ])}
            {renderToggle('invertMouse', 'Invert Mouse Y-Axis', 'Reverse vertical mouse movement')}
          </div>
        );
      
      case 'privacy':
        return (
          <div className="settings-tab-content">
            <h3>Privacy Settings</h3>
            {renderToggle('shareStats', 'Share Statistics', 'Allow sharing of gameplay statistics')}
            {renderToggle('allowFriendRequests', 'Allow Friend Requests', 'Let other players send friend requests')}
            {renderToggle('showOnlineStatus', 'Show Online Status', 'Display when you are online to friends')}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button onClick={onClose} className="close-button">✕</button>
        </div>
        
        <div className="settings-content">
          <div className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label.split(' ')[1]}</span>
              </button>
            ))}
          </div>
          
          <div className="settings-panel">
            {renderTabContent()}
          </div>
        </div>
        
        <div className="settings-footer">
          <button onClick={resetToDefaults} className="reset-button">
            🔄 Reset to Defaults
          </button>
          <button onClick={onClose} className="apply-button">
            ✅ Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

