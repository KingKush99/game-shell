import React from 'react';

const VerificationModal = ({ language, type, onClose, onComplete, userSubscriptions }) => {
  // ⚠️ CHANGE THESE: Replace with your actual channel/handle URLs
  const YOUTUBE_CHANNEL_URL = "https://youtube.com/channel/YOUR_CHANNEL_ID?sub_confirmation=1";
  const INSTAGRAM_URL = "https://instagram.com/YOUR_INSTAGRAM_HANDLE";

  const isTournament = type === 'tournament';
  const needsYouTube = isTournament || type === 'spectator';

  const handleYouTubeSubscribe = () => {
    window.open(YOUTUBE_CHANNEL_URL, "_blank");
    // In real app, verify via YouTube API
    setTimeout(() => onComplete(type, true), 1000);
  };

  const handleInstagramFollow = () => {
    window.open(INSTAGRAM_URL, "_blank");
    // In real app, verify via Instagram API
    setTimeout(() => onComplete(type, true), 1000);
  };

  return (
    <div className="verification-modal-overlay">
      <div className="verification-modal-content">
        <div className="modal-header">
          <h2>🔐 Verification Required</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="verification-body">
          {isTournament && (
            <div className="verification-type">
              <h3>Tournament Access</h3>
              <p>To join tournaments, complete these requirements:</p>
            </div>
          )}

          {needsYouTube && !userSubscriptions.youtube && (
            <div className="verify-item">
              <h4>1. Subscribe to YouTube</h4>
              <p>Click below to subscribe to our channel</p>
              <button onClick={handleYouTubeSubscribe} className="verify-btn youtube">
                Subscribe Now
              </button>
            </div>
          )}

          {isTournament && !userSubscriptions.instagram && (
            <div className="verify-item">
              <h4>2. Follow on Instagram</h4>
              <p>Click below to follow our page</p>
              <button onClick={handleInstagramFollow} className="verify-btn instagram">
                Follow Now
              </button>
            </div>
          )}

          {userSubscriptions.youtube && (!isTournament || userSubscriptions.instagram) && (
            <div className="verification-complete">
              <p>✓ All requirements met!</p>
              <button onClick={() => onComplete(type, true)} className="continue-btn">
                Continue
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
