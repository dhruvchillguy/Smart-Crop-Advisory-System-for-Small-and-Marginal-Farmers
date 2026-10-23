import React from 'react';
import {
  SproutIcon,
  DashboardIcon,
  CropIcon,
  WeatherIcon,
  SoilIcon,
  FertilizerIcon,
  ProfileIcon,
  SavedIcon,
  HelpIcon,
} from './Icons';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'advisory', label: 'Crop Advice', icon: CropIcon },
  { id: 'weather', label: 'Weather', icon: WeatherIcon },
  { id: 'soil', label: 'Soil & Irrigation', icon: SoilIcon },
  { id: 'fertilizer', label: 'Fertilizer Guide', icon: FertilizerIcon },
  { id: 'profile', label: 'My Farm', icon: ProfileIcon },
  { id: 'saved', label: 'Saved Advice', icon: SavedIcon },
  { id: 'help', label: 'Help & About', icon: HelpIcon },
];

function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">
            <SproutIcon size={26} color="var(--color-primary)" />
          </span>
          <span className="logo-text">Smart Crop<br />Advisory</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">
                <IconComponent size={18} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <small>v1.0 • Small & Marginal Farmers Advisory</small>
      </div>
    </aside>
  );
}

export default Sidebar;
