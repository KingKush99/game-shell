import React, { useState, useEffect } from 'react';
import './MusicModal.css';
import { translations } from '../translations';

const MusicModal = ({ language = 'en', onClose, onPlayMusic }) => {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('library'); // library, playlists, upload
  const [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem('userPlaylists')) || []);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [userTier, setUserTier] = useState('gold'); // Simulate user tier (bronze, silver, gold, diamond)

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Sample music data
  const musicLibrary = {
    featured: [
      {
        id: 1,
        title: 'Epic Battle Theme',
        artist: 'GameShell Orchestra',
        duration: '3:45',
        genre: 'Epic',
        thumbnail: '🎵',
        isPopular: true,
        isPremium: false
      },
      {
        id: 2,
        title: 'Victory Celebration',
        artist: 'Triumph Studios',
        duration: '2:30',
        genre: 'Upbeat',
        thumbnail: '🏆',
        isPopular: true,
        isPremium: false
      },
      {
        id: 3,
        title: 'Mystical Forest',
        artist: 'Nature Sounds',
        duration: '4:12',
        genre: 'Ambient',
        thumbnail: '🌲',
        isPopular: false,
        isPremium: true
      }
    ],
    gaming: [
      {
        id: 4,
        title: 'Slot Machine Jingle',
        artist: 'Casino Beats',
        duration: '1:45',
        genre: 'Casino',
        thumbnail: '🎰',
        isPopular: true,
        isPremium: false
      },
      {
        id: 5,
        title: 'Tournament Anthem',
        artist: 'Competition Music',
        duration: '3:20',
        genre: 'Sports',
        thumbnail: '🏅',
        isPopular: false,
        isPremium: false
      },
      {
        id: 6,
        title: 'Leaderboard Climb',
        artist: 'Achievement Audio',
        duration: '2:55',
        genre: 'Motivational',
        thumbnail: '📈',
        isPopular: true,
        isPremium: true
      }
    ],
    ambient: [
      {
        id: 7,
        title: 'Peaceful Meadow',
        artist: 'Relaxation Records',
        duration: '5:30',
        genre: 'Nature',
        thumbnail: '🌸',
        isPopular: false,
        isPremium: false
      },
      {
        id: 8,
        title: 'Ocean Waves',
        artist: 'Calm Collective',
        duration: '6:00',
        genre: 'Water',
        thumbnail: '🌊',
        isPopular: true,
        isPremium: false
      },
      {
        id: 9,
        title: 'Mountain Breeze',
        artist: 'Alpine Audio',
        duration: '4:45',
        genre: 'Wind',
        thumbnail: '⛰️',
        isPopular: false,
        isPremium: true
      }
    ],
    electronic: [
      {
        id: 10,
        title: 'Cyber Pulse',
        artist: 'Digital Dreams',
        duration: '3:15',
        genre: 'Synthwave',
        thumbnail: '🤖',
        isPopular: true,
        isPremium: false
      },
      {
        id: 11,
        title: 'Neon Nights',
        artist: 'Retro Future',
        duration: '4:00',
        genre: 'Electronic',
        thumbnail: '🌃',
        isPopular: false,
        isPremium: true
      },
      {
        id: 12,
        title: 'Digital Horizon',
        artist: 'Tech Tunes',
        duration: '3:30',
        genre: 'Ambient Electronic',
        thumbnail: '🔮',
        isPopular: true,
        isPremium: false
      }
    ]
  };

  const categories = [
    { id: 'featured', name: 'Featured', icon: '⭐' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'ambient', name: 'Ambient', icon: '🌙' },
    { id: 'electronic', name: 'Electronic', icon: '🎧' }
  ];

  const tabs = [
    { id: 'library', name: 'Music Library', icon: '🎵' },
    { id: 'playlists', name: 'My Playlists', icon: '📋' },
    { id: 'upload', name: 'Upload Music', icon: '⬆️' }
  ];

  const getCurrentMusic = () => {
    const allMusic = Object.values(musicLibrary).flat();
    const categoryMusic = musicLibrary[activeCategory] || [];
    
    if (searchQuery) {
      return allMusic.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return categoryMusic;
  };

  const handlePlayTrack = (track) => {
    onPlayMusic(track);
    onClose();
  };

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      tracks: [],
      createdAt: new Date().toISOString(),
      isPublic: false,
      downloads: 0
    };
    
    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    localStorage.setItem('userPlaylists', JSON.stringify(updatedPlaylists));
    setNewPlaylistName('');
    setShowCreatePlaylist(false);
  };

  const addToPlaylist = (track, playlistId) => {
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const trackExists = playlist.tracks.some(t => t.id === track.id);
        if (!trackExists) {
          return { ...playlist, tracks: [...playlist.tracks, track] };
        }
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
    localStorage.setItem('userPlaylists', JSON.stringify(updatedPlaylists));
  };

  const publishPlaylist = (playlistId) => {
    if (userTier !== 'diamond') {
      alert('Publishing playlists requires Diamond tier subscription!');
      return;
    }
    
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, isPublic: true };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
    localStorage.setItem('userPlaylists', JSON.stringify(updatedPlaylists));
    alert('Playlist published successfully!');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      // Simulate file upload
      const newTrack = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: 'You',
        duration: '0:00',
        genre: 'Uploaded',
        thumbnail: '🎤',
        isPopular: false,
        isPremium: false,
        isUploaded: true
      };
      
      // Add to user's uploaded music (could be stored separately)
      alert(`"${newTrack.title}" uploaded successfully!`);
    }
  };

  const renderMusicCard = (track, showAddToPlaylist = false) => (
    <div key={track.id} className="music-card">
      <div className="music-thumbnail">
        <div className="thumbnail-icon">{track.thumbnail}</div>
        {track.isPremium && <div className="premium-badge">💎</div>}
        {track.isPopular && <div className="popular-badge">🔥</div>}
        {track.isUploaded && <div className="uploaded-badge">🎤</div>}
      </div>
      
      <div className="music-info">
        <h3 className="music-title">{track.title}</h3>
        <p className="music-artist">{track.artist}</p>
        <div className="music-meta">
          <span className="music-genre">{track.genre}</span>
          <span className="music-duration">{track.duration}</span>
        </div>
      </div>
      
      <div className="music-actions">
        <button 
          className="play-btn"
          onClick={() => handlePlayTrack(track)}
          disabled={track.isPremium}
        >
          {track.isPremium ? '🔒' : '▶️'}
        </button>
        {showAddToPlaylist && (
          <div className="playlist-dropdown">
            <button className="add-to-playlist-btn">➕</button>
            <div className="playlist-options">
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  onClick={() => addToPlaylist(track, playlist.id)}
                  className="playlist-option"
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </div>
        )}
        <button className="favorite-btn">❤️</button>
      </div>
    </div>
  );

  const renderPlaylistView = () => (
    <div className="playlists-section">
      <div className="playlists-header">
        <h3>My Playlists ({playlists.length})</h3>
        <button 
          className="create-playlist-btn"
          onClick={() => setShowCreatePlaylist(true)}
        >
          ➕ Create Playlist
        </button>
      </div>

      {showCreatePlaylist && (
        <div className="create-playlist-form">
          <input
            type="text"
            placeholder="Enter playlist name..."
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="playlist-name-input"
          />
          <button onClick={createPlaylist} className="confirm-btn">Create</button>
          <button onClick={() => setShowCreatePlaylist(false)} className="cancel-btn">Cancel</button>
        </div>
      )}

      <div className="playlists-grid">
        {playlists.map(playlist => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-header">
              <h4>{playlist.name}</h4>
              <div className="playlist-actions">
                {userTier === 'diamond' && !playlist.isPublic && (
                  <button 
                    onClick={() => publishPlaylist(playlist.id)}
                    className="publish-btn"
                    title="Publish playlist (Diamond tier only)"
                  >
                    🌐
                  </button>
                )}
                {playlist.isPublic && <span className="public-badge">🌐 Public</span>}
              </div>
            </div>
            <div className="playlist-info">
              <p>{playlist.tracks.length} tracks</p>
              {playlist.isPublic && <p>{playlist.downloads} downloads</p>}
            </div>
            <div className="playlist-tracks">
              {playlist.tracks.slice(0, 3).map(track => (
                <div key={track.id} className="mini-track">
                  {track.thumbnail} {track.title}
                </div>
              ))}
              {playlist.tracks.length > 3 && (
                <div className="more-tracks">+{playlist.tracks.length - 3} more</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUploadView = () => (
    <div className="upload-section">
      <div className="upload-header">
        <h3>Upload Your Music</h3>
        <p>Share your own tracks and add them to playlists</p>
      </div>

      <div className="upload-area">
        <div className="upload-dropzone">
          <div className="upload-icon">🎵</div>
          <h4>Drag & Drop Audio Files</h4>
          <p>Or click to browse files</p>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="file-input"
          />
          <button className="browse-btn">Browse Files</button>
        </div>
      </div>

      <div className="upload-info">
        <h4>Supported Formats</h4>
        <div className="format-list">
          <span className="format-tag">MP3</span>
          <span className="format-tag">WAV</span>
          <span className="format-tag">FLAC</span>
          <span className="format-tag">OGG</span>
        </div>
        
        <div className="upload-limits">
          <p>📁 Max file size: 50MB</p>
          <p>⏱️ Max duration: 10 minutes</p>
          <p>🎵 Max uploads per day: 10</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="music-modal-overlay">
      <div className="music-modal">
        <div className="music-modal-header">
          <div className="header-left">
            <h2>🎵 Music Center</h2>
            <p>Your complete music experience</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="music-modal-body">
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

          {/* Tab Content */}
          {activeTab === 'library' && (
            <>
              {/* Search Bar */}
              <div className="search-section">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search music, artists, or genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchQuery('')}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              {!searchQuery && (
                <div className="categories-section">
                  <div className="categories-list">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-name">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Music List */}
              <div className="music-section">
                <div className="section-header">
                  <h3>
                    {searchQuery ? `Search Results (${getCurrentMusic().length})` : 
                     categories.find(c => c.id === activeCategory)?.name || 'Music'}
                  </h3>
                  {!searchQuery && (
                    <div className="view-options">
                      <button className="view-btn active">📋 List</button>
                      <button className="view-btn">🎵 Grid</button>
                    </div>
                  )}
                </div>

                <div className="music-list">
                  {getCurrentMusic().length > 0 ? (
                    getCurrentMusic().map(track => renderMusicCard(track, true))
                  ) : (
                    <div className="no-results">
                      <div className="no-results-icon">🎵</div>
                      <h3>No music found</h3>
                      <p>Try adjusting your search or browse different categories</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Premium Upgrade */}
              <div className="premium-section">
                <div className="premium-card">
                  <div className="premium-icon">💎</div>
                  <div className="premium-content">
                    <h3>Unlock Premium Music</h3>
                    <p>Get access to exclusive tracks and high-quality audio</p>
                    <button className="upgrade-btn">⬆️ Upgrade Now</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'playlists' && renderPlaylistView()}
          {activeTab === 'upload' && renderUploadView()}
        </div>
      </div>
    </div>
  );
};

export default MusicModal;

