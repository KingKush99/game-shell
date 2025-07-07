import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ message, type = 'info', onClose, isVisible }) => {
  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-error';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return 'alert-info';
    }
  };

  return (
    <div className={`custom-alert ${getTypeClass()}`}>
      <div className="alert-content">
        <span className="alert-icon">{getIcon()}</span>
        <span className="alert-message">{message}</span>
        <button className="alert-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;

