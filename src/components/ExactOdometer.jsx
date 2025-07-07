import React from 'react';
import './ExactOdometer.css';

const ExactOdometer = ({ value, label }) => {
  const formatValue = (num) => {
    return num.toString().padStart(7, '0');
  };

  const digits = formatValue(value).split('');

  return (
    <div className="exact-odometer-container">
      <div className="odometer-label">{label}</div>
      <div className="exact-odometer">
        {digits.map((digit, index) => (
          <div 
            key={index} 
            className="odometer-digit-container"
          >
            <div className="horizontal-line"></div>
            <div className="odometer-digit">
              <div className="digit-content">
                {digit}
              </div>
            </div>
            <div className="vertical-separator"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExactOdometer;

