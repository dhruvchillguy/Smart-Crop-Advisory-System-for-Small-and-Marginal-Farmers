import React, { useState } from 'react';
import { fertilizerGuide } from '../data/referenceData';
import cropData from '../data/cropData';

function FertilizerGuide() {
  const [selectedCrop, setSelectedCrop] = useState('');

  const cropNames = cropData.map(c => c.name);
  const guide = selectedCrop ? (fertilizerGuide[selectedCrop] || fertilizerGuide['default']) : null;
  const isDefault = selectedCrop && !fertilizerGuide[selectedCrop];

  return (
    <div>
      <div className="page-header">
        <h1>🧪 Fertilizer Guide</h1>
        <p>Get general fertilizer guidance for your crop at different growth stages</p>
      </div>

      <div className="alert alert-warning">
        <span className="alert-icon">⚠️</span>
        <div>
          <strong>Important:</strong> Fertilizer doses vary greatly based on soil test results, 
          crop variety, and local conditions. Always follow doses recommended by your local 
          agriculture office or Krishi Vigyan Kendra (KVK) based on your soil test report.
        </div>
      </div>

      {/* Crop Selection */}
      <div className="card" style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="fert-crop">Select Crop</label>
          <select
            id="fert-crop"
            className="form-select"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="">Choose a crop</option>
            {cropNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {!selectedCrop && (
        <div className="empty-state">
          <div className="empty-icon">🧪</div>
          <h3>Select a crop above</h3>
          <p>We will show you stage-wise fertilizer guidance and safety tips.</p>
        </div>
      )}

      {guide && (
        <div>
          {isDefault && (
            <div className="alert alert-info">
              <span className="alert-icon">ℹ️</span>
              <span>Showing general fertilizer guidance. Specific data for "{selectedCrop}" will be added in future updates.</span>
            </div>
          )}

          {/* Growth Stages */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '1rem' }}>📅 Stage-wise Fertilizer Application for {selectedCrop}</h3>
            {guide.stages.map((stage, index) => (
              <div key={index} style={{
                padding: '1rem',
                background: index % 2 === 0 ? 'var(--color-bg)' : 'var(--color-white)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{
                    background: 'var(--color-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    flexShrink: 0,
                  }}>
                    {index + 1}
                  </span>
                  <div>
                    <strong style={{ fontSize: '1.05rem' }}>{stage.stage}</strong>
                    <p style={{ margin: '0.25rem 0', color: 'var(--color-text-secondary)' }}>{stage.nutrients}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <em>💡 {stage.note}</em>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Advice */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>📋 General Advice</h3>
            <p style={{ lineHeight: '1.7' }}>{guide.generalAdvice}</p>
          </div>

          {/* Safety Tips */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>🛡️ Safety Tips</h3>
            <p style={{ lineHeight: '1.7' }}>{guide.safetyTips}</p>
          </div>

          {/* Soil Test Reminder */}
          <div className="card" style={{
            background: 'var(--color-success-light)',
            borderColor: '#bbf7d0',
          }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem', color: '#166534' }}>🧪 Get a Soil Test</h3>
            <p style={{ lineHeight: '1.7', color: '#166534' }}>
              The best way to know exactly which fertilizers your soil needs is to get a <strong>soil test</strong>.
              Visit your nearest Soil Testing Laboratory (usually available at the district agriculture office or KVK).
              Soil testing costs are very low and often subsidised by the government.
              The report will tell you exactly which nutrients are deficient and how much fertilizer to apply.
            </p>
          </div>

          <div className="disclaimer">
            <strong>Reminder:</strong> The fertilizer information above is general guidance only. 
            Do not apply more fertilizer than recommended — excess application wastes money, 
            can damage crops, and harms the environment. Always use soil test-based recommendations.
          </div>
        </div>
      )}
    </div>
  );
}

export default FertilizerGuide;
