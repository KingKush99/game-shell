import React from 'react';

const SpectatorSection = ({ language, isSubscribed }) => {
  // ⚠️ CHANGE THIS: Put your YouTube Live video ID here
  const YOUTUBE_LIVE_ID = "YOUR_LIVE_VIDEO_ID_HERE";

  return (
    <div className="spectator-section">
      <h3>🏁 Live Racing Spectator</h3>
      <p className="section-description">Watch live races and events in real-time!</p>
      
      <div className="spectator-layout">
        <div className="stream-container">
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${YOUTUBE_LIVE_ID}?autoplay=1&rel=0`}
            title="Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="chat-container">
          {!isSubscribed ? (
            <div className="chat-locked">
              <h4>🔒 Chat Locked</h4>
              <p>Subscribe to YouTube to unlock live chat</p>
            </div>
          ) : (
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/live_chat?v=${YOUTUBE_LIVE_ID}&embed_domain=${window.location.hostname}`}
              frameBorder="0"
              title="Live Chat"
              className="chat-iframe"
            />
          )}
        </div>
      </div>

      <div className="spectator-info">
        <h4>📺 How Spectator Mode Works</h4>
        <ul>
          <li>Watch live racing events and tournaments</li>
          <li>Real-time leaderboards and statistics</li>
          <li>Chat with other viewers (requires YouTube subscription)</li>
          <li>Get notified when your favorite streamers go live</li>
        </ul>
      </div>
    </div>
  );
};

export default SpectatorSection;
