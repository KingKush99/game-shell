import React, { useState } from 'react';
import './RulesGuide.css';
import { translations } from '../translations';

const RulesGuide = ({ language = 'en', onClose, onStartSiteTutorial }) => {
  const [activeSection, setActiveSection] = useState('rules');
  const [activeSubSection, setActiveSubSection] = useState('gameGuide');
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Rules sections with jump links
  const rulesSections = [
    { id: 'overview', title: 'Game Overview', icon: '🎮' },
    { id: 'gameplay', title: 'Basic Gameplay', icon: '🕹️' },
    { id: 'scoring', title: 'Scoring System', icon: '🏆' },
    { id: 'tournaments', title: 'Tournaments', icon: '🏅' },
    { id: 'leaderboards', title: 'Leaderboards', icon: '📊' },
    { id: 'coins', title: 'Coins & Currency', icon: '🪙' },
    { id: 'shop', title: 'Shop & Purchases', icon: '🛒' },
    { id: 'profile', title: 'Profile System', icon: '👤' },
    { id: 'social', title: 'Social Features', icon: '👥' },
    { id: 'conduct', title: 'Code of Conduct', icon: '⚖️' }
  ];

  // Tutorial steps for game guide
  const gameGuideSteps = [
    {
      title: 'Welcome to the Game!',
      content: 'Hi there! I\'m your friendly guide. Let me show you around the amazing features of our game platform.',
      character: '😊',
      highlight: null
    },
    {
      title: 'Main Navigation',
      content: 'These are the main game buttons. Click on Live for streaming, Shop for purchases, and Auctions for tournaments!',
      character: '👉',
      highlight: 'main-buttons'
    },
    {
      title: 'Mini Slots Game',
      content: 'Try your luck with our slot machine! You can bet coins and choose between 3-5 reels for different multipliers.',
      character: '🎰',
      highlight: 'mini-slots'
    },
    {
      title: 'Leaderboards',
      content: 'Check your ranking against other players! You can view global rankings and see trophy tiers.',
      character: '🏆',
      highlight: 'leaderboard'
    },
    {
      title: 'Profile System',
      content: 'Customize your profile, view your stats, and manage your character. You can rotate and pose your 3D character!',
      character: '👤',
      highlight: 'profile'
    },
    {
      title: 'Music & Settings',
      content: 'Enjoy background music and customize your experience through the settings menu.',
      character: '🎵',
      highlight: 'music-settings'
    }
  ];

  // Tutorial steps for site guide
  const siteGuideSteps = [
    {
      title: 'Site Navigation',
      content: 'Let me show you how to navigate our website effectively and find everything you need!',
      character: '🧭',
      highlight: null
    },
    {
      title: 'Language Selection',
      content: 'You can change the language anytime! We support 10 languages including English, Spanish, French, and more.',
      character: '🌍',
      highlight: 'language-selector'
    },
    {
      title: 'Footer Information',
      content: 'The footer contains important links like Terms of Service, Privacy Policy, and Contact information.',
      character: '📋',
      highlight: 'footer'
    },
    {
      title: 'AI Assistant',
      content: 'Need help? Our AI assistant can answer questions about gameplay, rules, and provide contextual suggestions!',
      character: '🤖',
      highlight: 'ai-assistant'
    },
    {
      title: 'Responsive Design',
      content: 'Our site works perfectly on desktop, tablet, and mobile devices. Try resizing your browser!',
      character: '📱',
      highlight: null
    },
    {
      title: 'Accessibility Features',
      content: 'We support screen readers, keyboard navigation, and other accessibility features for all users.',
      character: '♿',
      highlight: 'accessibility'
    }
  ];

  const getCurrentSteps = () => {
    return activeSubSection === 'gameGuide' ? gameGuideSteps : siteGuideSteps;
  };

  const nextStep = () => {
    const steps = getCurrentSteps();
    if (currentTutorialStep < steps.length - 1) {
      setCurrentTutorialStep(currentTutorialStep + 1);
    }
  };

  const prevStep = () => {
    if (currentTutorialStep > 0) {
      setCurrentTutorialStep(currentTutorialStep - 1);
    }
  };

  const skipTutorial = () => {
    setActiveSection('rules');
    setCurrentTutorialStep(0);
  };

  const switchSubSection = (subSection) => {
    setActiveSubSection(subSection);
    setCurrentTutorialStep(0);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(`rules-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderRulesContent = () => (
    <div className="rules-content">
      {/* Quick Navigation */}
      <div className="rules-navigation">
        <h3>Quick Navigation</h3>
        <div className="nav-grid">
          {rulesSections.map(section => (
            <button
              key={section.id}
              className="nav-item"
              onClick={() => scrollToSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-title">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Rules Sections */}
      <div className="rules-sections">
        <section id="rules-overview" className="rule-section">
          <h2>🎮 Game Overview</h2>
          <p>Welcome to our comprehensive gaming platform! This is a multi-featured gaming environment that combines slot machines, tournaments, social features, and competitive gameplay.</p>
          <ul>
            <li>Play mini slot games with coin betting</li>
            <li>Participate in tournaments and competitions</li>
            <li>Climb the leaderboards and earn trophies</li>
            <li>Customize your profile and character</li>
            <li>Connect with other players socially</li>
          </ul>
        </section>

        <section id="rules-gameplay" className="rule-section">
          <h2>🕹️ Basic Gameplay</h2>
          <p>The core gameplay revolves around earning coins, participating in games, and advancing through trophy tiers.</p>
          <h4>Getting Started:</h4>
          <ol>
            <li>Create your profile and customize your character</li>
            <li>Start with your initial coin balance</li>
            <li>Try the mini slots to earn more coins</li>
            <li>Participate in tournaments when available</li>
            <li>Check leaderboards to see your ranking</li>
          </ol>
        </section>

        <section id="rules-scoring" className="rule-section">
          <h2>🏆 Scoring System</h2>
          <p>Your progress is measured through trophies and coins:</p>
          <h4>Trophy Tiers (11 levels):</h4>
          <ul>
            <li><strong>Unranked:</strong> 0-500 trophies</li>
            <li><strong>Rookie I-III:</strong> 501-800 trophies</li>
            <li><strong>Bronze I-III:</strong> 801-1100 trophies</li>
            <li><strong>Silver I-III:</strong> 1101-1400 trophies</li>
            <li><strong>Gold I-III:</strong> 1401-1700 trophies</li>
            <li><strong>Crystal I-III:</strong> 1701-2000 trophies</li>
            <li><strong>Master I-III:</strong> 2001-2300 trophies</li>
            <li><strong>Champion I-III:</strong> 2301-2600 trophies</li>
            <li><strong>Titan I-III:</strong> 2601-2900 trophies</li>
            <li><strong>Legend I-II:</strong> 2901-2999 trophies</li>
            <li><strong>Pro:</strong> 3000+ trophies</li>
          </ul>
        </section>

        <section id="rules-tournaments" className="rule-section">
          <h2>🏅 Tournaments</h2>
          <p>Compete against players worldwide in scheduled tournaments:</p>
          <ul>
            <li>Register for upcoming tournaments</li>
            <li>Follow social media requirements (Instagram, YouTube)</li>
            <li>Compete during the tournament window</li>
            <li>Earn prizes based on your ranking</li>
            <li>View previous tournament winners</li>
          </ul>
        </section>

        <section id="rules-leaderboards" className="rule-section">
          <h2>📊 Leaderboards</h2>
          <p>Track your progress and compete with others:</p>
          <ul>
            <li><strong>Global Rankings:</strong> Compete worldwide</li>
            <li><strong>Local Rankings:</strong> Compete in your region</li>
            <li><strong>Trophy Leagues:</strong> See all tier classifications</li>
            <li><strong>Player Interactions:</strong> Add friends, view profiles, send messages</li>
          </ul>
        </section>

        <section id="rules-coins" className="rule-section">
          <h2>🪙 Coins & Currency</h2>
          <p>Coins are the primary currency for gameplay:</p>
          <h4>Earning Coins:</h4>
          <ul>
            <li>Win slot machine games</li>
            <li>Complete daily challenges</li>
            <li>Watch advertisement videos</li>
            <li>Purchase with real money</li>
          </ul>
          <h4>Spending Coins:</h4>
          <ul>
            <li>Bet on slot machines</li>
            <li>Enter premium tournaments</li>
            <li>Purchase cosmetic items</li>
          </ul>
        </section>

        <section id="rules-shop" className="rule-section">
          <h2>🛒 Shop & Purchases</h2>
          <p>The shop offers various ways to enhance your experience:</p>
          <h4>Shop Categories:</h4>
          <ul>
            <li><strong>Fiat to Coins:</strong> Purchase coins with real money</li>
            <li><strong>Crypto to Coins:</strong> Buy coins with cryptocurrency</li>
            <li><strong>Watch Ads:</strong> Earn coins by viewing advertisements</li>
            <li><strong>Subscriptions:</strong> Gold, Diamond (Popular), and Platinum tiers</li>
          </ul>
        </section>

        <section id="rules-profile" className="rule-section">
          <h2>👤 Profile System</h2>
          <p>Customize and manage your gaming identity:</p>
          <ul>
            <li><strong>3D Character:</strong> Rotate, zoom, and change poses</li>
            <li><strong>Stats Tracking:</strong> View your performance metrics</li>
            <li><strong>Items Collection:</strong> Manage your earned items</li>
            <li><strong>Campaign Progress:</strong> Track your advancement</li>
            <li><strong>Cash Out:</strong> Manage your earnings</li>
          </ul>
        </section>

        <section id="rules-social" className="rule-section">
          <h2>👥 Social Features</h2>
          <p>Connect and interact with the gaming community:</p>
          <ul>
            <li><strong>Friend System:</strong> Add and manage friends</li>
            <li><strong>Messaging:</strong> Send messages to other players</li>
            <li><strong>Clan System:</strong> Join or create clans</li>
            <li><strong>Profile Viewing:</strong> Check out other players' profiles</li>
            <li><strong>Live Streaming:</strong> Watch and participate in live events</li>
          </ul>
        </section>

        <section id="rules-conduct" className="rule-section">
          <h2>⚖️ Code of Conduct</h2>
          <p>Maintain a positive gaming environment for everyone:</p>
          <h4>Expected Behavior:</h4>
          <ul>
            <li>Treat all players with respect</li>
            <li>Use appropriate language in all communications</li>
            <li>Play fairly without cheating or exploiting</li>
            <li>Report inappropriate behavior</li>
            <li>Follow tournament rules and guidelines</li>
          </ul>
          <h4>Prohibited Actions:</h4>
          <ul>
            <li>Harassment or bullying of other players</li>
            <li>Using offensive or discriminatory language</li>
            <li>Cheating, hacking, or using unauthorized tools</li>
            <li>Sharing account credentials</li>
            <li>Spamming or excessive messaging</li>
          </ul>
        </section>
      </div>
    </div>
  );

  const renderTutorialContent = () => {
    const steps = getCurrentSteps();
    const currentStep = steps[currentTutorialStep];

    return (
      <div className="tutorial-content">
        <div className="tutorial-header">
          <div className="tutorial-tabs">
            <button
              className={`tutorial-tab ${activeSubSection === 'gameGuide' ? 'active' : ''}`}
              onClick={() => switchSubSection('gameGuide')}
            >
              🎮 Game Guide
            </button>
            <button
              className={`tutorial-tab ${activeSubSection === 'siteGuide' ? 'active' : ''}`}
              onClick={() => switchSubSection('siteGuide')}
            >
              🌐 Site Guide
            </button>
            <button
              className="tutorial-tab site-tour-btn"
              onClick={() => {
                if (onStartSiteTutorial) {
                  onClose();
                  onStartSiteTutorial();
                }
              }}
            >
              🚀 Complete Site Tour
            </button>
          </div>
        </div>

        <div className="tutorial-step">
          <div className="tutorial-character">
            <div className="character-avatar">{currentStep.character}</div>
            <div className="character-speech-bubble">
              <h3>{currentStep.title}</h3>
              <p>{currentStep.content}</p>
            </div>
          </div>

          <div className="tutorial-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentTutorialStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">
              Step {currentTutorialStep + 1} of {steps.length}
            </span>
          </div>

          <div className="tutorial-controls">
            <button
              className="tutorial-btn secondary"
              onClick={prevStep}
              disabled={currentTutorialStep === 0}
            >
              ← Previous
            </button>
            
            <button
              className="tutorial-btn skip"
              onClick={skipTutorial}
            >
              Skip Tutorial
            </button>
            
            <button
              className="tutorial-btn primary"
              onClick={nextStep}
              disabled={currentTutorialStep === steps.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rules-guide-overlay">
      <div className="rules-guide-modal">
        <div className="rules-guide-header">
          <div className="header-tabs">
            <button
              className={`header-tab ${activeSection === 'rules' ? 'active' : ''}`}
              onClick={() => setActiveSection('rules')}
            >
              📋 Rules & Guidelines
            </button>
            <button
              className={`header-tab ${activeSection === 'tutorial' ? 'active' : ''}`}
              onClick={() => setActiveSection('tutorial')}
            >
              🎓 Interactive Tutorial
            </button>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="rules-guide-body">
          {activeSection === 'rules' ? renderRulesContent() : renderTutorialContent()}
        </div>
      </div>
    </div>
  );
};

export default RulesGuide;

