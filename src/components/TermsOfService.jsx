import React from 'react';
import './TermsOfService.css';
import { translations } from '../translations';

const TermsOfService = ({ language = 'en', onClose }) => {
  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal">
        <div className="terms-header">
          <h2>{t('termsOfService')}</h2>
          <button className="close-terms" onClick={onClose}>×</button>
        </div>
        
        <div className="terms-content">
          <div className="terms-section">
            <h3>1. {t('acceptance')}</h3>
            <p>
              By participating in our gaming tournaments, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not register for any tournaments.
            </p>
          </div>

          <div className="terms-section">
            <h3>2. {t('eligibility')}</h3>
            <p>
              Participants must be at least 13 years old to enter tournaments. Participants under 18 
              must have parental consent. You must provide accurate information during registration.
            </p>
          </div>

          <div className="terms-section">
            <h3>3. {t('tournamentRules')}</h3>
            <p>
              All tournaments run for exactly 3 days from the start time posted in UTC. Participants 
              must be available during the entire tournament period. Late entries or early departures 
              may result in disqualification.
            </p>
          </div>

          <div className="terms-section">
            <h3>4. {t('socialMediaRequirements')}</h3>
            <p>
              To participate, you must follow our Instagram account (@gamingchannel) and subscribe 
              to our YouTube channel (Gaming Channel). These follows/subscriptions must remain active 
              throughout the tournament period.
            </p>
          </div>

          <div className="terms-section">
            <h3>5. {t('prizes')}</h3>
            <p>
              Prizes will be awarded as specified in each tournament announcement. Prize distribution 
              may take up to 30 days after tournament completion. Taxes on prizes are the responsibility 
              of the winner.
            </p>
          </div>

          <div className="terms-section">
            <h3>6. {t('conduct')}</h3>
            <p>
              Participants must maintain respectful behavior at all times. Cheating, harassment, or 
              unsportsmanlike conduct will result in immediate disqualification and potential ban 
              from future tournaments.
            </p>
          </div>

          <div className="terms-section">
            <h3>7. {t('disqualification')}</h3>
            <p>
              We reserve the right to disqualify any participant for violation of these terms, 
              technical issues, or any behavior deemed inappropriate. Disqualified participants 
              forfeit any prizes or rankings.
            </p>
          </div>

          <div className="terms-section">
            <h3>8. {t('technicalIssues')}</h3>
            <p>
              Participants are responsible for their own internet connection and technical setup. 
              We are not liable for technical difficulties that prevent participation.
            </p>
          </div>

          <div className="terms-section">
            <h3>9. {t('privacy')}</h3>
            <p>
              Your personal information will be used solely for tournament administration and 
              prize distribution. We will not share your information with third parties without 
              your consent.
            </p>
          </div>

          <div className="terms-section">
            <h3>10. {t('modifications')}</h3>
            <p>
              We reserve the right to modify these terms at any time. Participants will be notified 
              of significant changes. Continued participation constitutes acceptance of modified terms.
            </p>
          </div>

          <div className="terms-section">
            <h3>11. {t('liability')}</h3>
            <p>
              Participation is at your own risk. We are not liable for any damages, losses, or 
              injuries resulting from tournament participation. This includes but is not limited 
              to technical issues, prize disputes, or personal conflicts.
            </p>
          </div>

          <div className="terms-section">
            <h3>12. {t('contact')}</h3>
            <p>
              For questions about these terms or tournament-related issues, please contact us at 
              tournaments@gamingchannel.com or through our official social media channels.
            </p>
          </div>

          <div className="terms-footer">
            <p><strong>{t('lastUpdated')}: January 2025</strong></p>
            <p>{t('byParticipating')}</p>
          </div>
        </div>

        <div className="terms-actions">
          <button className="accept-terms" onClick={onClose}>
            {t('iUnderstand')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

