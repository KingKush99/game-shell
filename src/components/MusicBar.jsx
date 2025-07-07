import React, { useState, useEffect } from 'react';
import './MusicBar.css';

const MusicBar = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious, onClose, onVolumeChange, volume = 50 }) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        // Simulate progress (in real app, this would come from audio element)
        setProgress(prev => {
          const newProgress = prev + (100 / (parseDuration(currentTrack.duration) * 10));
          if (newProgress >= 100) {
            onNext();
            return 0;
          }
          return newProgress;
        });
        
        // Update current time display
        const totalSeconds = parseDuration(currentTrack.duration);
        const currentSeconds = Math.floor((progress / 100) * totalSeconds);
        setCurrentTime(formatTime(currentSeconds));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack, progress, onNext]);

  const parseDuration = (duration) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, newProgress)));
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!currentTrack) return null;

  return (
    <div className={`music-bar ${isExpanded ? 'expanded' : ''}`}>
      {/* Progress Bar */}
      <div 
        className="progress-container"
        onClick={handleProgressClick}
      >
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <div 
            className="progress-thumb"
            style={{ left: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="music-bar-content">
        <div className="track-info">
          <div className="track-thumbnail">
            {currentTrack.thumbnail}
          </div>
          <div className="track-details">
            <div className="track-title">{currentTrack.title}</div>
            <div className="track-artist">{currentTrack.artist}</div>
          </div>
        </div>

        <div className="playback-controls">
          <button className="control-btn" onClick={onPrevious}>
            ⏮️
          </button>
          <button className="play-pause-btn" onClick={onPlayPause}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="control-btn" onClick={onNext}>
            ⏭️
          </button>
        </div>

        <div className="additional-controls">
          <div className="time-display">
            <span className="current-time">{currentTime}</span>
            <span className="duration">{currentTrack.duration}</span>
          </div>

          <div className="volume-control">
            <button 
              className="volume-btn"
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            >
              {volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
            </button>
            {showVolumeSlider && (
              <div className="volume-slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="volume-slider"
                />
              </div>
            )}
          </div>

          <button 
            className="expand-btn"
            onClick={toggleExpanded}
          >
            {isExpanded ? '🔽' : '🔼'}
          </button>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="expanded-content">
          <div className="expanded-track-info">
            <div className="large-thumbnail">
              {currentTrack.thumbnail}
            </div>
            <div className="expanded-details">
              <h3 className="expanded-title">{currentTrack.title}</h3>
              <p className="expanded-artist">{currentTrack.artist}</p>
              <p className="expanded-genre">{currentTrack.genre}</p>
            </div>
          </div>

          <div className="expanded-controls">
            <div className="playback-modes">
              <button className="mode-btn">🔀 Shuffle</button>
              <button className="mode-btn">🔁 Repeat</button>
              <button className="mode-btn">❤️ Favorite</button>
            </div>

            <div className="equalizer">
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
            </div>

            <div className="quick-actions">
              <button className="quick-btn">📱 Share</button>
              <button className="quick-btn">📋 Playlist</button>
              <button className="quick-btn">🎵 Library</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicBar;

