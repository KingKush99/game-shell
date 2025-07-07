import React, { useState, useEffect } from 'react';
import './BannerAd.css';

const BannerAd = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [adContent, setAdContent] = useState(0);

  const adContents = [
    {
      title: "🎮 Premium Gaming Experience",
      subtitle: "Unlock exclusive features and ad-free gaming!",
      cta: "Upgrade Now",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "🏆 Join Tournament",
      subtitle: "Compete with players worldwide for amazing prizes!",
      cta: "Enter Now",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "💎 Special Offer",
      subtitle: "Get 50% off on all premium features this week!",
      cta: "Claim Deal",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      title: "🎁 Daily Rewards",
      subtitle: "Login daily to collect coins and exclusive items!",
      cta: "Collect",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  useEffect(() => {
    // Show banner again after 5 minutes if closed
    if (!isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Cycle through different ad content
        setAdContent(prev => (prev + 1) % adContents.length);
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [isVisible, adContents.length]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    // Handle ad click - could open modal, redirect, etc.
    console.log('Banner ad clicked:', adContents[adContent].title);
  };

  if (!isVisible) return null;

  const currentAd = adContents[adContent];

  return (
    <div className={`banner-ad bg-gradient-to-r ${currentAd.gradient}`}>
      <div className="banner-content">
        <div className="ad-text" onClick={handleClick}>
          <h3 className="ad-title">{currentAd.title}</h3>
          <p className="ad-subtitle">{currentAd.subtitle}</p>
        </div>
        <button className="ad-cta" onClick={handleClick}>
          {currentAd.cta}
        </button>
        <button className="ad-close" onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default BannerAd;

