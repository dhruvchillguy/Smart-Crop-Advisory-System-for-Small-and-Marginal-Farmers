import React, { useState } from 'react';

function HelpAbout() {
  const [activeTab, setActiveTab] = useState('help');

  return (
    <div>
      <div className="page-header">
        <h1>ℹ️ Help & About</h1>
        <p>Learn how to use this application and understand agricultural terms</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          📖 How to Use
        </button>
        <button
          className={`tab-btn ${activeTab === 'glossary' ? 'active' : ''}`}
          onClick={() => setActiveTab('glossary')}
        >
          📚 Farm Terms
        </button>
        <button
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          ℹ️ About
        </button>
      </div>

      {/* How to Use */}
      {activeTab === 'help' && (
        <div>
          <div className="help-section">
            <h2>Getting Started</h2>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Step 1: Set Up Your Farm Profile</h3>
              <p>Go to <strong>"My Farm"</strong> in the left menu. Enter your name, location, farm area, soil type, and irrigation availability. This information helps us give you better crop advice.</p>
            </div>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Step 2: Get Crop Recommendations</h3>
              <p>Go to <strong>"Crop Advice"</strong>. Select your state, soil type, and season. Click <strong>"Get Crop Recommendations"</strong>. The system will show you which crops are suitable for your conditions.</p>
            </div>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Step 3: Save Useful Recommendations</h3>
              <p>When you find a crop recommendation you like, click <strong>"Save This Recommendation"</strong>. You can view all saved recommendations later in the <strong>"Saved Advice"</strong> section.</p>
            </div>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Step 4: Check Other Guidance</h3>
              <p>Use <strong>"Weather"</strong> for weather-related farming tips, <strong>"Soil & Irrigation"</strong> for water management advice, and <strong>"Fertilizer Guide"</strong> for nutrient information.</p>
            </div>
          </div>

          <div className="help-section">
            <h2>Understanding Suitability Scores</h2>
            <div className="card">
              <p style={{ marginBottom: '0.75rem' }}>When you get crop recommendations, each crop gets a suitability score. Here is what it means:</p>
              <ul className="guidance-list">
                <li>
                  <span className="guidance-icon" style={{ color: 'var(--color-success)' }}>●●●●●</span>
                  <div>
                    <strong style={{ color: 'var(--color-success)' }}>Highly Suitable (70-100%)</strong>
                    <p>This crop matches most of your conditions well. It is a strong option to consider.</p>
                  </div>
                </li>
                <li>
                  <span className="guidance-icon" style={{ color: 'var(--color-warning)' }}>●●●○○</span>
                  <div>
                    <strong style={{ color: 'var(--color-warning)' }}>Moderately Suitable (45-69%)</strong>
                    <p>This crop may work but some conditions are not ideal. Read the warnings carefully.</p>
                  </div>
                </li>
                <li>
                  <span className="guidance-icon" style={{ color: 'var(--color-danger)' }}>●○○○○</span>
                  <div>
                    <strong style={{ color: 'var(--color-danger)' }}>Less Suitable (20-44%)</strong>
                    <p>This crop is not well-matched to your conditions. Consider only if you have experience with it.</p>
                  </div>
                </li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                The score considers your state, soil type, season, irrigation, temperature, and rainfall.
                Higher scores mean more conditions are matched.
              </p>
            </div>
          </div>

          <div className="help-section">
            <h2>Tips for Best Results</h2>
            <div className="card">
              <ul className="guidance-list">
                <li><span className="guidance-icon">✅</span><span>Fill in as many fields as possible for more accurate recommendations</span></li>
                <li><span className="guidance-icon">✅</span><span>If you know the temperature and rainfall, enter them for better matching</span></li>
                <li><span className="guidance-icon">✅</span><span>Always check the "Warnings" section of each recommendation</span></li>
                <li><span className="guidance-icon">✅</span><span>Save recommendations you are interested in for future reference</span></li>
                <li><span className="guidance-icon">✅</span><span>Consult your local agriculture office before making final decisions</span></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Glossary */}
      {activeTab === 'glossary' && (
        <div className="help-section">
          <h2>Agricultural Terms (कृषि शब्दावली)</h2>
          <div className="term-grid">
            <dl className="term-card">
              <dt>Kharif (खरीफ)</dt>
              <dd>Monsoon season crops sown in June-July and harvested in October-November. Examples: Rice, Maize, Cotton, Soybean.</dd>
            </dl>
            <dl className="term-card">
              <dt>Rabi (रबी)</dt>
              <dd>Winter season crops sown in October-November and harvested in March-April. Examples: Wheat, Mustard, Chickpea, Potato.</dd>
            </dl>
            <dl className="term-card">
              <dt>Zaid (ज़ायद)</dt>
              <dd>Short summer crops grown between Rabi and Kharif seasons. Examples: Watermelon, Cucumber, Moong.</dd>
            </dl>
            <dl className="term-card">
              <dt>NPK</dt>
              <dd>Nitrogen (N), Phosphorus (P), and Potassium (K) — the three main nutrients that plants need for growth.</dd>
            </dl>
            <dl className="term-card">
              <dt>Urea</dt>
              <dd>A common nitrogen fertilizer (46% N). Applied as top-dressing in splits during crop growth.</dd>
            </dl>
            <dl className="term-card">
              <dt>DAP</dt>
              <dd>Di-Ammonium Phosphate — a fertilizer containing both nitrogen and phosphorus. Used as basal application.</dd>
            </dl>
            <dl className="term-card">
              <dt>Top-dressing</dt>
              <dd>Applying fertilizer to crops after they have already been planted, usually alongside irrigation.</dd>
            </dl>
            <dl className="term-card">
              <dt>Mulching</dt>
              <dd>Covering soil with straw, dry leaves, or other material to reduce water evaporation and control weeds.</dd>
            </dl>
            <dl className="term-card">
              <dt>Drip Irrigation</dt>
              <dd>A system that delivers water directly to plant roots through pipes, saving 30-50% water compared to flood irrigation.</dd>
            </dl>
            <dl className="term-card">
              <dt>Soil Test</dt>
              <dd>A laboratory analysis of your soil that tells you which nutrients are present and which are deficient.</dd>
            </dl>
            <dl className="term-card">
              <dt>KVK (Krishi Vigyan Kendra)</dt>
              <dd>Agricultural science centre at district level that provides training, advice, and soil testing services to farmers.</dd>
            </dl>
            <dl className="term-card">
              <dt>Earthing Up</dt>
              <dd>Mounding soil around the base of plants. Important for potatoes, sugarcane, and some other crops.</dd>
            </dl>
          </div>
        </div>
      )}

      {/* About */}
      {activeTab === 'about' && (
        <div>
          <div className="help-section">
            <h2>About This Application</h2>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Smart Crop Advisory System</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                This desktop application is designed to help <strong>small and marginal farmers in India</strong> make 
                better crop selection decisions. It provides general guidance based on your location, soil type, 
                season, and irrigation availability.
              </p>
              <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                The application uses a <strong>rule-based advisory engine</strong> that matches crop requirements 
                with your farm conditions. It is not an AI or machine learning system — it uses known agricultural 
                data to provide transparent recommendations with clear explanations.
              </p>
              <div className="rec-detail">
                <span className="rec-detail-label">Version</span>
                <span className="rec-detail-value">1.0.0</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">Technology</span>
                <span className="rec-detail-value">Electron, React, JavaScript, Vite</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">Developer</span>
                <span className="rec-detail-value">Dhruv Khare</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">Purpose</span>
                <span className="rec-detail-value">College Desktop Application Project</span>
              </div>
            </div>
          </div>

          <div className="help-section">
            <div className="alert alert-danger">
              <span className="alert-icon">⚠️</span>
              <div>
                <strong>IMPORTANT DISCLAIMER</strong>
                <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>
                  This application provides <strong>general agricultural decision support</strong> only. 
                  It is <strong>NOT a substitute</strong> for advice from agricultural extension officers, 
                  local Krishi Vigyan Kendras, or experienced farmers in your area.
                </p>
                <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>
                  Crop recommendations depend on many local factors that this application cannot fully account for, 
                  including exact soil nutrient content, pest and disease pressure, market conditions, seed availability, 
                  and local weather patterns.
                </p>
                <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>
                  Always verify recommendations with local experts before making farming decisions. 
                  The developer is not responsible for any crop losses or financial damage resulting from 
                  following these recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpAbout;
