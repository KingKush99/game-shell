import React, { useState, useEffect } from 'react';
import './LiveModal.css';
import { translations } from '../translations';

const LiveModal = ({ language = 'en', onClose }) => {
  const [activeTab, setActiveTab] = useState('live');
  const [isLoading, setIsLoading] = useState(true);
  const [liveStreams, setLiveStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Sample live streams data (in real app, this would come from YouTube API)
  const sampleStreams = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Live Tournament Finals - Epic Battles!',
      channel: 'GameShell Official',
      viewers: '12,543',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      isLive: true,
      category: 'Tournament'
    },
    {
      id: 'jNQXAC9IVRw',
      title: 'Strategy Guide - Pro Tips & Tricks',
      channel: 'GameShell Pro',
      viewers: '8,921',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
      isLive: true,
      category: 'Tutorial'
    },
    {
      id: 'y6120QOlsfU',
      title: 'Community Showcase - Player Highlights',
      channel: 'GameShell Community',
      viewers: '5,432',
      thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg',
      isLive: true,
      category: 'Community'
    }
  ];

  useEffect(() => {
    // Simulate loading live streams
    setTimeout(() => {
      setLiveStreams(sampleStreams);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
  };

  const handleBackToList = () => {
    setSelectedStream(null);
  };

  const renderStreamList = () => (
    <div className="stream-list">
      <div className="stream-header">
        <h2>🔴 Live Streams</h2>
        <p>Watch live tournaments, tutorials, and community events</p>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading live streams...</p>
        </div>
      ) : (
        <div className="streams-grid">
          {liveStreams.map(stream => (
            <div 
              key={stream.id} 
              className="stream-card"
              onClick={() => handleStreamSelect(stream)}
            >
              <div className="stream-thumbnail">
                <img src={stream.thumbnail} alt={stream.title} />
                <div className="live-badge">🔴 LIVE</div>
                <div className="viewer-count">👁️ {stream.viewers}</div>
              </div>
              <div className="stream-info">
                <h3 className="stream-title">{stream.title}</h3>
                <p className="stream-channel">{stream.channel}</p>
                <span className="stream-category">{stream.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="stream-footer">
        <p>Can't find what you're looking for?</p>
        <button className="request-stream-btn">
          📺 Request a Stream Topic
        </button>
      </div>
    </div>
  );

  const renderStreamPlayer = () => (
    <div className="stream-player">
      <div className="player-header">
        <button className="back-btn" onClick={handleBackToList}>
          ← Back to Streams
        </button>
        <div className="stream-meta">
          <span className="live-indicator">🔴 LIVE</span>
          <span className="viewer-count">👁️ {selectedStream.viewers} watching</span>
        </div>
      </div>

      <div className="video-container">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${selectedStream.id}?autoplay=1&mute=0`}
          title={selectedStream.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="stream-details">
        <h2>{selectedStream.title}</h2>
        <p className="channel-name">by {selectedStream.channel}</p>
        <div className="stream-actions">
          <button className="action-btn like-btn">
            👍 Like
          </button>
          <button className="action-btn share-btn">
            📤 Share
          </button>
          <button className="action-btn subscribe-btn">
            🔔 Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  const renderCampaignContent = () => (
    <div className="campaign-content">
      <div className="campaign-header">
        <h2>🎯 Active Campaigns</h2>
        <p>Complete challenges and earn exclusive rewards</p>
      </div>

      <div className="campaigns-list">
        <div className="campaign-card featured">
          <div className="campaign-badge">⭐ FEATURED</div>
          <div className="campaign-info">
            <h3>Summer Tournament Series</h3>
            <p>Participate in daily tournaments and climb the seasonal leaderboard</p>
            <div className="campaign-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <span className="progress-text">65% Complete</span>
            </div>
            <div className="campaign-rewards">
              <span className="reward-item">🏆 5000 Trophies</span>
              <span className="reward-item">🪙 50,000 Coins</span>
              <span className="reward-item">👑 Exclusive Title</span>
            </div>
            <div className="campaign-timer">
              ⏰ 12 days remaining
            </div>
          </div>
        </div>

        <div className="campaign-card">
          <div className="campaign-info">
            <h3>Social Media Challenge</h3>
            <p>Follow us on social media and share your best moments</p>
            <div className="campaign-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '30%' }}></div>
              </div>
              <span className="progress-text">30% Complete</span>
            </div>
            <div className="campaign-tasks">
              <div className="task-item completed">
                ✅ Follow on Instagram
              </div>
              <div className="task-item">
                📱 Share a screenshot
              </div>
              <div className="task-item">
                🎥 Tag us in a video
              </div>
            </div>
            <div className="campaign-rewards">
              <span className="reward-item">🪙 10,000 Coins</span>
              <span className="reward-item">🎁 Mystery Box</span>
            </div>
          </div>
        </div>

        <div className="campaign-card">
          <div className="campaign-info">
            <h3>Daily Login Streak</h3>
            <p>Login daily to maintain your streak and earn increasing rewards</p>
            <div className="streak-counter">
              <div className="streak-number">7</div>
              <div className="streak-label">Day Streak</div>
            </div>
            <div className="daily-rewards">
              <div className="reward-day completed">Day 1: 🪙 1,000</div>
              <div className="reward-day completed">Day 2: 🪙 2,000</div>
              <div className="reward-day completed">Day 3: 🪙 3,000</div>
              <div className="reward-day completed">Day 4: 🪙 4,000</div>
              <div className="reward-day completed">Day 5: 🪙 5,000</div>
              <div className="reward-day completed">Day 6: 🪙 6,000</div>
              <div className="reward-day current">Day 7: 🪙 7,000</div>
              <div className="reward-day">Day 8: 🎁 Bonus Box</div>
            </div>
          </div>
        </div>

        <div className="campaign-card">
          <div className="campaign-info">
            <h3>Skill Mastery Path</h3>
            <p>Complete skill-based challenges to unlock new abilities</p>
            <div className="skill-tree">
              <div className="skill-node completed">
                <span className="skill-icon">🎯</span>
                <span className="skill-name">Precision</span>
              </div>
              <div className="skill-node completed">
                <span className="skill-icon">⚡</span>
                <span className="skill-name">Speed</span>
              </div>
              <div className="skill-node current">
                <span className="skill-icon">🛡️</span>
                <span className="skill-name">Defense</span>
              </div>
              <div className="skill-node locked">
                <span className="skill-icon">🔥</span>
                <span className="skill-name">Power</span>
              </div>
            </div>
            <div className="campaign-rewards">
              <span className="reward-item">🏆 Skill Badges</span>
              <span className="reward-item">⚡ Special Abilities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="live-modal-overlay">
      <div className="live-modal">
        <div className="live-modal-header">
          <div className="modal-tabs">
            <button
              className={`modal-tab ${activeTab === 'live' ? 'active' : ''}`}
              onClick={() => setActiveTab('live')}
            >
              🔴 Live Streams
            </button>
            <button
              className={`modal-tab ${activeTab === 'campaign' ? 'active' : ''}`}
              onClick={() => setActiveTab('campaign')}
            >
              🎯 Campaigns
            </button>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="live-modal-body">
          {activeTab === 'live' && (
            selectedStream ? renderStreamPlayer() : renderStreamList()
          )}
          {activeTab === 'campaign' && renderCampaignContent()}
        </div>
      </div>
    </div>
  );
};

export default LiveModal;

