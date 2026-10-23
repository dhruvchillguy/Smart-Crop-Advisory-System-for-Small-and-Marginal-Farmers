import React from 'react';
import {
  AreaIcon,
  SoilIcon,
  WaterIcon,
  LocationIcon,
  CalendarIcon,
  InfoIcon,
} from '../components/Icons';

function Dashboard({ profile, onNavigate }) {
  const farmerName = profile?.farmerName || 'Farmer';
  const farmArea = profile?.farmArea ? `${profile.farmArea} ${profile.farmUnit || 'acres'}` : 'Not set';
  const soilType = profile?.soilType || 'Not set';
  const irrigation = profile?.irrigation === 'yes' ? 'Available' : profile?.irrigation === 'limited' ? 'Limited' : profile?.irrigation === 'no' ? 'Rainfed' : 'Not set';

  // Get current month to suggest season
  const month = new Date().getMonth() + 1;
  let currentSeason;
  if (month >= 6 && month <= 10) {
    currentSeason = 'Kharif (Monsoon) Season';
  } else if (month >= 11 || month <= 3) {
    currentSeason = 'Rabi (Winter) Season';
  } else {
    currentSeason = 'Zaid (Summer) Season';
  }

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {farmerName}</h1>
        <p>Smart Crop Advisory System — Decision support for Indian small and marginal farmers</p>
      </div>

      {/* Season Banner */}
      <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
        <span className="alert-icon">
          <CalendarIcon size={18} />
        </span>
        <div>
          <strong>Current Season:</strong> {currentSeason}
          <br />
          <small>Get crop recommendations suited for this season using the Crop Advice section.</small>
        </div>
      </div>

      {/* Farm Overview */}
      <div className="section">
        <h2 className="section-title">Your Farm Overview</h2>
        <div className="card-grid">
          <div className="card">
            <div className="stat-card">
              <span className="stat-icon">
                <AreaIcon size={20} />
              </span>
              <div className="stat-info">
                <h3>Farm Area</h3>
                <p>{farmArea}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="stat-card">
              <span className="stat-icon">
                <SoilIcon size={20} />
              </span>
              <div className="stat-info">
                <h3>Soil Type</h3>
                <p>{soilType === 'Not set' ? soilType : soilType.charAt(0).toUpperCase() + soilType.slice(1)}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="stat-card">
              <span className="stat-icon">
                <WaterIcon size={20} />
              </span>
              <div className="stat-info">
                <h3>Irrigation</h3>
                <p>{irrigation}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="stat-card">
              <span className="stat-icon">
                <LocationIcon size={20} />
              </span>
              <div className="stat-info">
                <h3>Location</h3>
                <p>{profile?.village || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions">
          <button className="btn btn-primary btn-lg" onClick={() => onNavigate('advisory')}>
            Get Crop Advice
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => onNavigate('profile')}>
            {profile ? 'Update' : 'Set Up'} My Farm
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => onNavigate('saved')}>
            View Saved Advice
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => onNavigate('weather')}>
            Weather Advisory
          </button>
        </div>
      </div>

      {/* Sample Weather */}
      <div className="section">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weather Summary</h3>
            <span className="badge badge-warning">Sample Data</span>
          </div>
          <div className="weather-display">
            <div className="weather-item">
              <div className="weather-value">32°C</div>
              <div className="weather-label">Temperature</div>
            </div>
            <div className="weather-item">
              <div className="weather-value">65%</div>
              <div className="weather-label">Humidity</div>
            </div>
            <div className="weather-item">
              <div className="weather-value">12 km/h</div>
              <div className="weather-label">Wind</div>
            </div>
            <div className="weather-item">
              <div className="weather-value">Partly Cloudy</div>
              <div className="weather-label">Condition</div>
            </div>
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#888' }}>
            Note: This is sample data for demonstration. Visit the Weather section for details or enter your own data.
          </p>
        </div>
      </div>

      {!profile && (
        <div className="alert alert-warning">
          <span className="alert-icon">
            <InfoIcon size={18} />
          </span>
          <div>
            <strong>Get started:</strong> Set up your farm profile to get personalised crop recommendations.
            <br />
            <button className="btn btn-sm btn-warning" style={{ marginTop: '0.5rem' }} onClick={() => onNavigate('profile')}>
              Set Up Farm Profile
            </button>
          </div>
        </div>
      )}

      <div className="disclaimer">
        <strong>Agricultural Disclaimer:</strong> This application provides general agricultural guidance. 
        Actual decisions should consider local conditions, soil test results, market prices, and 
        advice from your nearest Krishi Vigyan Kendra (KVK) or agriculture office.
      </div>
    </div>
  );
}

export default Dashboard;
