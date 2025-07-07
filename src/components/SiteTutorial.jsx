import React, { useState, useEffect } from 'react';
import './SiteTutorial.css';
import { translations } from '../translations';

const SiteTutorial = ({ language = 'en', onClose, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Comprehensive tutorial steps covering every button and feature
  const tutorialSteps = [
    {
      title: 'Welcome to the Complete Site Tour!',
      content: 'I\'ll guide you through every feature of our gaming platform. Let\'s start with the main menu buttons!',
      character: '🎮',
      highlight: null,
      action: 'closeAllModals'
    },
    {
      title: 'Live Streaming',
      content: 'The Live button opens our streaming center where you can watch tournaments, tutorials, and community events.',
      character: '🔴',
      highlight: 'button-live',
      action: 'highlightButton',
      buttonId: 'live'
    },
    {
      title: 'Live Features',
      content: 'Inside Live, you can watch YouTube streams and participate in active campaigns with rewards!',
      character: '📺',
      highlight: 'live-modal',
      action: 'openModal',
      modalType: 'live'
    },
    {
      title: 'Shop System',
      content: 'The Shop button opens our marketplace where you can buy items, upgrades, and premium features.',
      character: '🛒',
      highlight: 'button-shop',
      action: 'highlightButton',
      buttonId: 'shop'
    },
    {
      title: 'Shop Features',
      content: 'Browse different categories, use coins or real money, and manage your inventory in the shop.',
      character: '💰',
      highlight: 'shop-modal',
      action: 'openModal',
      modalType: 'shop'
    },
    {
      title: 'Auctions & Tournaments',
      content: 'Join competitive auctions and tournaments to win exclusive prizes and climb the rankings.',
      character: '🏆',
      highlight: 'button-auctions',
      action: 'highlightButton',
      buttonId: 'auctions'
    },
    {
      title: 'Game Variations',
      content: 'Explore different game modes and variations to keep your experience fresh and exciting.',
      character: '🎲',
      highlight: 'button-variations',
      action: 'highlightButton',
      buttonId: 'variations'
    },
    {
      title: 'Players Hub',
      content: 'Connect with other players, view profiles, and build your gaming community.',
      character: '👥',
      highlight: 'button-players',
      action: 'highlightButton',
      buttonId: 'players'
    },
    {
      title: 'Single Player Mode',
      content: 'Practice your skills and enjoy solo gameplay with various difficulty levels.',
      character: '🎮',
      highlight: 'button-singlePlayer',
      action: 'highlightButton',
      buttonId: 'singlePlayer'
    },
    {
      title: 'Multiplayer Mode',
      content: 'Challenge friends and players worldwide in real-time multiplayer matches.',
      character: '🌐',
      highlight: 'button-multiplayer',
      action: 'highlightButton',
      buttonId: 'multiplayer'
    },
    {
      title: 'Campaign Mode',
      content: 'Progress through story campaigns and complete challenges for exclusive rewards.',
      character: '⚔️',
      highlight: 'button-campaign',
      action: 'highlightButton',
      buttonId: 'campaign'
    },
    {
      title: 'Rules Guide',
      content: 'Access comprehensive rules, tutorials, and help documentation for all game features.',
      character: '📖',
      highlight: 'button-rulesGuide',
      action: 'highlightButton',
      buttonId: 'rulesGuide'
    },
    {
      title: 'Rules Features',
      content: 'Browse rules by category or take interactive tutorials to learn the game mechanics.',
      character: '🎓',
      highlight: 'rules-modal',
      action: 'openModal',
      modalType: 'rules'
    },
    {
      title: 'Themes & Customization',
      content: 'Personalize your experience with different themes, colors, and visual styles.',
      character: '🎨',
      highlight: 'button-themes',
      action: 'highlightButton',
      buttonId: 'themes'
    },
    {
      title: 'Leaderboards',
      content: 'Check your ranking, view trophy tiers, and see how you compare to other players.',
      character: '🏅',
      highlight: 'button-leaderboard',
      action: 'highlightButton',
      buttonId: 'leaderboard'
    },
    {
      title: 'Leaderboard Features',
      content: 'Explore different leagues, interact with players, and track your progress through trophy tiers.',
      character: '🏆',
      highlight: 'leaderboard-modal',
      action: 'openModal',
      modalType: 'leaderboard'
    },
    {
      title: 'Achievements System',
      content: 'Unlock achievements, earn badges, and showcase your gaming accomplishments.',
      character: '🏆',
      highlight: 'button-achievements',
      action: 'highlightButton',
      buttonId: 'achievements'
    },
    {
      title: 'Profile Management',
      content: 'Customize your profile, manage your 3D character, and view your gaming statistics.',
      character: '👤',
      highlight: 'button-profile',
      action: 'highlightButton',
      buttonId: 'profile'
    },
    {
      title: 'Profile Features',
      content: 'Rotate your 3D character, change poses, view stats, and manage your items and cash.',
      character: '🎭',
      highlight: 'profile-modal',
      action: 'openModal',
      modalType: 'profile'
    },
    {
      title: 'Music System',
      content: 'Enjoy background music while playing, with a full library of gaming soundtracks.',
      character: '🎵',
      highlight: 'button-music',
      action: 'highlightButton',
      buttonId: 'music'
    },
    {
      title: 'Music Features',
      content: 'Browse music by genre, create playlists, and control playback with the bottom music bar.',
      character: '🎧',
      highlight: 'music-modal',
      action: 'openModal',
      modalType: 'music'
    },
    {
      title: 'Settings & Preferences',
      content: 'Adjust game settings, audio preferences, and account configurations.',
      character: '⚙️',
      highlight: 'button-settings',
      action: 'highlightButton',
      buttonId: 'settings'
    },
    {
      title: 'FAQ & Help',
      content: 'Find answers to common questions and get help with any issues you encounter.',
      character: '❓',
      highlight: 'button-faq',
      action: 'highlightButton',
      buttonId: 'faq'
    },
    {
      title: 'Mini Slots Game',
      content: 'Try your luck with our built-in slot machine! Bet coins and win big with different reel configurations.',
      character: '🎰',
      highlight: 'mini-slots',
      action: 'highlightFeature',
      featureId: 'slots'
    },
    {
      title: 'AI Assistant',
      content: 'Get instant help from our AI assistant for gameplay tips, rules clarification, and support.',
      character: '🤖',
      highlight: 'ai-assistant',
      action: 'highlightFeature',
      featureId: 'chatbot'
    },
    {
      title: 'Filter System',
      content: 'Use filters to organize and find content quickly. Sort by usage, name, or color.',
      character: '🔍',
      highlight: 'filter-system',
      action: 'highlightFeature',
      featureId: 'filter'
    },
    {
      title: 'Language Selection',
      content: 'Switch between 10 supported languages anytime. All content updates instantly!',
      character: '🌍',
      highlight: 'language-selector',
      action: 'highlightFeature',
      featureId: 'language'
    },
    {
      title: 'Layout Options',
      content: 'Choose between 1, 2, or 4 column layouts to customize how buttons are displayed.',
      character: '📐',
      highlight: 'layout-selector',
      action: 'highlightFeature',
      featureId: 'layout'
    },
    {
      title: 'Live Statistics',
      content: 'See real-time online users and total visitor counts with our animated odometer display.',
      character: '📊',
      highlight: 'odometer',
      action: 'highlightFeature',
      featureId: 'stats'
    },
    {
      title: 'Footer Navigation',
      content: 'Access important links, social media, legal information, and support resources in the footer.',
      character: '📋',
      highlight: 'footer',
      action: 'highlightFeature',
      featureId: 'footer'
    },
    {
      title: 'Social Media Links',
      content: 'Follow us on X, Instagram, YouTube, Snapchat, and TikTok for updates and community content.',
      character: '📱',
      highlight: 'social-media',
      action: 'highlightFeature',
      featureId: 'social'
    },
    {
      title: 'Tutorial Complete!',
      content: 'You\'ve now seen every feature of our platform! Feel free to explore and enjoy gaming. Need help? Just click the tutorial again!',
      character: '🎉',
      highlight: null,
      action: 'complete'
    }
  ];

  useEffect(() => {
    // Execute the action for the current step
    const currentStepData = tutorialSteps[currentStep];
    if (currentStepData && onNavigate) {
      onNavigate(currentStepData.action, currentStepData);
    }
  }, [currentStep, onNavigate]);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    completeTutorial();
  };

  const completeTutorial = () => {
    setIsActive(false);
    if (onNavigate) {
      onNavigate('complete');
    }
    onClose();
  };

  const currentStepData = tutorialSteps[currentStep];

  if (!isActive) return null;

  return (
    <div className="site-tutorial-overlay">
      {/* Tutorial highlight overlay */}
      <div className="tutorial-highlight-overlay" />
      
      {/* Tutorial content */}
      <div className="tutorial-content">
        <div className="tutorial-character">
          <span className="character-emoji">{currentStepData.character}</span>
        </div>
        
        <div className="tutorial-bubble">
          <h3 className="tutorial-title">{currentStepData.title}</h3>
          <p className="tutorial-text">{currentStepData.content}</p>
          
          <div className="tutorial-progress">
            <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="tutorial-controls">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className="tutorial-btn tutorial-btn-secondary"
            >
              ← Previous
            </button>
            
            <button 
              onClick={skipTutorial}
              className="tutorial-btn tutorial-btn-skip"
            >
              Skip Tutorial
            </button>
            
            <button 
              onClick={nextStep}
              className="tutorial-btn tutorial-btn-primary"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Close button */}
      <button className="tutorial-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default SiteTutorial;

