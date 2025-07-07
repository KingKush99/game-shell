import React, { useState } from 'react';
import './TournamentModal.css';
import { translations } from '../translations';

const TournamentModal = ({ language = 'en', onClose, onShowTerms }) => {
  const [formData, setFormData] = useState({
    username: '',
    instagramFollowed: false,
    youtubeFollowed: false,
    timeAgreed: false,
    termsAgreed: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing/checking
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = t('usernameRequired');
    } else if (formData.username.length < 3) {
      newErrors.username = t('usernameMinLength');
    }
    
    if (!formData.instagramFollowed) {
      newErrors.instagramFollowed = t('instagramFollowRequired');
    }
    
    if (!formData.youtubeFollowed) {
      newErrors.youtubeFollowed = t('youtubeFollowRequired');
    }
    
    if (!formData.timeAgreed) {
      newErrors.timeAgreed = t('timeAgreementRequired');
    }
    
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = t('termsAgreementRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      // Here you would typically send the data to a server
      setTimeout(() => {
        onClose();
        // Show success message or redirect
      }, 2000);
    }
  };

  const getCurrentUTCTime = () => {
    const now = new Date();
    const tournamentEnd = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from now
    return {
      start: now.toISOString().slice(0, 16),
      end: tournamentEnd.toISOString().slice(0, 16)
    };
  };

  const tournamentTime = getCurrentUTCTime();

  if (submitted) {
    return (
      <div className="tournament-modal-overlay">
        <div className="tournament-modal">
          <div className="tournament-success">
            <div className="success-icon">🎉</div>
            <h2>{t('registrationSuccessful')}</h2>
            <p>{t('tournamentRegistrationConfirmed')}</p>
            <p>{t('checkEmailForDetails')}</p>
            <button className="close-btn" onClick={onClose}>
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tournament-modal-overlay">
      <div className="tournament-modal">
        <div className="modal-header">
          <h2>{t('tournamentRegistration')}</h2>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="tournament-form">
          <div className="form-group">
            <label htmlFor="username">{t('username')} *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder={t('enterUsername')}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="social-requirements">
            <h3>{t('socialMediaRequirements')}</h3>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="instagramFollowed"
                  checked={formData.instagramFollowed}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                {t('followInstagram')} *
                <a href="https://instagram.com/gamingchannel" target="_blank" rel="noopener noreferrer" className="social-link">
                  📱 @gamingchannel
                </a>
              </label>
              {errors.instagramFollowed && <span className="error-message">{errors.instagramFollowed}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="youtubeFollowed"
                  checked={formData.youtubeFollowed}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                {t('subscribeYoutube')} *
                <a href="https://youtube.com/gamingchannel" target="_blank" rel="noopener noreferrer" className="social-link">
                  📺 Gaming Channel
                </a>
              </label>
              {errors.youtubeFollowed && <span className="error-message">{errors.youtubeFollowed}</span>}
            </div>
          </div>

          <div className="tournament-time">
            <h3>{t('tournamentSchedule')}</h3>
            <div className="time-info">
              <p><strong>{t('startTime')}:</strong> {new Date(tournamentTime.start).toLocaleString()} UTC</p>
              <p><strong>{t('endTime')}:</strong> {new Date(tournamentTime.end).toLocaleString()} UTC</p>
              <p><strong>{t('duration')}:</strong> 3 {t('days')}</p>
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="timeAgreed"
                  checked={formData.timeAgreed}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                {t('agreeToTournamentTime')} *
              </label>
              {errors.timeAgreed && <span className="error-message">{errors.timeAgreed}</span>}
            </div>
          </div>

          <div className="terms-section">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                {t('agreeToTerms')} *
                <button 
                  type="button" 
                  className="terms-link"
                  onClick={onShowTerms}
                >
                  {t('viewTermsOfService')}
                </button>
              </label>
              {errors.termsAgreed && <span className="error-message">{errors.termsAgreed}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="submit-btn">
              {t('registerForTournament')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentModal;

