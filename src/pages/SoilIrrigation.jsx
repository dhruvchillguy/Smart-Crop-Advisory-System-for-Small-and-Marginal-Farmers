import React, { useState } from 'react';
import { soilTypes, soilGuidance, irrigationOptions } from '../data/referenceData';
import { SoilIcon } from '../components/Icons';

function SoilIrrigation() {
  const [selectedSoil, setSelectedSoil] = useState('');
  const [selectedIrrigation, setSelectedIrrigation] = useState('');

  const guidance = selectedSoil ? soilGuidance[selectedSoil] : null;

  return (
    <div>
      <div className="page-header">
        <h1>Soil & Irrigation Guidance</h1>
        <p>Learn about your soil type and how to manage water for your crops</p>
      </div>

      {/* Selection */}
      <div className="card" style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Select Your Soil Type</h3>
        <div className="form-group">
          <label className="form-label" htmlFor="soil-select">Soil Type</label>
          <select
            id="soil-select"
            className="form-select"
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value)}
          >
            <option value="">Choose your soil type</option>
            {soilTypes.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="irr-select">Irrigation Availability</label>
          <select
            id="irr-select"
            className="form-select"
            value={selectedIrrigation}
            onChange={(e) => setSelectedIrrigation(e.target.value)}
          >
            <option value="">Choose irrigation availability</option>
            {irrigationOptions.map(i => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </div>
      </div>

      {!selectedSoil && (
        <div className="empty-state">
          <div className="empty-icon">
            <SoilIcon size={30} />
          </div>
          <h3>Select a soil type above</h3>
          <p>We will show you soil preparation tips, watering guidance, and suitable crops.</p>
        </div>
      )}

      {guidance && (
        <div>
          {/* Soil Description */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>
              About {selectedSoil.charAt(0).toUpperCase() + selectedSoil.slice(1)} Soil
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{guidance.description}</p>
          </div>

          {/* Soil Preparation */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Soil Preparation</h3>
            <p style={{ lineHeight: '1.7' }}>{guidance.preparation}</p>
          </div>

          {/* Water & Drainage */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Water & Drainage</h3>
            <ul className="guidance-list">
              <li>
                <span className="guidance-icon">•</span>
                <div>
                  <strong>Drainage:</strong> {guidance.drainage}
                </div>
              </li>
              <li>
                <span className="guidance-icon">•</span>
                <div>
                  <strong>Watering Tips:</strong> {guidance.waterTips}
                </div>
              </li>
            </ul>
          </div>

          {/* Suitable Crops */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Suitable Crops</h3>
            <p style={{ fontSize: '1.05rem' }}>{guidance.suitableCrops}</p>
          </div>

          {/* Irrigation-specific advice */}
          {selectedIrrigation && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Irrigation Tips for {selectedSoil.charAt(0).toUpperCase() + selectedSoil.slice(1)} Soil</h3>
              <ul className="guidance-list">
                {selectedIrrigation === 'yes' && (
                  <>
                    <li><span className="guidance-icon">•</span><span>With reliable irrigation, you can grow a wider range of crops including those needing regular watering</span></li>
                    <li><span className="guidance-icon">•</span><span>Consider drip irrigation for water-efficient farming, especially on {selectedSoil} soil</span></li>
                    <li><span className="guidance-icon">•</span><span>Schedule irrigation based on crop stage — critical stages like flowering and grain filling need more water</span></li>
                  </>
                )}
                {selectedIrrigation === 'limited' && (
                  <>
                    <li><span className="guidance-icon">•</span><span>Focus on crops with moderate water needs. Avoid very thirsty crops like sugarcane or paddy</span></li>
                    <li><span className="guidance-icon">•</span><span>Use mulching to conserve soil moisture and reduce watering frequency</span></li>
                    <li><span className="guidance-icon">•</span><span>Save water for critical crop stages (flowering and grain filling)</span></li>
                  </>
                )}
                {selectedIrrigation === 'no' && (
                  <>
                    <li><span className="guidance-icon">•</span><span>Choose drought-tolerant crops like bajra, jowar, groundnut, or chickpea</span></li>
                    <li><span className="guidance-icon">•</span><span>Rainwater harvesting and farm ponds can supplement monsoon water</span></li>
                    <li><span className="guidance-icon">•</span><span>Mulching and conservation tillage help retain rainwater in the soil</span></li>
                    <li><span className="guidance-icon">•</span><span>Contour farming and bunding can reduce water runoff from fields</span></li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* Water Conservation */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Water Conservation Tips</h3>
            <ul className="guidance-list">
              <li><span className="guidance-icon">•</span><span>Use organic mulch (straw, dry leaves, crop residue) to reduce evaporation by up to 30%</span></li>
              <li><span className="guidance-icon">•</span><span>Irrigate in the morning or evening when evaporation is lowest</span></li>
              <li><span className="guidance-icon">•</span><span>Practice crop rotation — different crops have different water needs</span></li>
              <li><span className="guidance-icon">•</span><span>Build field bunds (ridges) to prevent water runoff</span></li>
              <li><span className="guidance-icon">•</span><span>Consider drip or sprinkler irrigation which uses 30–50% less water than flood irrigation</span></li>
            </ul>
          </div>

          <div className="disclaimer">
            <strong>Note:</strong> Actual watering needs depend on your specific crop, growth stage, season, 
            recent rainfall, and local conditions. These are general guidelines — observe your crop and soil 
            moisture to decide when to irrigate.
          </div>
        </div>
      )}
    </div>
  );
}

export default SoilIrrigation;
