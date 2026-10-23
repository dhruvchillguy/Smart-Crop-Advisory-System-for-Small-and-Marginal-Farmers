import React, { useState, useEffect } from 'react';
import { getProfile, saveProfile } from '../services/storage';
import { soilTypes, irrigationOptions, indianStates } from '../data/referenceData';

function FarmerProfile({ profile, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    farmerName: '',
    village: '',
    state: '',
    farmArea: '',
    farmUnit: 'acres',
    soilType: '',
    irrigation: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(!profile);

  // Load existing profile into form
  useEffect(() => {
    if (profile) {
      setFormData({
        farmerName: profile.farmerName || '',
        village: profile.village || '',
        state: profile.state || '',
        farmArea: profile.farmArea || '',
        farmUnit: profile.farmUnit || 'acres',
        soilType: profile.soilType || '',
        irrigation: profile.irrigation || '',
        notes: profile.notes || '',
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.farmerName.trim()) {
      newErrors.farmerName = 'Please enter your name';
    }
    if (!formData.state) {
      newErrors.state = 'Please select your state';
    }
    if (formData.farmArea && (isNaN(formData.farmArea) || Number(formData.farmArea) <= 0)) {
      newErrors.farmArea = 'Please enter a valid farm area';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await saveProfile(formData);
    if (result.success) {
      setMessage({ type: 'success', text: 'Farm profile saved successfully!' });
      setIsEditing(false);
      onProfileUpdate(formData);
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to save profile. Please try again.' });
    }
  };

  if (!isEditing && profile) {
    return (
      <div>
        <div className="page-header">
          <h1>👨‍🌾 My Farm Profile</h1>
          <p>Your farm and contact information</p>
        </div>

        {message && (
          <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
            <span className="alert-icon">{message.type === 'success' ? '✅' : '❌'}</span>
            <span>{message.text}</span>
          </div>
        )}

        <div className="card" style={{ maxWidth: '600px' }}>
          <div className="rec-detail">
            <span className="rec-detail-label">👤 Name</span>
            <span className="rec-detail-value">{formData.farmerName || '—'}</span>
          </div>
          <div className="rec-detail">
            <span className="rec-detail-label">📍 Village/Location</span>
            <span className="rec-detail-value">{formData.village || '—'}</span>
          </div>
          <div className="rec-detail">
            <span className="rec-detail-label">🗺️ State</span>
            <span className="rec-detail-value">{formData.state || '—'}</span>
          </div>
          <div className="rec-detail">
            <span className="rec-detail-label">📏 Farm Area</span>
            <span className="rec-detail-value">{formData.farmArea ? `${formData.farmArea} ${formData.farmUnit}` : '—'}</span>
          </div>
          <div className="rec-detail">
            <span className="rec-detail-label">🌍 Soil Type</span>
            <span className="rec-detail-value">{formData.soilType ? formData.soilType.charAt(0).toUpperCase() + formData.soilType.slice(1) : '—'}</span>
          </div>
          <div className="rec-detail">
            <span className="rec-detail-label">💧 Irrigation</span>
            <span className="rec-detail-value">
              {formData.irrigation === 'yes' ? 'Available' : formData.irrigation === 'limited' ? 'Limited' : formData.irrigation === 'no' ? 'Rainfed only' : '—'}
            </span>
          </div>
          {formData.notes && (
            <div className="rec-detail">
              <span className="rec-detail-label">📝 Notes</span>
              <span className="rec-detail-value">{formData.notes}</span>
            </div>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>👨‍🌾 {profile ? 'Edit' : 'Set Up'} Farm Profile</h1>
        <p>{profile ? 'Update your farm information' : 'Tell us about your farm to get better crop advice'}</p>
      </div>

      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
          <span className="alert-icon">{message.type === 'success' ? '✅' : '❌'}</span>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Personal Information</h3>

          <div className="form-group">
            <label className="form-label" htmlFor="farmerName">Your Name *</label>
            <input
              id="farmerName"
              name="farmerName"
              type="text"
              className="form-input"
              value={formData.farmerName}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.farmerName && <p className="form-error">{errors.farmerName}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="village">Village / Location</label>
            <input
              id="village"
              name="village"
              type="text"
              className="form-input"
              value={formData.village}
              onChange={handleChange}
              placeholder="Enter your village or town name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="state">State *</label>
            <select
              id="state"
              name="state"
              className="form-select"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select your state</option>
              {indianStates.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && <p className="form-error">{errors.state}</p>}
          </div>
        </div>

        <div className="card" style={{ marginTop: '1rem' }}>
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Farm Details</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="farmArea">Farm Area</label>
              <input
                id="farmArea"
                name="farmArea"
                type="number"
                step="0.1"
                min="0"
                className="form-input"
                value={formData.farmArea}
                onChange={handleChange}
                placeholder="e.g. 2.5"
              />
              {errors.farmArea && <p className="form-error">{errors.farmArea}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="farmUnit">Unit</label>
              <select
                id="farmUnit"
                name="farmUnit"
                className="form-select"
                value={formData.farmUnit}
                onChange={handleChange}
              >
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
                <option value="bigha">Bigha</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="soilType">Soil Type</label>
            <select
              id="soilType"
              name="soilType"
              className="form-select"
              value={formData.soilType}
              onChange={handleChange}
            >
              <option value="">Select soil type</option>
              {soilTypes.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="irrigation">Irrigation Availability</label>
            <select
              id="irrigation"
              name="irrigation"
              className="form-select"
              value={formData.irrigation}
              onChange={handleChange}
            >
              <option value="">Select irrigation</option>
              {irrigationOptions.map(i => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="notes">
              Farm Notes <span className="form-hint">(optional — any special conditions)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              className="form-textarea"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Near river, hilly terrain, etc."
              rows={3}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            💾 Save Profile
          </button>
          {profile && (
            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FarmerProfile;
