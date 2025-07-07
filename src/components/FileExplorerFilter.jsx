import React, { useState } from 'react';
import './FileExplorerFilter.css';

const FileExplorerFilter = ({ onFilterChange, currentFilter, translations }) => {
  const [sortDirection, setSortDirection] = useState({});
  const [previousFilter, setPreviousFilter] = useState('default');

  const filterOptions = [
    { key: 'default', label: 'Default', icon: '📁' },
    { key: 'use', label: 'Use', icon: '📊' },
    { key: 'name', label: 'Name', icon: '🔤' },
    { key: 'color', label: 'Color', icon: '🎨' }
  ];

  const handleFilterClick = (filterKey) => {
    if (filterKey === 'default') {
      if (currentFilter === 'default') {
        // If already on default, go back to previous filter
        onFilterChange(previousFilter);
      } else {
        // Store current filter as previous and go to default
        setPreviousFilter(currentFilter);
        onFilterChange('default');
      }
      return;
    }

    // For other filters, toggle sort direction
    const currentDirection = sortDirection[filterKey] || 'asc';
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    
    setSortDirection(prev => ({
      ...prev,
      [filterKey]: newDirection
    }));

    // Map filter keys to actual sort types
    let sortType = filterKey;
    if (filterKey === 'use') {
      sortType = newDirection === 'asc' ? 'leastUsed' : 'mostUsed';
    } else if (filterKey === 'name') {
      sortType = newDirection === 'asc' ? 'az' : 'za';
    } else if (filterKey === 'color') {
      sortType = newDirection === 'asc' ? 'lightToDark' : 'darkToLight';
    }

    onFilterChange(sortType);
  };

  const getSortIcon = (filterKey) => {
    if (filterKey === 'default') return '';
    
    const direction = sortDirection[filterKey] || 'asc';
    return direction === 'asc' ? '▲' : '▼';
  };

  const isActive = (filterKey) => {
    if (filterKey === 'default') return currentFilter === 'default';
    if (filterKey === 'use') return ['mostUsed', 'leastUsed'].includes(currentFilter);
    if (filterKey === 'name') return ['az', 'za'].includes(currentFilter);
    if (filterKey === 'color') return ['lightToDark', 'darkToLight'].includes(currentFilter);
    return false;
  };

  return (
    <div className="file-explorer-filter">
      <div className="filter-header">
        <span className="filter-title">🔍 Filter</span>
      </div>
      <div className="filter-options">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            className={`filter-option ${isActive(option.key) ? 'active' : ''}`}
            onClick={() => handleFilterClick(option.key)}
          >
            <span className="filter-icon">{option.icon}</span>
            <span className="filter-label">{option.label}</span>
            <span className="sort-indicator">{getSortIcon(option.key)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FileExplorerFilter;

