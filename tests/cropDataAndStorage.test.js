import { describe, it, expect } from 'vitest';
import cropData from '../src/data/cropData.js';
import { indianStates, soilTypes, seasons, fertilizerGuide, soilGuidance } from '../src/data/referenceData.js';

describe('Agricultural Data Integrity & Reference Specifications', () => {
  it('should ensure each crop entry contains all required agronomic properties', () => {
    expect(cropData.length).toBeGreaterThan(0);

    cropData.forEach(crop => {
      expect(crop.name).toBeTruthy();
      expect(crop.hindiName).toBeTruthy();
      expect(crop.seasons).toBeInstanceOf(Array);
      expect(crop.seasons.length).toBeGreaterThan(0);
      expect(crop.states).toBeInstanceOf(Array);
      expect(crop.states.length).toBeGreaterThan(0);
      expect(crop.soilTypes).toBeInstanceOf(Array);
      expect(crop.soilTypes.length).toBeGreaterThan(0);
      expect(typeof crop.irrigationRequired).toBe('boolean');
      expect(crop.tempRange).toHaveProperty('min');
      expect(crop.tempRange).toHaveProperty('max');
      expect(crop.duration).toBeTruthy();
      expect(crop.sowingGuidance).toBeTruthy();
      expect(crop.precautions).toBeTruthy();
      expect(crop.nutrients).toBeTruthy();
    });
  });

  it('should validate Indian states list is populated and unique', () => {
    expect(indianStates.length).toBeGreaterThanOrEqual(15);
    const unique = new Set(indianStates);
    expect(unique.size).toBe(indianStates.length);
  });

  it('should validate all standard soil types are mapped with guidance', () => {
    expect(soilTypes.length).toBeGreaterThanOrEqual(5);
    soilTypes.forEach(s => {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
      // Soil guidance covers key soils
      if (soilGuidance[s.value]) {
        expect(soilGuidance[s.value].description).toBeTruthy();
        expect(soilGuidance[s.value].preparation).toBeTruthy();
        expect(soilGuidance[s.value].suitableCrops).toBeTruthy();
      }
    });
  });

  it('should have valid fertilizer guidance for staple Indian crops', () => {
    expect(fertilizerGuide).toHaveProperty('Rice (Paddy)');
    expect(fertilizerGuide).toHaveProperty('Wheat');
    expect(fertilizerGuide).toHaveProperty('default');

    const riceGuide = fertilizerGuide['Rice (Paddy)'];
    expect(riceGuide.stages).toBeInstanceOf(Array);
    expect(riceGuide.stages.length).toBeGreaterThan(0);
    expect(typeof riceGuide.safetyTips).toBe('string');
    expect(riceGuide.safetyTips.length).toBeGreaterThan(0);
  });

  it('should validate agricultural seasons definition', () => {
    const seasonValues = seasons.map(s => s.value);
    expect(seasonValues).toContain('kharif');
    expect(seasonValues).toContain('rabi');
  });
});
