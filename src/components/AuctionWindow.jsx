import React, { useState, useEffect } from 'react';
import './AuctionWindow.css';

const AuctionWindow = ({ language = 'en', onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('buy'); // buy or sell
  const [nfts, setNfts] = useState([]);

  // Mock NFT data
  useEffect(() => {
    const mockNfts = [
      {
        id: 1,
        name: 'Cosmic Dragon #001',
        image: '🐉',
        price: 2.5,
        category: 'gaming',
        style: 'image',
        seller: 'DragonMaster',
        timeLeft: '2h 15m',
        bids: 12
      },
      {
        id: 2,
        name: 'Pixel Warrior GIF',
        image: '⚔️',
        price: 1.8,
        category: 'art',
        style: 'gif',
        seller: 'PixelArt99',
        timeLeft: '5h 42m',
        bids: 8
      },
      {
        id: 3,
        name: 'Golden Trophy',
        image: '🏆',
        price: 3.2,
        category: 'collectible',
        style: 'image',
        seller: 'TrophyHunter',
        timeLeft: '1d 3h',
        bids: 25
      },
      {
        id: 4,
        name: 'Magic Spell Book',
        image: '📚',
        price: 0.9,
        category: 'gaming',
        style: 'image',
        seller: 'WizardMage',
        timeLeft: '12h 8m',
        bids: 5
      },
      {
        id: 5,
        name: 'Dancing Cat GIF',
        image: '🐱',
        price: 1.2,
        category: 'meme',
        style: 'gif',
        seller: 'CatLover42',
        timeLeft: '8h 30m',
        bids: 15
      },
      {
        id: 6,
        name: 'Diamond Sword',
        image: '💎',
        price: 4.7,
        category: 'gaming',
        style: 'image',
        seller: 'SwordSmith',
        timeLeft: '3d 12h',
        bids: 33
      }
    ];
    setNfts(mockNfts);
  }, []);

  const filteredNfts = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
    const matchesStyle = selectedStyle === 'all' || nft.style === selectedStyle;
    const matchesPrice = (!priceRange.min || nft.price >= parseFloat(priceRange.min)) &&
                        (!priceRange.max || nft.price <= parseFloat(priceRange.max));
    
    return matchesSearch && matchesCategory && matchesStyle && matchesPrice;
  });

  const sortedNfts = [...filteredNfts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'ending-soon':
        return a.timeLeft.localeCompare(b.timeLeft);
      case 'most-bids':
        return b.bids - a.bids;
      default: // newest
        return b.id - a.id;
    }
  });

  const handleBid = (nftId) => {
    console.log(`Bidding on NFT ${nftId}`);
    // In a real app, this would open a bidding modal
  };

  const handleBuyNow = (nftId) => {
    console.log(`Buying NFT ${nftId} now`);
    // In a real app, this would process the purchase
  };

  return (
    <div className="auction-window-overlay">
      <div className="auction-window">
        <div className="auction-header">
          <div className="auction-title">
            <h1>🏛️ NFT Auction House</h1>
            <div className="view-mode-toggle">
              <button 
                className={`mode-btn ${viewMode === 'buy' ? 'active' : ''}`}
                onClick={() => setViewMode('buy')}
              >
                🛒 Buy
              </button>
              <button 
                className={`mode-btn ${viewMode === 'sell' ? 'active' : ''}`}
                onClick={() => setViewMode('sell')}
              >
                💰 Sell
              </button>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {viewMode === 'buy' ? (
          <div className="auction-content">
            {/* Search and Filters */}
            <div className="filters-section">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button className="search-btn">🔍</button>
              </div>

              <div className="filter-controls">
                <div className="filter-group">
                  <label>Category:</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    <option value="gaming">Gaming</option>
                    <option value="art">Art</option>
                    <option value="collectible">Collectible</option>
                    <option value="meme">Meme</option>
                    <option value="music">Music</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Style:</label>
                  <select 
                    value={selectedStyle} 
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Styles</option>
                    <option value="image">Image</option>
                    <option value="gif">GIF</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Price Range (ETH):</label>
                  <div className="price-range">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="price-input"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="price-input"
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Sort by:</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="ending-soon">Ending Soon</option>
                    <option value="most-bids">Most Bids</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NFT Grid */}
            <div className="nft-grid">
              {sortedNfts.map(nft => (
                <div key={nft.id} className="nft-card">
                  <div className="nft-image">
                    <div className="nft-emoji">{nft.image}</div>
                    <div className="nft-style-badge">{nft.style.toUpperCase()}</div>
                  </div>
                  
                  <div className="nft-info">
                    <h3 className="nft-name">{nft.name}</h3>
                    <div className="nft-details">
                      <div className="nft-price">
                        <span className="price-label">Current Bid:</span>
                        <span className="price-value">Ξ {nft.price}</span>
                      </div>
                      <div className="nft-meta">
                        <span className="seller">by {nft.seller}</span>
                        <span className="time-left">⏰ {nft.timeLeft}</span>
                        <span className="bid-count">🔥 {nft.bids} bids</span>
                      </div>
                    </div>
                    
                    <div className="nft-actions">
                      <button 
                        className="bid-btn"
                        onClick={() => handleBid(nft.id)}
                      >
                        Place Bid
                      </button>
                      <button 
                        className="buy-now-btn"
                        onClick={() => handleBuyNow(nft.id)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedNfts.length === 0 && (
              <div className="no-results">
                <h3>No NFTs found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="sell-section">
            <div className="sell-content">
              <h2>🎨 Sell Your NFT</h2>
              <p>List your NFT for auction or fixed price sale</p>
              
              <div className="sell-form">
                <div className="form-group">
                  <label>NFT Name:</label>
                  <input type="text" placeholder="Enter NFT name" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label>Description:</label>
                  <textarea placeholder="Describe your NFT" className="form-textarea"></textarea>
                </div>
                
                <div className="form-group">
                  <label>Category:</label>
                  <select className="form-select">
                    <option value="gaming">Gaming</option>
                    <option value="art">Art</option>
                    <option value="collectible">Collectible</option>
                    <option value="meme">Meme</option>
                    <option value="music">Music</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Starting Price (ETH):</label>
                  <input type="number" placeholder="0.1" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label>Auction Duration:</label>
                  <select className="form-select">
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                  </select>
                </div>
                
                <button className="list-nft-btn">
                  🚀 List NFT for Sale
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionWindow;

