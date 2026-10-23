import React, { useState, useEffect } from 'react';
import { getSavedRecommendations, deleteRecommendation } from '../services/storage';
import { getSuitabilityLabel } from '../services/advisoryEngine';

function SavedRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const loadRecommendations = async () => {
    setLoading(true);
    const recs = await getSavedRecommendations();
    setRecommendations(recs);
    setLoading(false);
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const handleDelete = async (id, cropName) => {
    if (!window.confirm(`Delete the saved recommendation for "${cropName}"?`)) {
      return;
    }
    const result = await deleteRecommendation(id);
    if (result.success) {
      setMessage({ type: 'success', text: `Recommendation for "${cropName}" deleted.` });
      loadRecommendations();
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to delete. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>📋 Saved Recommendations</h1>
        </div>
        <div className="loading">Loading saved recommendations...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>📋 Saved Recommendations</h1>
        <p>Your previously saved crop recommendations</p>
      </div>

      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
          <span className="alert-icon">{message.type === 'success' ? '✅' : '❌'}</span>
          <span>{message.text}</span>
        </div>
      )}

      {recommendations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No saved recommendations yet</h3>
          <p>Go to the Crop Advice section, get recommendations, and save the ones you like.</p>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
            {recommendations.length} saved recommendation{recommendations.length !== 1 ? 's' : ''}
          </p>

          {recommendations.map((rec) => (
            <div key={rec.id} className="rec-card" style={{ marginBottom: '1rem' }}>
              <div className="rec-card-header">
                <div>
                  <span className="rec-crop-name">{rec.cropName}</span>
                  {rec.hindiName && <span style={{ marginLeft: '0.5rem', color: '#888' }}>({rec.hindiName})</span>}
                </div>
                <span className={`badge badge-${rec.suitability === 'high' ? 'success' : rec.suitability === 'medium' ? 'warning' : 'danger'}`}>
                  {getSuitabilityLabel(rec.suitability)} ({rec.suitabilityScore}%)
                </span>
              </div>

              {/* Conditions it was generated for */}
              {rec.conditions && (
                <div style={{ marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  📍 {rec.conditions.state} | 🌍 {rec.conditions.soilType} soil | 📅 {rec.conditions.season} season
                  {rec.conditions.irrigation && ` | 💧 ${rec.conditions.irrigation} irrigation`}
                </div>
              )}

              {/* Reasons */}
              {rec.reasons && rec.reasons.length > 0 && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--color-success)' }}>✅ Suitable because:</strong>
                  <ul style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                    {rec.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}

              {rec.warnings && rec.warnings.length > 0 && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--color-warning)' }}>⚠️ Consider:</strong>
                  <ul style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                    {rec.warnings.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              )}

              <div className="divider" />

              <div className="rec-detail">
                <span className="rec-detail-label">🌱 Sowing</span>
                <span className="rec-detail-value">{rec.sowingGuidance}</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">💧 Water</span>
                <span className="rec-detail-value">{rec.waterNeeds}</span>
              </div>
              <div className="rec-detail">
                <span className="rec-detail-label">⏱️ Duration</span>
                <span className="rec-detail-value">{rec.duration}</span>
              </div>

              <div className="rec-actions">
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Saved on {new Date(rec.savedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(rec.id, rec.cropName)}
                  style={{ marginLeft: 'auto' }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecommendations;
