import { describe, it, expect } from 'vitest';
import { generateRecommendations, getSuitabilityLabel } from '../src/services/advisoryEngine.js';
import cropData from '../src/data/cropData.js';

describe('Crop Advisory Engine', () => {
  it('should return error when mandatory inputs are missing', () => {
    const res = generateRecommendations({});
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();

    const partial = generateRecommendations({ state: 'Punjab' });
    expect(partial.success).toBe(false);
  });

  it('should generate recommendations for Punjab in Rabi season on Alluvial soil', () => {
    const res = generateRecommendations({
      state: 'Punjab',
      soilType: 'alluvial',
      season: 'rabi',
      irrigation: 'yes',
      temperature: '18',
      rainfall: '40',
    });

    expect(res.success).toBe(true);
    expect(res.recommendations).toBeInstanceOf(Array);
    expect(res.recommendations.length).toBeGreaterThan(0);

    // Wheat should be highly recommended for Punjab Rabi Alluvial
    const wheat = res.recommendations.find(c => c.name.toLowerCase().includes('wheat'));
    expect(wheat).toBeDefined();
    expect(wheat.suitabilityScore).toBeGreaterThanOrEqual(70);
    expect(wheat.suitability).toBe('high');
  });

  it('should generate recommendations for Kharif season with Rice', () => {
    const res = generateRecommendations({
      state: 'West Bengal',
      soilType: 'clay',
      season: 'kharif',
      irrigation: 'yes',
      temperature: '28',
      rainfall: '200',
    });

    expect(res.success).toBe(true);
    const rice = res.recommendations.find(c => c.name.toLowerCase().includes('rice'));
    expect(rice).toBeDefined();
    expect(rice.suitabilityScore).toBeGreaterThan(60);
  });

  it('should correctly deduct score or warn when irrigation is unavailable for high water crops', () => {
    const res = generateRecommendations({
      state: 'Punjab',
      soilType: 'alluvial',
      season: 'kharif',
      irrigation: 'no',
      temperature: '30',
      rainfall: '40',
    });

    expect(res.success).toBe(true);
    const rice = res.recommendations.find(c => c.name.toLowerCase().includes('rice'));
    if (rice) {
      expect(rice.warnings.some(w => w.toLowerCase().includes('irrigation'))).toBe(true);
    }
  });

  it('should return correct suitability label for various suitability categories', () => {
    expect(getSuitabilityLabel('high')).toBe('Highly Suitable');
    expect(getSuitabilityLabel('medium')).toBe('Moderately Suitable');
    expect(getSuitabilityLabel('low')).toBe('Less Suitable');
    expect(getSuitabilityLabel('invalid')).toBe('Unknown');
  });

  it('should verify dataset contains essential Indian crops', () => {
    expect(cropData.length).toBeGreaterThanOrEqual(10);
    const names = cropData.map(c => c.name);
    expect(names).toContain('Rice (Paddy)');
    expect(names).toContain('Wheat');
    expect(names).toContain('Maize (Corn)');
  });
});
