import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { translations } from './translations';
import EnhancedMiniSlots from './components/EnhancedMiniSlots';
import ExactOdometer from './components/ExactOdometer';
import PageRefreshFireworks from './components/PageRefreshFireworks';
import FileExplorerFilter from './components/FileExplorerFilter';
import CustomAlert from './components/CustomAlert';
import BannerAd from './components/BannerAd';
import ProfilePage from './components/ProfilePage';
import TournamentModal from './components/TournamentModal';
import TermsOfService from './components/TermsOfService';
import ShopModal from './components/ShopModal';
import Leaderboard from './components/Leaderboard';
import RulesGuide from './components/RulesGuide';
import LiveModal from './components/LiveModal';
import LivePage from './components/LivePage';
import MusicModal from './components/MusicModal';
import MusicBar from './components/MusicBar';
import SiteTutorial from './components/SiteTutorial';
import CampaignMode from './components/CampaignMode';
import AchievementsModal from './components/AchievementsModal';
import ThemesModal from './components/ThemesModal';
import SinglePlayerLobby from './components/SinglePlayerLobby';
import MultiplayerLobby from './components/MultiplayerLobby';
import DailyDiceGame from './components/DailyDiceGame';
import AuctionWindow from './components/AuctionWindow';
import AuctionPage from './components/AuctionPage';
import SettingsModal from './components/SettingsModal';

