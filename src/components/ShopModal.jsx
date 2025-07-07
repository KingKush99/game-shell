import React, { useState } from 'react';
import './ShopModal.css';
import { translations } from '../translations';

const ShopModal = ({ language = 'en', onClose }) => {
  const [activeSection, setActiveSection] = useState('fiat');
  const [selectedPlan, setSelectedPlan] = useState('diamond');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const subscriptionPlans = {
    gold: {
      name: t('goldPlan'),
      price: { monthly: 4.99, yearly: 49.99 },
      color: 'from-yellow-600 to-yellow-800',
      features: [
        t('basicGameAccess'),
        t('limitedTournaments'),
        t('standardSupport'),
        t('basicProfile'),
        t('monthlyCoins', '500')
      ]
    },
    diamond: {
      name: t('diamondPlan'),
      price: { monthly: 9.99, yearly: 99.99 },
      color: 'from-blue-600 to-purple-600',
      popular: true,
      features: [
        t('fullGameAccess'),
        t('unlimitedTournaments'),
        t('prioritySupport'),
        t('customProfile'),
        t('adFree'),
        t('monthlyCoins', '1500'),
        t('exclusiveContent')
      ]
    },
    platinum: {
      name: t('platinumPlan'),
      price: { monthly: 19.99, yearly: 199.99 },
      color: 'from-gray-400 to-gray-600',
      features: [
        t('everythingInDiamond'),
        t('unlimitedStorage'),
        t('customTournaments'),
        t('teamManagement'),
        t('advancedAnalytics'),
        t('monthlyCoins', '3000'),
        t('dedicatedSupport')
      ]
    }
  };

  const fiatOptions = [
    { amount: 100, price: 0.99, bonus: 0 },
    { amount: 500, price: 4.99, bonus: 50 },
    { amount: 1000, price: 9.99, bonus: 150 },
    { amount: 2500, price: 19.99, bonus: 500 },
    { amount: 5000, price: 39.99, bonus: 1000 },
    { amount: 10000, price: 79.99, bonus: 2500 }
  ];

  const cryptoOptions = [
    { crypto: 'Bitcoin', symbol: '₿', rate: 0.000025, minCoins: 100 },
    { crypto: 'Ethereum', symbol: 'Ξ', rate: 0.0004, minCoins: 100 },
    { crypto: 'USDT', symbol: '₮', rate: 1.0, minCoins: 1 },
    { crypto: 'BNB', symbol: 'BNB', rate: 0.002, minCoins: 50 }
  ];

  const handlePurchase = (type, item) => {
    alert(`${t('purchasing')} ${item.amount || item.crypto} ${t('coins')}!`);
  };

  const handleWatchAd = () => {
    alert(t('watchingAd'));
    // Simulate ad watching
    setTimeout(() => {
      alert(t('earnedCoins', '25'));
    }, 3000);
  };

  const renderFiatSection = () => (
    <div className="shop-section">
      <h3>{t('fiatToCoins')}</h3>
      <div className="fiat-grid">
        {fiatOptions.map((option, index) => (
          <div key={index} className="fiat-option">
            <div className="coin-amount">
              {option.amount.toLocaleString()} {t('coins')}
              {option.bonus > 0 && (
                <span className="bonus">+{option.bonus} {t('bonus')}</span>
              )}
            </div>
            <div className="price">${option.price}</div>
            <button 
              className="purchase-btn"
              onClick={() => handlePurchase('fiat', option)}
            >
              {t('buy')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCryptoSection = () => (
    <div className="shop-section">
      <h3>{t('cryptoToCoins')}</h3>
      <div className="crypto-grid">
        {cryptoOptions.map((option, index) => (
          <div key={index} className="crypto-option">
            <div className="crypto-header">
              <span className="crypto-symbol">{option.symbol}</span>
              <span className="crypto-name">{option.crypto}</span>
            </div>
            <div className="crypto-rate">
              1 {option.symbol} = {(1/option.rate).toLocaleString()} {t('coins')}
            </div>
            <div className="crypto-min">
              {t('minimum')}: {option.minCoins} {t('coins')}
            </div>
            <button 
              className="purchase-btn crypto-btn"
              onClick={() => handlePurchase('crypto', option)}
            >
              {t('exchange')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdSection = () => (
    <div className="shop-section">
      <h3>{t('watchAdEarnCoins')}</h3>
      <div className="ad-section">
        <div className="ad-info">
          <div className="ad-icon">📺</div>
          <div className="ad-details">
            <h4>{t('earnCoinsWatching')}</h4>
            <p>{t('watchShortAd')}</p>
            <div className="ad-rewards">
              <span className="reward-amount">+25 {t('coins')}</span>
              <span className="reward-time">{t('per30Seconds')}</span>
            </div>
          </div>
        </div>
        <button className="watch-ad-btn" onClick={handleWatchAd}>
          <span className="play-icon">▶️</span>
          {t('watchAd')}
        </button>
        <div className="ad-cooldown">
          <p>{t('nextAdIn')}: 4:32</p>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionSection = () => (
    <div className="shop-section">
      <h3>{t('subscriptions')}</h3>
      <div className="subscription-grid">
        {Object.entries(subscriptionPlans).map(([planKey, plan]) => (
          <div 
            key={planKey}
            className={`subscription-card ${selectedPlan === planKey ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
            onClick={() => setSelectedPlan(planKey)}
          >
            {plan.popular && <div className="popular-badge">{t('popular')}</div>}
            
            <div className="plan-header">
              <h4 className="plan-name">{plan.name}</h4>
              <div className="plan-price">
                <span className="price">${plan.price.monthly}/month</span>
              </div>
            </div>

            <div className="plan-features">
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className={`plan-button ${selectedPlan === planKey ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan(planKey);
              }}
            >
              {selectedPlan === planKey ? t('selected') : t('selectPlan')}
            </button>
          </div>
        ))}
      </div>
      <div className="subscription-actions">
        <button className="subscribe-btn" onClick={() => setShowPayment(true)}>
          {t('subscribe')} - ${subscriptionPlans[selectedPlan].price.monthly}/month
        </button>
      </div>
    </div>
  );

  if (showPayment) {
    return (
      <div className="shop-modal-overlay">
        <div className="shop-modal payment-modal">
          <div className="modal-header">
            <h2>{t('completePayment')}</h2>
            <button className="close-modal" onClick={() => setShowPayment(false)}>×</button>
          </div>
          
          <div className="payment-content">
            <div className="order-summary">
              <h3>{t('orderSummary')}</h3>
              <div className="plan-summary">
                <span className="plan-name">{subscriptionPlans[selectedPlan].name}</span>
                <span className="plan-price">${subscriptionPlans[selectedPlan].price.monthly}/month</span>
              </div>
            </div>

            <div className="payment-methods">
              <h3>{t('paymentMethod')}</h3>
              <div className="method-options">
                <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">💳</span>
                  <span>{t('creditCard')}</span>
                </label>
                <label className={`method-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    value="paypal" 
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">🅿️</span>
                  <span>{t('paypal')}</span>
                </label>
              </div>
            </div>

            <div className="payment-actions">
              <button className="cancel-payment" onClick={() => setShowPayment(false)}>
                {t('back')}
              </button>
              <button className="complete-payment" onClick={() => {
                alert(t('paymentProcessed'));
                setShowPayment(false);
                onClose();
              }}>
                {t('completePayment')} ${subscriptionPlans[selectedPlan].price.monthly}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-modal-overlay">
      <div className="shop-modal">
        <div className="modal-header">
          <h2>{t('shop')}</h2>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>
        
        <div className="shop-tabs">
          <button 
            className={`shop-tab ${activeSection === 'fiat' ? 'active' : ''}`}
            onClick={() => setActiveSection('fiat')}
          >
            💰 {t('fiatToCoins')}
          </button>
          <button 
            className={`shop-tab ${activeSection === 'crypto' ? 'active' : ''}`}
            onClick={() => setActiveSection('crypto')}
          >
            ₿ {t('cryptoToCoins')}
          </button>
          <button 
            className={`shop-tab ${activeSection === 'ads' ? 'active' : ''}`}
            onClick={() => setActiveSection('ads')}
          >
            📺 {t('watchAds')}
          </button>
          <button 
            className={`shop-tab ${activeSection === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveSection('subscriptions')}
          >
            ⭐ {t('subscriptions')}
          </button>
        </div>

        <div className="shop-content">
          {activeSection === 'fiat' && renderFiatSection()}
          {activeSection === 'crypto' && renderCryptoSection()}
          {activeSection === 'ads' && renderAdSection()}
          {activeSection === 'subscriptions' && renderSubscriptionSection()}
        </div>
      </div>
    </div>
  );
};

export default ShopModal;

