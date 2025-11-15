import React from 'react';
import './ExactOdometer.css';

/**
 * ExactOdometer
 * - Always uses white digits
 * - Horizontal white bar runs BEHIND the numbers
 * - Last digit has red background like a mechanical counter
 */
const ExactOdometer = ({ value, label }) => {
  const padded = String(value).padStart(7, '0'); // 7 digits for nicer look

  return (
    <div className="exact-odometer">
      <div className="exact-odometer-label">{label}</div>
      <div className="exact-odometer-row">
        {padded.split('').map((digit, idx) => (
          <div
            key={idx}
            className={
              'exact-odometer-cell' +
              (idx === padded.length - 1 ? ' last-digit' : '')
            }
          >
            <span>{digit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExactOdometer;
