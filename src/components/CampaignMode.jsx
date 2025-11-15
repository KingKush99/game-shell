import React from 'react';
import './CampaignMode.css';

/**
 * CampaignMode
 * NOTE: This is a lightweight placeholder that *visually* nods toward
 * a Governor-of-Poker‑style map. It does not implement real walking logic,
 * but it gives you:
 * - A scrolling map panel
 * - 10 city nodes along a path
 * - Clicking a city "enters" that city and shows a big table preview
 *   where in the future you can embed your real tabletop game.
 */
const cities = [
  { id: 1, name: 'Beginners Lake', stakes: '$1k – $40k' },
  { id: 2, name: 'High Rollers Valley', stakes: '$10k – $300k' },
  { id: 3, name: 'Pro Forest', stakes: '$100k – $2M' },
  { id: 4, name: 'Million Event', stakes: '$1M – $1M' },
  { id: 5, name: 'Gold Rocks', stakes: '$250k – $10M' },
  { id: 6, name: 'Heads Up Challenge', stakes: '$5k – $1M' },
  { id: 7, name: 'Vegas Area', stakes: '$1M – $1B' },
  { id: 8, name: 'Riverfront Docks', stakes: '$5k – $300k' },
  { id: 9, name: 'Mountain Pass', stakes: '$25k – $500k' },
  { id: 10, name: 'Sky City', stakes: '$100k – $5M' }
];

const CampaignMode = ({ language, onClose }) => {
  const [selectedCity, setSelectedCity] = React.useState(cities[0]);

  return (
    <div className="campaign-backdrop" onClick={onClose}>
      <div className="campaign-shell" onClick={(e) => e.stopPropagation()}>
        <div className="campaign-header">
          <h2>Campaign Map</h2>
          <button className="campaign-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="campaign-layout">
          {/* Map panel */}
          <div className="campaign-map-pane">
            <div className="campaign-path" />
            {cities.map((city, idx) => (
              <button
                key={city.id}
                className={
                  'campaign-city-node' +
                  (selectedCity.id === city.id ? ' active' : '')
                }
                style={{ top: 30 + idx * 45 }}
                onClick={() => setSelectedCity(city)}
              >
                <div className="campaign-city-dot" />
                <div className="campaign-city-label">
                  <div className="campaign-city-name">{city.name}</div>
                  <div className="campaign-city-stakes">{city.stakes}</div>
                </div>
              </button>
            ))}
          </div>

          {/* City detail / table preview */}
          <div className="campaign-detail-pane">
            <h3>{selectedCity.name}</h3>
            <p className="campaign-detail-sub">
              Stakes: {selectedCity.stakes}
            </p>
            <div className="campaign-table-preview">
              <div className="campaign-table-rail" />
              <div className="campaign-table-cloth">
                <div className="campaign-table-pot">$10,050</div>
                <div className="campaign-table-cards">
                  <span>10♦</span>
                  <span>J♥</span>
                  <span>J♣</span>
                  <span>K♠</span>
                  <span>A♣</span>
                </div>
                <div className="campaign-table-chips">
                  <span>🟡</span>
                  <span>🔴</span>
                  <span>🔵</span>
                  <span>🟢</span>
                </div>
              </div>
              <div className="campaign-table-rail bottom" />
            </div>
            <p className="campaign-detail-note">
              This panel is where you can embed your actual tabletop game
              scene for the selected city (like the second screenshot you 
              shared). For now it's a visual placeholder that matches the vibe.
            </p>
            <button className="campaign-enter-button">
              Enter Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMode;
