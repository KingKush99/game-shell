import React, { useState, useEffect, useRef } from 'react';
import './MultiplayerLobby.css';

const MultiplayerLobby = ({ language = 'en', onClose, onJoinGame }) => {
  const [activeTab, setActiveTab] = useState('casual');
  const [currentTip, setCurrentTip] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [badWordFilter, setBadWordFilter] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const chatContainerRef = useRef(null);

  const gameTips = [
    "💡 Tip: Practice your timing in single-player mode before joining competitive matches!",
    "🎯 Tip: Watch your opponents' patterns to predict their next moves.",
    "⚡ Tip: Quick reflexes are important, but strategy wins games!",
    "🏆 Tip: Completing daily challenges gives bonus XP and coins.",
    "🎮 Tip: Different game modes require different strategies - adapt your playstyle!",
    "💰 Tip: Save your coins for important matches and premium upgrades.",
    "🔥 Tip: Consistency beats flashy plays - focus on steady improvement.",
    "🎪 Tip: Join tournaments to test your skills against the best players!",
    "📈 Tip: Review your match history to identify areas for improvement.",
    "🌟 Tip: Team up with friends for better coordination in team modes!"
  ];

  const badWords = ['badword1', 'badword2', 'inappropriate', 'spam'];

  const sampleChatMessages = [
    { id: 1, user: 'ProGamer2024', message: 'Anyone up for a quick match?', timestamp: Date.now() - 300000, isSystem: false },
    { id: 2, user: 'SkillMaster', message: 'Looking for competitive players only!', timestamp: Date.now() - 240000, isSystem: false },
    { id: 3, user: 'System', message: 'Tournament starting in 15 minutes!', timestamp: Date.now() - 180000, isSystem: true },
    { id: 4, user: 'CasualPlayer', message: 'New to the game, any tips?', timestamp: Date.now() - 120000, isSystem: false },
    { id: 5, user: 'VeteranGamer', message: 'Practice makes perfect! Keep playing!', timestamp: Date.now() - 60000, isSystem: false }
  ];

  useEffect(() => {
    // Initialize chat with sample messages
    setChatMessages(sampleChatMessages);

    // Loading simulation
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Game tips rotation
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % gameTips.length);
    }, 5000);

    // Simulate incoming chat messages
    const chatInterval = setInterval(() => {
      const randomMessages = [
        { user: 'Player' + Math.floor(Math.random() * 1000), message: 'GG everyone!', isSystem: false },
        { user: 'Competitor', message: 'Ready for the next round!', isSystem: false },
        { user: 'Newbie', message: 'How do I join a game?', isSystem: false },
        { user: 'Expert', message: 'Check out my latest strategy guide!', isSystem: false }
      ];
      
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const newMessage = {
        id: Date.now(),
        ...randomMessage,
        timestamp: Date.now()
      };
      
      setChatMessages(prev => [...prev.slice(-20), newMessage]); // Keep last 20 messages
    }, 8000);

    return () => {
      clearInterval(loadingInterval);
      clearInterval(tipInterval);
      clearInterval(chatInterval);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll chat to bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const filterMessage = (message) => {
    if (!badWordFilter) return message;
    
    let filteredMessage = message;
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredMessage = filteredMessage.replace(regex, '*'.repeat(word.length));
    });
    return filteredMessage;
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        message: chatInput.trim(),
        timestamp: Date.now(),
        isSystem: false
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    {
      id: 'spectator',
      name: 'Spectator',
      icon: '👁️',
      description: 'Watch live tournaments and competitive matches',
      disabled: false
    },
    {
      id: 'casual',
      name: 'Casual',
      icon: '🎮',
      description: 'Non-ranked, free-to-play matches for fun',
      disabled: false
    },
    {
      id: 'competitive',
      name: 'Competitive',
      icon: '🏆',
      description: 'Ranked matches with coin entry fees and rewards',
      disabled: false
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'spectator':
        return (
          <div className="tab-content">
            <h3>🏟️ Tournament Spectator Mode</h3>
            <div className="spectator-matches">
              <div className="match-card">
                <div className="match-header">
                  <span className="match-title">Championship Finals</span>
                  <span className="live-indicator">🔴 LIVE</span>
                </div>
                <div className="match-players">
                  <span className="player">ProGamer2024</span>
                  <span className="vs">VS</span>
                  <span className="player">SkillMaster</span>
                </div>
                <div className="match-viewers">👥 1,247 viewers</div>
                <button className="watch-button">Watch Match</button>
              </div>
              
              <div className="match-card">
                <div className="match-header">
                  <span className="match-title">Semi-Final Round</span>
                  <span className="upcoming-indicator">⏰ Starting Soon</span>
                </div>
                <div className="match-players">
                  <span className="player">VeteranGamer</span>
                  <span className="vs">VS</span>
                  <span className="player">RisingStarr</span>
                </div>
                <div className="match-viewers">⏱️ Starts in 5 minutes</div>
                <button className="watch-button" disabled>Wait for Start</button>
              </div>
            </div>
          </div>
        );
      
      case 'casual':
        return (
          <div className="tab-content">
            <h3>🎮 Casual Matches</h3>
            <div className="game-modes">
              <div className="mode-card">
                <div className="mode-icon">⚡</div>
                <div className="mode-info">
                  <h4>Quick Match</h4>
                  <p>Jump into a fast-paced game instantly</p>
                  <div className="mode-stats">
                    <span>👥 24 players waiting</span>
                    <span>⏱️ ~30 seconds</span>
                  </div>
                </div>
                <button className="join-button" onClick={() => onJoinGame('quick-casual')}>
                  Join Now
                </button>
              </div>
              
              <div className="mode-card">
                <div className="mode-icon">🎯</div>
                <div className="mode-info">
                  <h4>Practice Mode</h4>
                  <p>Warm up with AI opponents</p>
                  <div className="mode-stats">
                    <span>🤖 AI Opponents</span>
                    <span>⏱️ Instant</span>
                  </div>
                </div>
                <button className="join-button" onClick={() => onJoinGame('practice')}>
                  Practice
                </button>
              </div>
              
              <div className="mode-card">
                <div className="mode-icon">👥</div>
                <div className="mode-info">
                  <h4>Team Match</h4>
                  <p>Play with friends in team mode</p>
                  <div className="mode-stats">
                    <span>👥 8 teams forming</span>
                    <span>⏱️ ~2 minutes</span>
                  </div>
                </div>
                <button className="join-button" onClick={() => onJoinGame('team-casual')}>
                  Join Team
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'competitive':
        return (
          <div className="tab-content">
            <h3>🏆 Competitive Matches</h3>
            <div className="competitive-warning">
              <div className="warning-icon">⚠️</div>
              <div className="warning-text">
                <strong>Competitive Mode</strong>
                <p>Entry fees required • Ranked matches • Skill-based matchmaking</p>
              </div>
            </div>
            
            <div className="game-modes">
              <div className="mode-card competitive">
                <div className="mode-icon">💰</div>
                <div className="mode-info">
                  <h4>Bronze League</h4>
                  <p>Entry: 🪙100 • Winner: 🪙300</p>
                  <div className="mode-stats">
                    <span>🏆 Bronze Tier</span>
                    <span>👥 16 players</span>
                  </div>
                </div>
                <button className="join-button competitive" onClick={() => onJoinGame('bronze-comp')}>
                  Enter (🪙100)
                </button>
              </div>
              
              <div className="mode-card competitive">
                <div className="mode-icon">🥈</div>
                <div className="mode-info">
                  <h4>Silver League</h4>
                  <p>Entry: 🪙250 • Winner: 🪙750</p>
                  <div className="mode-stats">
                    <span>🏆 Silver Tier</span>
                    <span>👥 12 players</span>
                  </div>
                </div>
                <button className="join-button competitive" onClick={() => onJoinGame('silver-comp')}>
                  Enter (🪙250)
                </button>
              </div>
              
              <div className="mode-card competitive">
                <div className="mode-icon">🥇</div>
                <div className="mode-info">
                  <h4>Gold League</h4>
                  <p>Entry: 🪙500 • Winner: 🪙1,500</p>
                  <div className="mode-stats">
                    <span>🏆 Gold Tier</span>
                    <span>👥 8 players</span>
                  </div>
                </div>
                <button className="join-button competitive" onClick={() => onJoinGame('gold-comp')}>
                  Enter (🪙500)
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="multiplayer-lobby-overlay">
        <div className="loading-screen">
          <div className="loading-content">
            <h2>🎮 Connecting to Multiplayer</h2>
            <div className="loading-bar">
              <div 
                className="loading-progress" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="loading-percentage">{Math.floor(loadingProgress)}%</div>
            
            <div className="game-tip">
              <div className="tip-icon">💡</div>
              <div className="tip-text">{gameTips[currentTip]}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="multiplayer-lobby-overlay">
      <div className="multiplayer-lobby">
        <div className="lobby-header">
          <h2>🌐 Multiplayer Lobby</h2>
          <button onClick={onClose} className="close-button">✕</button>
        </div>
        
        <div className="lobby-main">
          <div className="lobby-left">
            <div className="lobby-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`lobby-tab ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
                  disabled={tab.disabled}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <div className="tab-info">
                    <span className="tab-name">{tab.name}</span>
                    <span className="tab-description">{tab.description}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="tab-content-area">
              {renderTabContent()}
            </div>
          </div>
          
          <div className="lobby-right">
            <div className="video-section">
              <div className="video-container">
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  title="Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <h4>🔴 Live: Championship Stream</h4>
                <p>👥 2,847 viewers • 🎮 Pro Tournament</p>
              </div>
            </div>
            
            <div className="chat-section">
              <div className="chat-header">
                <h4>💬 Live Chat</h4>
                <div className="chat-controls">
                  <label className="filter-toggle">
                    <input
                      type="checkbox"
                      checked={badWordFilter}
                      onChange={(e) => setBadWordFilter(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">Filter</span>
                  </label>
                </div>
              </div>
              
              <div className="chat-messages" ref={chatContainerRef}>
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`chat-message ${message.isSystem ? 'system' : ''}`}
                  >
                    <span className="message-time">{formatTimestamp(message.timestamp)}</span>
                    <span className="message-user">{message.user}:</span>
                    <span className="message-text">{filterMessage(message.message)}</span>
                  </div>
                ))}
              </div>
              
              <div className="chat-input-area">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="chat-input"
                  maxLength={200}
                />
                <button onClick={handleSendMessage} className="send-button">
                  📤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerLobby;

