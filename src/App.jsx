import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CropAdvisory from './pages/CropAdvisory';
import Weather from './pages/Weather';
import SoilIrrigation from './pages/SoilIrrigation';
import FertilizerGuide from './pages/FertilizerGuide';
import FarmerProfile from './pages/FarmerProfile';
import SavedRecommendations from './pages/SavedRecommendations';
import HelpAbout from './pages/HelpAbout';
import { getProfile } from './services/storage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load profile on mount
  useEffect(() => {
    async function loadProfile() {
      const p = await getProfile();
      setProfile(p);
      setProfileLoaded(true);
    }
    loadProfile();
  }, []);

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, []);

  const handleProfileUpdate = useCallback((updatedProfile) => {
    setProfile(updatedProfile);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard profile={profile} onNavigate={handleNavigate} />;
      case 'advisory':
        return <CropAdvisory profile={profile} onNavigate={handleNavigate} />;
      case 'weather':
        return <Weather />;
      case 'soil':
        return <SoilIrrigation />;
      case 'fertilizer':
        return <FertilizerGuide />;
      case 'profile':
        return <FarmerProfile profile={profile} onProfileUpdate={handleProfileUpdate} />;
      case 'saved':
        return <SavedRecommendations />;
      case 'help':
        return <HelpAbout />;
      default:
        return <Dashboard profile={profile} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
