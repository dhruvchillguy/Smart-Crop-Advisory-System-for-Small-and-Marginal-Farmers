import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'advisory', label: 'Crop Advice', icon: '🌾' },
  { id: 'weather', label: 'Weather', icon: '🌤️' },
  { id: 'soil', label: 'Soil & Irrigation', icon: '💧' },
  { id: 'fertilizer', label: 'Fertilizer Guide', icon: '🧪' },
  { id: 'profile', label: 'My Farm', icon: '👨‍🌾' },
  { id: 'saved', label: 'Saved Advice', icon: '📋' },
  { id: 'help', label: 'Help & About', icon: 'ℹ️' },
];

function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🌱</span>
          <span className="logo-text">Smart Crop<br />Advisory</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <small>v1.0 • For Indian Farmers</small>
      </div>
    </aside>
  );
}

export default Sidebar;
