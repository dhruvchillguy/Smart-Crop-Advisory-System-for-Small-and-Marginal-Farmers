import React, { useState } from 'react';
import { generateRecommendations, getSuitabilityLabel } from '../services/advisoryEngine';
import { indianStates, soilTypes, seasons, irrigationOptions } from '../data/referenceData';
import { saveRecommendation } from '../services/storage';

function CropAdvisory({ profile, onNavigate }) {
  const [formData, setFormData] = useState({
    state: profile?.state || '',
    soilType: profile?.soilType || '',
    season: '',
    farmArea: profile?.farmArea || '',
    irrigation: profile?.irrigation || '',
    temperature: '',
    rainfall: '',
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.state || !formData.soilType || !formData.season) {
      setError('Please select your State, Soil Type, and Season to get crop recommendations.');
      return;
    }
    const result = generateRecommendations(formData);
    if (result.success) {
      setResults(result);
      setError(null);
    } else {
      setError(result.error);
      setResults(null);
    }
  };

  const handleSave = async (crop) => {
    const rec = {
      cropName: crop.name,
      hindiName: crop.hindiName,
      suitability: crop.suitability,
      suitabilityScore: crop.suitabilityScore,
      reasons: crop.reasons,
      warnings: crop.warnings,
      sowingGuidance: crop.sowingGuidance,
      waterNeeds: crop.waterNeeds,
      duration: crop.duration,
      precautions: crop.precautions,
      conditions: { ...formData },
    };
    const result = await saveRecommendation(rec);
    if (result.success) {
      setSaveMessage(`"${crop.name}" saved! View in Saved Advice section.`);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleClear = () => {
    setFormData({
      state: profile?.state || '',
      soilType: profile?.soilType || '',
      season: '',
      farmArea: profile?.farmArea || '',
      irrigation: profile?.irrigation || '',
      temperature: '',
      rainfall: '',
    });
    setResults(null);
    setError(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1>🌾 Smart Crop Advisory</h1>
        <p>Enter your farm conditions to get crop recommendations</p>
      </div>

      {saveMessage && (
        <div className="success-message">
          ✅ {saveMessage}
        </div>
      )}

      {/* Input Form */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Tell us about your conditions</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="adv-state">State / Region *</label>
              <select id="adv-state" name="state" className="form-select" value={formData.state} onChange={handleChange}>
                <option value="">Select state</option>
                {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="adv-season">Season *</label>
              <select id="adv-season" name="season" className="form-select" value={formData.season} onChange={handleChange}>
                <option value="">Select season</option>
                {seasons.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="adv-soil">Soil Type *</label>
              <select id="adv-soil" name="soilType" className="form-select" value={formData.soilType} onChange={handleChange}>
                <option value="">Select soil type</option>
                {soilTypes.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="adv-irrigation">Irrigation</label>
              <select id="adv-irrigation" name="irrigation" className="form-select" value={formData.irrigation} onChange={handleChange}>
                <option value="">Select irrigation</option>
                {irrigationOptions.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="adv-temp">
                Temperature (°C) <span className="form-hint">(optional)</span>
              </label>
              <input
                id="adv-temp"
                name="temperature"
                type="number"
                className="form-input"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="e.g. 30"
                min="-10"
                max="55"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="adv-rain">
                Rainfall (mm/month) <span className="form-hint">(optional)</span>
              </label>
              <input
                id="adv-rain"
                name="rainfall"
                type="number"
                className="form-input"
                value={formData.rainfall}
                onChange={handleChange}
                placeholder="e.g. 100"
                min="0"
                max="1000"
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger">
              <span className="alert-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="btn btn-primary btn-lg">
              🌾 Get Crop Recommendations
            </button>
            <button type="button" className="btn btn-outline" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {results && (
        <div>
          <div className="section">
            <h2 className="section-title">
              Recommended Crops ({results.recommendations.length} results)
            </h2>
            <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
              <span className="alert-icon">💡</span>
              <div>
                <strong>How to read:</strong> Crops are ranked by suitability. 
                "Highly Suitable" means the crop matches most of your conditions. 
                Check the reasons and warnings for each crop before deciding.
              </div>
            </div>
          </div>

          {results.recommendations.map((crop, index) => (
            <div key={index} className="rec-card" style={{ marginBottom: '1rem' }}>
              <div className="rec-card-header">
                <div>
                  <span className="rec-crop-name">{crop.name}</span>
                  {crop.hindiName && <span style={{ marginLeft: '0.5rem', color: '#888' }}>({crop.hindiName})</span>}
                </div>
                <div className="suitability">
                  <div className="suitability-bar">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className={`suitability-dot ${
                          i <= Math.ceil(crop.suitabilityScore / 20)
                            ? `filled-${crop.suitability}`
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`suitability-text`} style={{
                    color: crop.suitability === 'high' ? 'var(--color-success)' :
                           crop.suitability === 'medium' ? 'var(--color-warning)' : 'var(--color-danger)'
                  }}>
                    {getSuitabilityLabel(crop.suitability)} ({crop.suitabilityScore}%)
                  </span>
                </div>
              </div>

              {/* Why it suits */}
              {crop.reasons.length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--color-success)' }}>✅ Why it may suit your conditions:</strong>
                  <ul style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                    {crop.reasons.map((r, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{r}</li>)}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {crop.warnings.length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--color-warning)' }}>⚠️ Things to consider:</strong>
                  <ul style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                    {crop.warnings.map((w, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{w}</li>)}
                  </ul>
                </div>
              )}

              <div className="divider" />

              <div className="rec-detail">
                <span className="rec-detail-label">🌱 Sowing Guidance</span>
                <span className="rec-detail-value">{crop.sowingGuidance}</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">💧 Water Needs</span>
                <span className="rec-detail-value">{crop.waterNeeds}</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">⏱️ Growing Duration</span>
                <span className="rec-detail-value">{crop.duration}</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">⚠️ Precautions</span>
                <span className="rec-detail-value">{crop.precautions}</span>
              </div>

              <div className="rec-actions">
                <button className="btn btn-success btn-sm" onClick={() => handleSave(crop)}>
                  💾 Save This Recommendation
                </button>
              </div>
            </div>
          ))}

          <div className="disclaimer">
            <strong>⚠️ Important:</strong> {results.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
}

export default CropAdvisory;