function App() {
  const [language, setLanguage] = useState('en');
  const [layoutColumns, setLayoutColumns] = useState(4);
  const [filterType, setFilterType] = useState('default');
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showMiniSlots, setShowMiniSlots] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRulesGuide, setShowRulesGuide] = useState(false);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showLivePage, setShowLivePage] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showSiteTutorial, setShowSiteTutorial] = useState(false);
  const [tutorialHighlight, setTutorialHighlight] = useState(null);
  const [showCampaignMode, setShowCampaignMode] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(localStorage.getItem('selectedVariation') || null);
  const [selectedPlayerMode, setSelectedPlayerMode] = useState(localStorage.getItem('selectedPlayerMode') || null);
  const [prestigeLevel, setPrestigeLevel] = useState(parseInt(localStorage.getItem('prestigeLevel')) || 0);
  const [totalXP, setTotalXP] = useState(parseInt(localStorage.getItem('totalXP')) || 0);
  const [achievements, setAchievements] = useState(JSON.parse(localStorage.getItem('achievements')) || []);
  const [currentAchievementSet, setCurrentAchievementSet] = useState(0);
  const [showSinglePlayerLobby, setShowSinglePlayerLobby] = useState(false);
  const [showMultiplayerLobby, setShowMultiplayerLobby] = useState(false);
  const [showVariationsDropdown, setShowVariationsDropdown] = useState(false);
  const [showPlayersDropdown, setShowPlayersDropdown] = useState(false);
  const [showFAQDropdown, setShowFAQDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showThemesModal, setShowThemesModal] = useState(false);
  const [showDailyDiceGame, setShowDailyDiceGame] = useState(false);
  const [showAuctionWindow, setShowAuctionWindow] = useState(false);
  const [showAuctionPage, setShowAuctionPage] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedChatLanguage, setSelectedChatLanguage] = useState('en');
  const [userMediaCount, setUserMediaCount] = useState({ images: 0, videoSeconds: 0 });
  const [onlineUsers, setOnlineUsers] = useState(517);
  const [totalVisitors, setTotalVisitors] = useState(1509101);
  const [fireworksTrigger, setFireworksTrigger] = useState(0);
  const [buttonUsage, setButtonUsage] = useState({});
  const [buttonOrder, setButtonOrder] = useState([
    'live', 'shop', 'auctions', 'variations', 'players', 'singlePlayer',
    'multiplayer', 'campaign', 'rulesGuide', 'themes', 'leaderboard',
    'achievements', 'profile', 'music', 'settings', 'faq'
  ]);
  const [alert, setAlert] = useState({ message: "", type: "info", isVisible: false });
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [sloganAnimated, setSloganAnimated] = useState(false);
  const [sloganWords, setSloganWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [cursorRotation, setCursorRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Game configuration arrays
  const variations = [
    'Classic', 'Speed', 'Puzzle', 'Adventure', 'Arcade', 'Strategy',
    'Action', 'RPG', 'Simulation', 'Sports', 'Racing', 'Fighting'
  ];

  const playerModes = [1, 2, 3, 4, 5, 6, 7, 8];

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type, isVisible: true });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isVisible: false }));
  };

  // Handle slogan animation
  const handleSloganClick = () => {
    if (!sloganAnimated) {
      const words = t('slogan').split(' ');
      setSloganWords(words);
      setSloganAnimated(true);
      setCurrentWordIndex(0);
      
      // Animate words appearing one by one
      words.forEach((word, index) => {
        setTimeout(() => {
          setCurrentWordIndex(index + 1);
        }, (index + 1) * 500);
      });
    }
  };

  // Trigger fireworks on page load/refresh and check for daily dice game
  useEffect(() => {
    setFireworksTrigger(prev => prev + 1);
    
    // Check if daily dice game should be shown
    const checkDailyDice = () => {
      const today = new Date().toDateString();
      const lastPlayed = localStorage.getItem('dailyDiceLastPlayed');
      
      if (lastPlayed !== today) {
        // Show daily dice game if not played today
        setTimeout(() => {
          setShowDailyDiceGame(true);
        }, 2000); // Show after 2 seconds
      }
    };
    
    checkDailyDice();
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Simulate odometer changes
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 3));
      setTotalVisitors(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);

    // Cursor rotation every 3 seconds
    const cursorInterval = setInterval(() => {
      setCursorRotation(prev => (prev + 90) % 360);
    }, 3000);

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setShowVariationsDropdown(false);
        setShowPlayersDropdown(false);
        setShowFAQDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const buttonConfigs = {
    live: { emoji: '🔴', color: 'from-red-600 to-red-800', action: 'newWindow' },
    shop: { emoji: '🛒', color: 'from-green-600 to-green-800', action: 'modal' },
    auctions: { emoji: '🏆', color: 'from-yellow-600 to-yellow-800', action: 'newWindow' },
    variations: { emoji: '🎲', color: 'from-purple-600 to-purple-800', action: 'dropdown' },
    players: { emoji: '👥', color: 'from-blue-600 to-blue-800', action: 'dropdown' },
    singlePlayer: { emoji: '🎮', color: 'from-indigo-600 to-indigo-800', action: 'newWindow' },
    multiplayer: { emoji: '🌐', color: 'from-teal-600 to-teal-800', action: 'newWindow' },
    campaign: { emoji: '⚔️', color: 'from-orange-600 to-orange-800', action: 'modal' },
    rulesGuide: { emoji: '📖', color: 'from-emerald-600 to-emerald-800', action: 'modal' },
    themes: { emoji: '🎨', color: 'from-pink-600 to-pink-800', action: 'modal' },
    leaderboard: { emoji: '🏅', color: 'from-amber-600 to-amber-800', action: 'modal' },
    achievements: { emoji: '🏆', color: 'from-lime-600 to-lime-800', action: 'modal' },
    profile: { emoji: '👤', color: 'from-violet-600 to-violet-800', action: 'newWindow' },
    music: { emoji: '🎵', color: 'from-rose-600 to-rose-800', action: 'modal' },
    settings: { emoji: '⚙️', color: 'from-gray-600 to-gray-800', action: 'modal' },
    faq: { emoji: '❓', color: 'from-red-700 to-red-900', action: 'dropdown' }
  };  const handleButtonClick = (buttonKey) => {
    const usage = buttonUsage[buttonKey] || 0;
    setButtonUsage(prev => ({ ...prev, [buttonKey]: usage + 1 }));

    const config = buttonConfigs[buttonKey];
    
    // Check if variation and player mode are selected for certain features
    if (['achievements', 'singlePlayer', 'multiplayer'].includes(buttonKey)) {
      if (!selectedVariation || !selectedPlayerMode) {
        showAlert('Please select a Variation and Player Mode before accessing this feature.', 'warning');
        return;
      }
    }
    
    if (buttonKey === 'live') {
      // Open Live in same tab like Profile
      setShowLivePage(true);
      return;
    }
    
    if (buttonKey === 'singlePlayer') {
      setShowSinglePlayerLobby(true);
      return;
    }
    
    if (buttonKey === 'multiplayer') {
      setShowMultiplayerLobby(true);
      return;
    }
    
    if (buttonKey === 'profile') {
      setShowProfilePage(true);
      return;
    }
    
    if (buttonKey === 'shop') {
      setShowShopModal(true);
      return;
    }
    
    if (buttonKey === 'auctions') {
      setShowAuctionPage(true);
      return;
    }
    
    if (buttonKey === 'leaderboard') {
      setShowLeaderboard(true);
      return;
    }
    
    if (buttonKey === 'rulesGuide') {
      setShowRulesGuide(true);
      return;
    }
    
    if (buttonKey === 'music') {
      setShowMusicModal(true);
      return;
    }
    
    if (buttonKey === 'campaign') {
      setShowCampaignMode(true);
      return;
    }
    
    if (buttonKey === 'achievements') {
      setShowAchievementsModal(true);
      return;
    }
    
    if (buttonKey === 'themes') {
      setShowThemesModal(true);
      return;
    }
    
    if (buttonKey === 'settings') {
      setShowSettingsModal(true);
      return;
    }
    
    if (buttonKey === 'variations') {
      setShowVariationsDropdown(!showVariationsDropdown);
      setShowPlayersDropdown(false);
      setShowFAQDropdown(false);
      return;
    }
    
    if (buttonKey === 'players') {
      setShowPlayersDropdown(!showPlayersDropdown);
      setShowVariationsDropdown(false);
      setShowFAQDropdown(false);
      return;
    }
    
    if (buttonKey === 'faq') {
      setShowFAQDropdown(!showFAQDropdown);
      setShowVariationsDropdown(false);
      setShowPlayersDropdown(false);
      return;
    }
    
    if (config.action === 'newWindow') {
      window.open(`/${buttonKey}`, '_blank');
    } else if (config.action === 'modal') {
      showAlert(`${t(buttonKey)} modal would open here`, 'info');
    } else if (config.action === 'dropdown') {
      showAlert(`${t(buttonKey)} dropdown would appear here`, 'info');
    }
  };

  // Tutorial navigation handler
  const handleTutorialNavigation = (action, stepData) => {
    switch (action) {
      case 'closeAllModals':
        setShowProfilePage(false);
        setShowTournamentModal(false);
        setShowTermsModal(false);
        setShowShopModal(false);
        setShowLeaderboard(false);
        setShowRulesGuide(false);
        setShowLiveModal(false);
        setShowMusicModal(false);
        setTutorialHighlight(null);
        break;
      
      case 'highlightButton':
        setTutorialHighlight(stepData.buttonId);
        break;
      
      case 'openModal':
        setTutorialHighlight(null);
        switch (stepData.modalType) {
          case 'live':
            setShowLiveModal(true);
            break;
          case 'shop':
            setShowShopModal(true);
            break;
          case 'rules':
            setShowRulesGuide(true);
            break;
          case 'leaderboard':
            setShowLeaderboard(true);
            break;
          case 'profile':
            setShowProfilePage(true);
            break;
          case 'music':
            setShowMusicModal(true);
            break;
        }
        break;
      
      case 'highlightFeature':
        setTutorialHighlight(stepData.featureId);
        break;
      
      case 'complete':
        setTutorialHighlight(null);
        setShowSiteTutorial(false);
        break;
    }
  };

  // Prestige and Achievement Reset Handlers
  const handlePrestigeReset = () => {
    const newPrestigeLevel = prestigeLevel + 1;
    const newTotalXP = totalXP + 10000;
    
    setPrestigeLevel(newPrestigeLevel);
    setTotalXP(newTotalXP);
    setAchievements([]);
    setCurrentAchievementSet(0);
    
    localStorage.setItem('prestigeLevel', newPrestigeLevel.toString());
    localStorage.setItem('totalXP', newTotalXP.toString());
    localStorage.setItem('achievements', JSON.stringify([]));
    
    showAlert(`Congratulations! You've reached Prestige Level ${newPrestigeLevel} and earned 10,000 XP!`, 'success');
  };

  const handleDifficultyReset = () => {
    setAchievements([]);
    setCurrentAchievementSet(0);
    
    localStorage.setItem('achievements', JSON.stringify([]));
    
    showAlert('Achievements have been reset to easier difficulty. No prestige or XP bonus awarded.', 'info');
  };

  // Handle variation and player mode selection with localStorage persistence
  const handleVariationChange = (variation) => {
    setSelectedVariation(variation);
    localStorage.setItem('selectedVariation', variation);
  };

  const handlePlayerModeChange = (playerMode) => {
    setSelectedPlayerMode(playerMode);
    localStorage.setItem('selectedPlayerMode', playerMode);
  };

  const sortButtons = (buttons, type) => {
    switch (type) {
      case 'mostUsed':
        return [...buttons].sort((a, b) => (buttonUsage[b] || 0) - (buttonUsage[a] || 0));
      case 'leastUsed':
        return [...buttons].sort((a, b) => (buttonUsage[a] || 0) - (buttonUsage[b] || 0));
      case 'az':
        return [...buttons].sort((a, b) => t(a).localeCompare(t(b)));
      case 'za':
        return [...buttons].sort((a, b) => t(b).localeCompare(t(a)));
      case 'lightToDark':
        return [...buttons].sort((a, b) => a.localeCompare(b));
      case 'darkToLight':
        return [...buttons].sort((a, b) => b.localeCompare(a));
      default:
        return buttons;
    }
  };

  const getFilteredButtons = () => {
    return sortButtons(buttonOrder, filterType);
  };

  const renderButton = (buttonKey, index) => {
    const config = buttonConfigs[buttonKey];
    const usage = buttonUsage[buttonKey] || 0;
    const isLive = buttonKey === 'live';
    const isDropdown = config.action === 'dropdown';

    return (
      <button
        key={buttonKey}
        onClick={() => handleButtonClick(buttonKey)}
        className={`
          relative overflow-hidden rounded-lg p-6 text-white font-bold text-lg
          bg-gradient-to-br ${config.color}
          hover:scale-105 transform transition-all duration-200
          shadow-lg hover:shadow-xl
          ${isLive ? 'animate-pulse' : ''}
        `}
        style={{
          minHeight: '120px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {isLive && (
          <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-ping"></div>
        )}
        {isDropdown && (
          <div className="absolute top-2 right-2 text-white text-xl">▼</div>
        )}
        <span className="text-3xl">{config.emoji}</span>
        <span className="text-center leading-tight">
          {t(buttonKey)}
          {usage > 0 && <div className="text-xs opacity-75">({usage} uses)</div>}
        </span>
      </button>
    );
  };

  const getGridCols = () => {
    switch (layoutColumns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 4: return 'grid-cols-4';
      default: return 'grid-cols-4';
    }
  };

  const captureScreenshot = async () => {
    if (userMediaCount.images >= 100) {
      showAlert(t('mediaLimitReached'), 'warning');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.fillText('Screenshot captured!', 50, 50);
      
      const dataUrl = canvas.toDataURL();
      setUserMediaCount(prev => ({ ...prev, images: prev.images + 1 }));
      
      setChatMessages(prev => [...prev, {
        type: 'user',
        content: 'Screenshot captured',
        image: dataUrl,
        timestamp: new Date()
      }]);
      
      showAlert('Screenshot captured successfully!', 'success');
    } catch (error) {
      console.error('Screenshot failed:', error);
      showAlert('Failed to capture screenshot', 'error');
    }
  };

  const startVideoRecording = async () => {
    if (userMediaCount.videoSeconds >= 100) {
      showAlert(t('videoLimitReached'), 'warning');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setUserMediaCount(prev => ({ ...prev, videoSeconds: prev.videoSeconds + 5 }));
        
        setChatMessages(prev => [...prev, {
          type: 'user',
          content: 'Video recorded (5 seconds)',
          video: url,
          timestamp: new Date()
        }]);
        
        showAlert('Video recorded successfully!', 'success');
      };

      mediaRecorder.start();
      showAlert('Recording started...', 'info');
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
      }, 5000);
    } catch (error) {
      console.error('Video recording failed:', error);
      showAlert('Failed to record video', 'error');
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, {
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    }]);

    // Simulate AI response in selected language
    setTimeout(() => {
      const aiResponseKey = 'aiResponse';
      const responseText = translations[selectedChatLanguage]?.[aiResponseKey] || translations.en[aiResponseKey] || 'AI Response';
      setChatMessages(prev => [...prev, {
        type: 'ai',
        content: `${responseText}: ${chatInput}`,
        timestamp: new Date()
      }]);
    }, 1000);

    setChatInput('');
  };

  // Music handlers
  const handlePlayMusic = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    // In a real app, this would advance to the next track in the playlist
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 500);
  };

  const handlePreviousTrack = () => {
    // In a real app, this would go to the previous track in the playlist
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 500);
  };

  const handleCloseMusicBar = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const handleVolumeChange = (volume) => {
    setMusicVolume(volume);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative"
      style={{
        cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="%23FFD700" stroke="%23FFA500" stroke-width="2" transform="rotate(${cursorRotation} 16 16)"/><polygon points="16,8 20,14 16,12 12,14" fill="%23FF6B6B" transform="rotate(${cursorRotation} 16 16)"/></svg>') 16 16, auto`,
        transition: isLoading ? 'none' : 'cursor 0.3s ease'
      }}
    >
      <BannerAd translations={translations[language]} />
      <PageRefreshFireworks trigger={fireworksTrigger} />
      <CustomAlert 
        message={alert.message}
        type={alert.type}
        isVisible={alert.isVisible}
        onClose={hideAlert}
      />
      
      {/* Corner Buttons */}


      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
          className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform"
        >
          ☰
        </button>
        {showHamburgerMenu && (
          <div className="absolute top-16 right-0 bg-gray-800 rounded-lg p-4 min-w-48 shadow-xl">
            <div className="text-yellow-400 font-bold mb-2">💰 Coins: 1,250</div>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  setShowProfilePage(true);
                  setShowHamburgerMenu(false);
                }}
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
              >
                👤 {t('profile')}
              </button>
              <button 
                onClick={() => {
                  window.open('/auctions', '_blank');
                  setShowHamburgerMenu(false);
                }}
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
              >
                🏆 {t('auctions')}
              </button>
              <button 
                onClick={() => {
                  setShowSettingsModal(true);
                  setShowHamburgerMenu(false);
                }}
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
              >
                ⚙️ {t('settings')}
              </button>
              <button 
                onClick={() => {
                  setShowMusicModal(true);
                  setShowHamburgerMenu(false);
                }}
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
              >
                🎵 {t('music')}
              </button>
              <button 
                onClick={() => {
                  window.open('https://youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                  setShowHamburgerMenu(false);
                }}
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
              >
                📺 Watch Ads
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 left-4 z-50">
        <button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform"
        >
          🤖
        </button>
        {showChatbot && (
          <div className="absolute bottom-16 left-0 bg-gray-800 rounded-lg p-4 w-80 h-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{t('aiAssistant')}</h3>
              <select 
                value={selectedChatLanguage} 
                onChange={(e) => setSelectedChatLanguage(e.target.value)}
                className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
              >
                <option value="en">{t('english')}</option>
                <option value="es">{t('spanish')}</option>
                <option value="fr">{t('french')}</option>
                <option value="de">{t('german')}</option>
                <option value="it">{t('italian')}</option>
                <option value="pt">{t('portuguese')}</option>
                <option value="ru">{t('russian')}</option>
                <option value="zh">{t('chinese')}</option>
                <option value="ja">{t('japanese')}</option>
                <option value="ko">{t('korean')}</option>
              </select>
            </div>
            
            <div className="h-48 overflow-y-auto mb-4 bg-gray-900 rounded p-2">
              {chatMessages.length === 0 && (
                <div className="mb-2 text-green-300">
                  <div className="text-xs opacity-75">{new Date().toLocaleTimeString()}</div>
                  <div>{t('chatbotWelcome')}</div>
                </div>
              )}
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-blue-300' : 'text-green-300'}`}>
                  <div className="text-xs opacity-75">{msg.timestamp.toLocaleTimeString()}</div>
                  <div>{msg.content}</div>
                  {msg.image && <img src={msg.image} alt="Screenshot" className="max-w-full h-20 object-cover rounded mt-1" />}
                  {msg.video && <video src={msg.video} controls className="max-w-full h-20 rounded mt-1" />}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <button 
                  onClick={captureScreenshot}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  disabled={userMediaCount.images >= 100}
                >
                  📸 Screenshot ({userMediaCount.images}/100)
                </button>
                <button 
                  onClick={startVideoRecording}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  disabled={userMediaCount.videoSeconds >= 100}
                >
                  🎥 Record ({userMediaCount.videoSeconds}/100s)
                </button>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder={t('typeMessage')}
                  className="flex-1 bg-gray-700 text-white rounded px-3 py-2 text-sm"
                />
                <button 
                  onClick={sendChatMessage}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setShowMiniSlots(!showMiniSlots)}
          className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform"
        >
          🎰
        </button>
      </div>

      {showMiniSlots && <EnhancedMiniSlots onClose={() => setShowMiniSlots(false)} />}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4">{t('gameShell')}</h1>
          <p className="text-xl text-gray-300 mb-2">{t('subtitle')}</p>
            <div 
              className="text-lg font-semibold cursor-pointer select-none slogan-text"
              onClick={handleSloganClick}
            >
              {sloganAnimated ? (
                <span>
                  {sloganWords.slice(0, currentWordIndex).map((word, index) => (
                    <span 
                      key={index}
                      className="inline-block mr-2 animated-word"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ) : (
                t("slogan")
              )}
            </div>
        </div>

        {/* Filter Controls - Above Buttons */}
        <div className="flex justify-center mb-6">
          <FileExplorerFilter 
            onFilterChange={setFilterType}
            currentFilter={filterType}
            translations={translations[language]}
          />
        </div>

        {/* Main Buttons Grid */}
        <div className={`grid ${getGridCols()} gap-4 max-w-6xl mx-auto mb-6`}>
          {getFilteredButtons().map((buttonKey, index) => {
            const config = buttonConfigs[buttonKey];
            const isDropdown = config.action === 'dropdown';
            
            if (isDropdown) {
              // Wrap dropdown buttons in relative container
              return (
                <div key={buttonKey} className="relative">
                  {renderButton(buttonKey, index)}
                  {/* Render dropdown directly below the button */}
                  {buttonKey === 'variations' && showVariationsDropdown && (
                    <div className="absolute z-50 bg-purple-700 rounded-lg p-4 border border-purple-600 mt-2 w-full" style={{ 
                      top: '100%',
                      left: '0'
                    }}>
                      <h3 className="text-lg font-bold mb-3 text-white">Select Variation</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {variations.map((variation) => (
                          <button
                            key={variation}
                            onClick={() => {
                              handleVariationChange(variation);
                              setShowVariationsDropdown(false);
                            }}
                            className={`p-2 rounded text-sm transition-colors ${
                              selectedVariation === variation
                                ? 'bg-purple-500 text-white'
                                : 'bg-purple-800 hover:bg-purple-600 text-gray-200'
                            }`}
                          >
                            {variation}
                          </button>
                        ))}
                      </div>
                      {selectedVariation && (
                        <p className="mt-3 text-sm text-gray-200">
                          Selected: {selectedVariation}
                        </p>
                      )}
                    </div>
                  )}
                  {buttonKey === 'players' && showPlayersDropdown && (
                    <div className="absolute z-50 bg-blue-700 rounded-lg p-4 border border-blue-600 mt-2 w-full" style={{ 
                      top: '100%',
                      left: '0'
                    }}>
                      <h3 className="text-lg font-bold mb-3 text-white">Select Players</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {playerModes.map((players) => (
                          <button
                            key={players}
                            onClick={() => {
                              handlePlayerModeChange(players);
                              setShowPlayersDropdown(false);
                            }}
                            className={`p-2 rounded text-sm transition-colors ${
                              selectedPlayerMode === players
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-800 hover:bg-blue-600 text-gray-200'
                            }`}
                          >
                            {players} Player{players > 1 ? 's' : ''}
                          </button>
                        ))}
                      </div>
                      {selectedPlayerMode && (
                        <p className="mt-3 text-sm text-gray-200">
                          Selected: {selectedPlayerMode} Player{selectedPlayerMode > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  )}
                  {buttonKey === 'faq' && showFAQDropdown && (
                    <div className="absolute z-50 bg-red-700 rounded-lg p-4 border border-red-600 mt-2 w-full" style={{ 
                      top: '100%',
                      left: '0',
                      maxHeight: '400px',
                      overflowY: 'auto'
                    }}>
                      <h3 className="text-lg font-bold mb-3 text-white">Frequently Asked Questions</h3>
                      <div className="space-y-2">
                        <div className="bg-red-800 rounded-lg p-3">
                          <h4 className="font-semibold text-yellow-400 mb-2">1. How do player stats work?</h4>
                          <p className="text-sm text-gray-200">Player stats track your performance across games, including wins, losses, accuracy, and skill progression. Higher stats unlock better rewards and achievements.</p>
                        </div>
                        <div className="bg-red-800 rounded-lg p-3">
                          <h4 className="font-semibold text-yellow-400 mb-2">2. What affects my ranking?</h4>
                          <p className="text-sm text-gray-200">Your ranking is based on win rate, consistency, difficulty of opponents, and recent performance. Playing regularly and winning against skilled players improves your rank faster.</p>
                        </div>
                        <div className="bg-red-800 rounded-lg p-3">
                          <h4 className="font-semibold text-yellow-400 mb-2">3. How do I improve my accuracy?</h4>
                          <p className="text-sm text-gray-200">Practice in single-player mode, focus on precision over speed, and use the training modes. Your accuracy directly impacts your score multiplier and achievement progress.</p>
                        </div>
                        <div className="bg-red-800 rounded-lg p-3">
                          <h4 className="font-semibold text-yellow-400 mb-2">4. What are prestige levels?</h4>
                          <p className="text-sm text-gray-200">Prestige levels are earned by completing all achievements in a set. Each prestige grants bonus XP, exclusive rewards, and access to harder achievement sets with better rewards.</p>
                        </div>
                        <div className="bg-red-800 rounded-lg p-3">
                          <h4 className="font-semibold text-yellow-400 mb-2">5. How does the trophy system work?</h4>
                          <p className="text-sm text-gray-200">Trophies are earned through consistent performance. There are 11 tiers with 3 subdivisions each. Higher tiers unlock exclusive features, better matchmaking, and special recognition.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              // Regular buttons without dropdowns
              return renderButton(buttonKey, index);
            }
          })}
        </div>

        {/* Column Controls - Below Buttons */}
        <div className="flex justify-center mb-16">
          <select 
            value={layoutColumns} 
            onChange={(e) => setLayoutColumns(Number(e.target.value))}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-600 shadow-lg"
          >
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={4}>4 Columns</option>
          </select>
        </div>

      </div>
      
      {/* Footer - Full Width */}
      <footer className="bg-gray-900 text-white py-8 mt-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="container mx-auto px-4">
          {/* Odometers */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <ExactOdometer value={onlineUsers} label="ONLINE NOW" />
            <ExactOdometer value={totalVisitors} label="ALL TIME VISITORS" />
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-400">ACCESSIBILITY</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Accessibility Options</a></li>
                <li><button onClick={() => setShowSuggestionsModal(true)} className="hover:text-blue-300 text-left">Suggestions</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-400">COMPANY</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-300">About Us</a></li>
                <li><a href="#" className="hover:text-orange-300">Press Kit</a></li>
                <li><a href="#" className="hover:text-orange-300">Newsletter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-purple-400">COMPETITIONS</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setShowTournamentModal(true)} className="hover:text-purple-300 text-left">Tournaments</button></li>
                <li><button onClick={() => setShowTournamentModal(true)} className="hover:text-purple-300 text-left">Registration</button></li>
                <li><a href="#" className="hover:text-purple-300">Prizes</a></li>
                <li><a href="#" className="hover:text-purple-300">Awards</a></li>
                <li><a href="#" className="hover:text-purple-300">Player of the Month</a></li>
                <li><a href="#" className="hover:text-purple-300">Hall of Fame</a></li>
                <li><a href="#" className="hover:text-purple-300">Credits & Credibility</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-green-400">LEGAL</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-300">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-green-300">Community Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-red-400">SUPPORT</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-red-300">Help Center</a></li>
                <li><a href="#" className="hover:text-red-300">FAQs</a></li>
                <li><a href="#" className="hover:text-red-300">Report a Bug</a></li>
                <li><a href="#" className="hover:text-red-300">Feature Request</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-cyan-400">SOCIAL MEDIA</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://facebook.com" className="hover:text-cyan-300 flex items-center gap-2">📘 Facebook</a></li>
                <li><a href="https://x.com" className="hover:text-cyan-300 flex items-center gap-2">❌ X</a></li>
                <li><a href="https://instagram.com" className="hover:text-cyan-300 flex items-center gap-2">📷 Instagram</a></li>
                <li><a href="https://snapchat.com" className="hover:text-cyan-300 flex items-center gap-2">👻 Snapchat</a></li>
                <li><a href="https://youtube.com" className="hover:text-cyan-300 flex items-center gap-2">📺 YouTube</a></li>
                <li><a href="https://linkedin.com" className="hover:text-cyan-300 flex items-center gap-2">💼 LinkedIn</a></li>
              </ul>
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex justify-center items-center border-t border-gray-700 pt-6">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800 text-white rounded px-3 py-2 border border-gray-600"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
          </div>

          {/* Mobile App Downloads */}
          <div className="text-center mt-8">
            <h3 className="text-lg font-bold mb-4">{t('downloadMobileApp')}</h3>
            <div className="flex justify-center gap-4">
              <a 
                href="https://apps.apple.com/app/game-shell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                📱 iOS App
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.gameshell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🤖 Android App
              </a>
            </div>
          </div>
        </div>
      </footer>


      {/* Tournament Registration Modal */}
      {showTournamentModal && (
        <TournamentModal 
          language={language} 
          onClose={() => setShowTournamentModal(false)}
          onShowTerms={() => setShowTermsModal(true)}
        />
      )}
      
      {/* Terms of Service Modal */}
      {showTermsModal && (
        <TermsOfService 
          language={language} 
          onClose={() => setShowTermsModal(false)}
        />
      )}
      
      {/* Shop Modal */}
      {showShopModal && (
        <ShopModal 
          language={language} 
          onClose={() => setShowShopModal(false)}
        />
      )}
      
      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <Leaderboard 
          language={language} 
          onClose={() => setShowLeaderboard(false)}
        />
      )}
      
      {/* Rules Guide Modal */}
      {showRulesGuide && (
        <RulesGuide 
          language={language} 
          onClose={() => setShowRulesGuide(false)}
          onStartSiteTutorial={() => setShowSiteTutorial(true)}
        />
      )}
      
      {/* Live Modal */}
      {showLiveModal && (
        <LiveModal 
          language={language} 
          onClose={() => setShowLiveModal(false)}
        />
      )}
      
      {/* Music Modal */}
      {showMusicModal && (
        <MusicModal 
          language={language} 
          onClose={() => setShowMusicModal(false)}
          onPlayMusic={handlePlayMusic}
        />
      )}
      
      {/* Music Bar */}
      {currentTrack && (
        <MusicBar 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrevious={handlePreviousTrack}
          onClose={handleCloseMusicBar}
          onVolumeChange={handleVolumeChange}
          volume={musicVolume}
        />
      )}
      
      {/* Site Tutorial */}
      {showSiteTutorial && (
        <SiteTutorial 
          language={language} 
          onClose={() => setShowSiteTutorial(false)}
          onNavigate={handleTutorialNavigation}
        />
      )}
      
      {/* Campaign Mode */}
      {showCampaignMode && (
        <CampaignMode 
          language={language} 
          onClose={() => setShowCampaignMode(false)}
        />
      )}
      
      {/* Achievements Modal */}
      {showAchievementsModal && (
        <AchievementsModal 
          language={language} 
          onClose={() => setShowAchievementsModal(false)}
          selectedVariation={selectedVariation}
          selectedPlayerMode={selectedPlayerMode}
          prestigeLevel={prestigeLevel}
          totalXP={totalXP}
          onPrestigeReset={handlePrestigeReset}
          onDifficultyReset={handleDifficultyReset}
          achievements={achievements}
          onAchievementUpdate={setAchievements}
        />
      )}
      
      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal 
          language={language} 
          onClose={() => setShowSettingsModal(false)}
        />
      )}
      
      {/* Themes Modal */}
      {showThemesModal && (
        <ThemesModal 
          language={language} 
          onClose={() => setShowThemesModal(false)}
        />
      )}
      
      {/* Single Player Lobby */}
      {showSinglePlayerLobby && (
        <SinglePlayerLobby 
          language={language} 
          onClose={() => setShowSinglePlayerLobby(false)}
          onStartGame={(gameConfig) => {
            console.log('Starting single player game with config:', gameConfig);
            setShowSinglePlayerLobby(false);
          }}
        />
      )}
      
      {/* Multiplayer Lobby */}
      {showMultiplayerLobby && (
        <MultiplayerLobby 
          language={language} 
          onClose={() => setShowMultiplayerLobby(false)}
          onJoinGame={(gameConfig) => {
            console.log('Joining multiplayer game with config:', gameConfig);
            setShowMultiplayerLobby(false);
          }}
        />
      )}
      
      {/* Daily Dice Game */}
      {showDailyDiceGame && (
        <DailyDiceGame 
          language={language} 
          onClose={() => setShowDailyDiceGame(false)}
          onComplete={(result) => {
            console.log('Daily dice result:', result);
            setShowDailyDiceGame(false);
          }}
        />
      )}
      
      {/* Auction Window */}
      {showAuctionWindow && (
        <AuctionWindow 
          language={language} 
          onClose={() => setShowAuctionWindow(false)}
        />
      )}
      
      {/* Live Page */}
      {showLivePage && (
        <LivePage 
          language={language} 
          onClose={() => setShowLivePage(false)}
        />
      )}
      
      {/* Profile Page */}
      {showProfilePage && (
        <ProfilePage 
          language={language} 
          onClose={() => setShowProfilePage(false)}
        />
      )}
      
      {/* Auction Page */}
      {showAuctionPage && (
        <AuctionPage 
          language={language} 
          onClose={() => setShowAuctionPage(false)}
        />
      )}
    </div>
  );
}

export default App;
