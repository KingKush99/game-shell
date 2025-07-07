import React, { useState, useEffect } from 'react';
import './CampaignMode.css';
import { translations } from '../translations';

const CampaignMode = ({ language = 'en', onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [unlockedRegions, setUnlockedRegions] = useState(['azeroth', 'elwynn_forest']);
  const [playerLevel, setPlayerLevel] = useState(15);
  const [completedQuests, setCompletedQuests] = useState(12);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [inCityView, setInCityView] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const [cloudTransition, setCloudTransition] = useState(false);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  // Enhanced campaign regions based on the uploaded map
  const regions = [
    {
      id: 'azeroth',
      name: 'Azeroth',
      level: '1-10',
      position: { top: '45%', left: '15%' },
      unlocked: true,
      quests: 8,
      completed: 8,
      description: 'The central continent where heroes begin their journey.',
      type: 'continent'
    },
    {
      id: 'kalimdor',
      name: 'Kalimdor',
      level: '1-60',
      position: { top: '40%', left: '8%' },
      unlocked: true,
      quests: 180,
      completed: 45,
      description: 'The western continent, home to ancient mysteries and the World Tree.',
      type: 'continent'
    },
    {
      id: 'eastern_kingdoms',
      name: 'Eastern Kingdoms',
      level: '1-60',
      position: { top: '45%', left: '75%' },
      unlocked: true,
      quests: 200,
      completed: 67,
      description: 'The eastern continent full of ancient kingdoms and human settlements.',
      type: 'continent'
    },
    {
      id: 'northrend',
      name: 'Northrend',
      level: '68-80',
      position: { top: '15%', left: '45%' },
      unlocked: false,
      quests: 200,
      completed: 0,
      description: 'The frozen continent where the Lich King awaits in eternal winter.',
      type: 'continent'
    },
    {
      id: 'pandaria',
      name: 'Pandaria',
      level: '85-90',
      position: { top: '70%', left: '45%' },
      unlocked: false,
      quests: 150,
      completed: 0,
      description: 'The mystical land of the Pandaren, shrouded in mists for millennia.',
      type: 'continent'
    },
    {
      id: 'broken_isles',
      name: 'Broken Isles',
      level: '98-110',
      position: { top: '35%', left: '60%' },
      unlocked: false,
      quests: 120,
      completed: 0,
      description: 'Shattered islands where demons once ruled, now reclaimed by heroes.',
      type: 'islands'
    },
    {
      id: 'dragon_isles',
      name: 'Dragon Isles',
      level: '60-70',
      position: { top: '20%', left: '70%' },
      unlocked: false,
      quests: 100,
      completed: 0,
      description: 'The homeland of the mighty dragonflights, awakening after ages.',
      type: 'islands'
    },
    {
      id: 'kul_tiras',
      name: 'Kul Tiras',
      level: '110-120',
      position: { top: '55%', left: '55%' },
      unlocked: false,
      quests: 80,
      completed: 0,
      description: 'The maritime kingdom of the proud Kul Tiran people.',
      type: 'islands'
    },
    {
      id: 'zandalar',
      name: 'Zandalar',
      level: '110-120',
      position: { top: '65%', left: '55%' },
      unlocked: false,
      quests: 85,
      completed: 0,
      description: 'The ancient troll empire, seat of the Zandalari civilization.',
      type: 'islands'
    }
  ];

  const seas = [
    { name: 'The North Sea', position: { top: '8%', left: '45%' }, size: 'large' },
    { name: 'The Great Sea', position: { top: '50%', left: '35%' }, size: 'massive' },
    { name: 'The Frozen Sea', position: { top: '25%', left: '25%' }, size: 'medium' },
    { name: 'The South Seas', position: { top: '75%', left: '35%' }, size: 'large' },
    { name: 'The Maelstrom', position: { top: '45%', left: '30%' }, size: 'small', special: true }
  ];

  const handleRegionClick = (region) => {
    if (region.unlocked) {
      setSelectedRegion(region);
    }
  };

  const handleTeleport = (region) => {
    setCloudTransition(true);
    setIsTransitioning(true);
    
    // Cloud transition animation
    setTimeout(() => {
      setInCityView(true);
      setCharacterPosition({ x: 50, y: 50 }); // Center character in city
    }, 2000);
    
    setTimeout(() => {
      setCloudTransition(false);
      setIsTransitioning(false);
    }, 3000);
  };

  const handleCharacterMove = (event) => {
    if (!inCityView) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    setCharacterPosition({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
  };

  const exitCityView = () => {
    setInCityView(false);
    setSelectedRegion(null);
  };

  const getRegionStatus = (region) => {
    if (!region.unlocked) return 'locked';
    if (region.completed === region.quests) return 'completed';
    if (region.completed > 0) return 'in-progress';
    return 'available';
  };

  if (inCityView) {
    return (
      <div className="campaign-mode-overlay">
        <div className="city-view-container">
          <div className="city-header">
            <h2>🏰 {selectedRegion?.name} - City Exploration</h2>
            <button className="exit-city-btn" onClick={exitCityView}>
              🗺️ Return to Map
            </button>
          </div>
          
          <div className="city-map" onClick={handleCharacterMove}>
            {/* City Buildings */}
            <div className="building inn" style={{ top: '20%', left: '30%' }}>
              <span>🏨 Inn</span>
            </div>
            <div className="building shop" style={{ top: '40%', left: '60%' }}>
              <span>🛒 Shop</span>
            </div>
            <div className="building guild" style={{ top: '60%', left: '20%' }}>
              <span>🏛️ Guild Hall</span>
            </div>
            <div className="building bank" style={{ top: '30%', left: '70%' }}>
              <span>🏦 Bank</span>
            </div>
            <div className="building quest" style={{ top: '70%', left: '50%' }}>
              <span>❗ Quest Giver</span>
            </div>
            
            {/* NPCs */}
            <div className="npc guard" style={{ top: '15%', left: '50%' }}>
              <span>🛡️ Guard</span>
            </div>
            <div className="npc merchant" style={{ top: '45%', left: '40%' }}>
              <span>👨‍💼 Merchant</span>
            </div>
            <div className="npc mage" style={{ top: '65%', left: '70%' }}>
              <span>🧙‍♂️ Mage</span>
            </div>
            
            {/* Player Character */}
            <div 
              className="player-character"
              style={{ 
                top: `${characterPosition.y}%`, 
                left: `${characterPosition.x}%` 
              }}
            >
              🧙‍♂️
            </div>
            
            {/* Movement Instructions */}
            <div className="movement-instructions">
              Click anywhere to move your character
            </div>
          </div>
        </div>
        
        {/* Cloud Transition Overlay */}
        {cloudTransition && (
          <div className="cloud-transition-overlay">
            <div className="transition-cloud cloud-1">☁️</div>
            <div className="transition-cloud cloud-2">☁️</div>
            <div className="transition-cloud cloud-3">☁️</div>
            <div className="transition-cloud cloud-4">☁️</div>
            <div className="transition-cloud cloud-5">☁️</div>
            <div className="transition-cloud cloud-6">☁️</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="campaign-mode-overlay">
      <div className="campaign-mode-container">
        {/* Header */}
        <div className="campaign-header">
          <div className="campaign-title">
            <h1>🗺️ Campaign Mode</h1>
            <div className="player-stats">
              <span className="level">Level {playerLevel}</span>
              <span className="quests">Quests: {completedQuests}/500</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Enhanced Map Container */}
        <div className="map-container">
          <div className="fantasy-world-map">
            {/* Decorative Border */}
            <div className="map-border">
              <div className="corner-decoration top-left">⚔️</div>
              <div className="corner-decoration top-right">🛡️</div>
              <div className="corner-decoration bottom-left">🏰</div>
              <div className="corner-decoration bottom-right">🐉</div>
            </div>

            {/* Map Title */}
            <div className="map-title">
              <h2>AZEROTH</h2>
              <p>The World of Heroes</p>
            </div>

            {/* Compass */}
            <div className="compass">
              <div className="compass-rose">
                <div className="compass-point north">N</div>
                <div className="compass-point east">E</div>
                <div className="compass-point south">S</div>
                <div className="compass-point west">W</div>
              </div>
            </div>

            {/* Seas and Oceans */}
            {seas.map((sea, index) => (
              <div 
                key={index}
                className={`ocean ${sea.size} ${sea.special ? 'maelstrom' : ''}`}
                style={sea.position}
              >
                <span>{sea.name}</span>
                {sea.special && <div className="whirlpool">🌀</div>}
              </div>
            ))}

            {/* Enhanced Regions with Landmasses */}
            {regions.map(region => (
              <div
                key={region.id}
                className={`region ${region.type} ${getRegionStatus(region)}`}
                style={region.position}
                onClick={() => handleRegionClick(region)}
                title={region.unlocked ? region.description : 'Locked - Complete previous regions to unlock'}
              >
                <div className="landmass">
                  <div className="terrain-details">
                    {region.type === 'continent' && <div className="mountains">⛰️</div>}
                    {region.type === 'islands' && <div className="beaches">🏖️</div>}
                  </div>
                </div>
                
                <div className="region-marker">
                  {region.unlocked ? (
                    getRegionStatus(region) === 'completed' ? '✅' : 
                    getRegionStatus(region) === 'in-progress' ? '⚡' : '📍'
                  ) : '🔒'}
                </div>
                <div className="region-name">{region.name}</div>
                <div className="region-level">{region.level}</div>
                
                {/* Enhanced Fog of War with larger white clouds */}
                {!region.unlocked && (
                  <div className="fog-of-war">
                    <div className="large-cloud cloud-1">☁️</div>
                    <div className="large-cloud cloud-2">☁️</div>
                    <div className="large-cloud cloud-3">☁️</div>
                    <div className="large-cloud cloud-4">☁️</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Region Details Panel */}
        {selectedRegion && (
          <div className="region-details">
            <div className="details-header">
              <h3>{selectedRegion.name}</h3>
              <button onClick={() => setSelectedRegion(null)}>✕</button>
            </div>
            <div className="details-content">
              <p className="description">{selectedRegion.description}</p>
              <div className="quest-info">
                <div className="quest-progress">
                  <span>Quests: {selectedRegion.completed}/{selectedRegion.quests}</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(selectedRegion.completed / selectedRegion.quests) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="level-requirement">
                  <span>Recommended Level: {selectedRegion.level}</span>
                </div>
              </div>
              <div className="action-buttons">
                <button 
                  className="start-quest-btn"
                  onClick={() => console.log(`Starting quest in ${selectedRegion.name}`)}
                  disabled={selectedRegion.completed === selectedRegion.quests}
                >
                  {selectedRegion.completed === selectedRegion.quests ? 'Completed' : 'Continue Quest'}
                </button>
                <button 
                  className="teleport-btn"
                  onClick={() => handleTeleport(selectedRegion)}
                  disabled={isTransitioning}
                >
                  {isTransitioning ? '🌀 Teleporting...' : '🌀 Teleport Here'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="map-legend">
          <h4>Legend</h4>
          <div className="legend-item">
            <span className="legend-icon">📍</span>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">⚡</span>
            <span>In Progress</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">✅</span>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🔒</span>
            <span>Locked</span>
          </div>
        </div>
      </div>
      
      {/* Cloud Transition Overlay */}
      {cloudTransition && (
        <div className="cloud-transition-overlay">
          <div className="transition-cloud cloud-1">☁️</div>
          <div className="transition-cloud cloud-2">☁️</div>
          <div className="transition-cloud cloud-3">☁️</div>
          <div className="transition-cloud cloud-4">☁️</div>
          <div className="transition-cloud cloud-5">☁️</div>
          <div className="transition-cloud cloud-6">☁️</div>
          <div className="transition-cloud cloud-7">☁️</div>
          <div className="transition-cloud cloud-8">☁️</div>
        </div>
      )}
    </div>
  );
};

export default CampaignMode;
