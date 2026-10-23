import React, { useState } from 'react';
import { weatherPrecautions } from '../data/referenceData';
import { InfoIcon } from '../components/Icons';

function Weather() {
  const [weatherData, setWeatherData] = useState({
    temperature: '32',
    humidity: '65',
    rainfall: '50',
    condition: 'warm',
  });
  const [isManual, setIsManual] = useState(true);
  const [apiStatus, setApiStatus] = useState('unavailable'); // 'live', 'unavailable', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeatherData(prev => ({ ...prev, [name]: value }));
  };

  // Determine weather category from temperature
  const getWeatherCategory = () => {
    const temp = Number(weatherData.temperature);
    if (isNaN(temp)) return 'warm';
    if (temp > 35) return 'hot';
    if (temp > 25) return 'warm';
    if (temp > 15) return 'mild';
    return 'cold';
  };

  const category = getWeatherCategory();
  const precautions = weatherPrecautions[category] || weatherPrecautions.warm;
  const rainPrecautions = Number(weatherData.rainfall) > 30 ? weatherPrecautions.rainy : null;

  return (
    <div>
      <div className="page-header">
        <h1>Weather Advisory</h1>
        <p>Check weather conditions and get farming precautions</p>
      </div>

      {/* Data Source Notice */}
      <div className="alert alert-warning">
        <span className="alert-icon">
          <InfoIcon size={18} />
        </span>
        <div>
          <strong>Sample / Manual Data:</strong> Weather information below is entered manually for demonstration.
          This is NOT live weather data. For actual weather, check your local weather service or Kisan portal.
        </div>
      </div>

      {/* Weather Input */}
      <div className="card" style={{ marginBottom: '1.5rem', maxWidth: '600px' }}>
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Enter Current Weather</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Enter the weather conditions in your area. You can find this information from a local weather source, the Kisan portal, or your own observation.
        </p>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="w-temp">Temperature (°C)</label>
            <input
              id="w-temp"
              name="temperature"
              type="number"
              className="form-input"
              value={weatherData.temperature}
              onChange={handleChange}
              placeholder="e.g. 32"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="w-humidity">Humidity (%)</label>
            <input
              id="w-humidity"
              name="humidity"
              type="number"
              className="form-input"
              value={weatherData.humidity}
              onChange={handleChange}
              placeholder="e.g. 65"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="w-rain">Expected Rainfall (mm/month)</label>
            <input
              id="w-rain"
              name="rainfall"
              type="number"
              className="form-input"
              value={weatherData.rainfall}
              onChange={handleChange}
              placeholder="e.g. 100"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="w-condition">Overall Condition</label>
            <select
              id="w-condition"
              name="condition"
              className="form-select"
              value={weatherData.condition}
              onChange={handleChange}
            >
              <option value="hot">Hot / Sunny</option>
              <option value="warm">Warm / Clear</option>
              <option value="mild">Mild / Pleasant</option>
              <option value="cold">Cold</option>
              <option value="rainy">Rainy / Cloudy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Weather Display */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h3 className="card-title">Current Weather Conditions</h3>
          <span className="badge badge-warning">Manual Entry</span>
        </div>
        <div className="weather-display">
          <div className="weather-item">
            <div className="weather-value">{weatherData.temperature || '--'}°C</div>
            <div className="weather-label">Temperature</div>
          </div>
          <div className="weather-item">
            <div className="weather-value">{weatherData.humidity || '--'}%</div>
            <div className="weather-label">Humidity</div>
          </div>
          <div className="weather-item">
            <div className="weather-value">{weatherData.rainfall || '--'} mm</div>
            <div className="weather-label">Rainfall / month</div>
          </div>
          <div className="weather-item">
            <div className="weather-value">{precautions.condition.split('(')[0].trim()}</div>
            <div className="weather-label">Condition</div>
          </div>
        </div>
      </div>

      {/* Precautions */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>
          Farming Precautions — {precautions.condition}
        </h3>
        <ul className="guidance-list">
          {precautions.precautions.map((p, i) => (
            <li key={i}>
              <span className="guidance-icon">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rain precautions if applicable */}
      {rainPrecautions && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>
            Rainfall Precautions
          </h3>
          <ul className="guidance-list">
            {rainPrecautions.precautions.map((p, i) => (
              <li key={i}>
                <span className="guidance-icon">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Irrigation advice based on weather */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Irrigation Considerations</h3>
        <ul className="guidance-list">
          {category === 'hot' && (
            <>
              <li><span className="guidance-icon">•</span><span>Water early morning (before 8 AM) or late evening (after 5 PM) to reduce evaporation losses</span></li>
              <li><span className="guidance-icon">•</span><span>Consider drip irrigation if available — it saves 30–50% water compared to flood irrigation</span></li>
              <li><span className="guidance-icon">•</span><span>Mulching around plants reduces soil temperature and water evaporation</span></li>
            </>
          )}
          {category === 'warm' && (
            <>
              <li><span className="guidance-icon">•</span><span>Maintain regular watering schedule as per crop needs</span></li>
              <li><span className="guidance-icon">•</span><span>Check soil moisture before watering — if top 2 inches are dry, irrigate</span></li>
            </>
          )}
          {category === 'mild' && (
            <>
              <li><span className="guidance-icon">•</span><span>Reduce irrigation frequency — evaporation is lower in mild weather</span></li>
              <li><span className="guidance-icon">•</span><span>Ensure good drainage to prevent waterlogging in cooler conditions</span></li>
            </>
          )}
          {category === 'cold' && (
            <>
              <li><span className="guidance-icon">•</span><span>Light evening irrigation can protect crops from frost damage</span></li>
              <li><span className="guidance-icon">•</span><span>Avoid heavy irrigation — cold waterlogged soil damages plant roots</span></li>
            </>
          )}
        </ul>
      </div>

      <div className="disclaimer">
        <strong>Note:</strong> Weather-based advice is general guidance. Actual irrigation and farming decisions 
        should be based on your specific crop stage, soil moisture, and local conditions.
      </div>
    </div>
  );
}

export default Weather;
