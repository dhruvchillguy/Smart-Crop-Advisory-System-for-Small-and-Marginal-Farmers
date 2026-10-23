/**
 * Rule-Based Crop Advisory Engine
 * 
 * Generates crop recommendations based on farmer inputs:
 * - State/Region
 * - Soil type
 * - Season
 * - Irrigation availability
 * - Optional: temperature, rainfall
 * 
 * The engine scores each crop based on how well it matches the input conditions.
 * Scores are transparent and explainable.
 * 
 * DISCLAIMER: These are general recommendations for educational purposes.
 * Actual farming decisions should consider local conditions, soil test results,
 * and advice from agricultural extension services.
 */

import cropData from '../data/cropData.js';

/**
 * Score a crop against the given conditions
 * Returns a score object with total score, reasons, and warnings
 */
function scoreCrop(crop, conditions) {
  let score = 0;
  const maxScore = 100;
  const reasons = [];
  const warnings = [];

  const { state, soilType, season, irrigation, temperature, rainfall } = conditions;

  // 1. Season match (30 points) — most important
  if (crop.seasons.includes(season)) {
    score += 30;
    reasons.push(`Suitable for ${season} season`);
  } else {
    warnings.push(`Not typically grown in ${season} season in most regions`);
    // Don't completely exclude — some farmers grow off-season
  }

  // 2. State/Region match (20 points)
  const stateNorm = state.toLowerCase();
  if (crop.states.includes(stateNorm)) {
    score += 20;
    reasons.push(`Commonly grown in ${state}`);
  } else {
    // Partial credit if neighboring states grow it
    score += 5;
    reasons.push(`May be possible in ${state} — verify with local agriculture office`);
  }

  // 3. Soil type match (20 points)
  if (crop.soilTypes.includes(soilType)) {
    score += 20;
    reasons.push(`Well suited to ${soilType} soil`);
  } else {
    score += 5;
    warnings.push(`${soilType} soil is not ideal — consider soil amendments`);
  }

  // 4. Irrigation match (15 points)
  const hasIrrigation = irrigation === 'yes';
  const hasLimitedIrrigation = irrigation === 'limited';

  if (crop.irrigationRequired) {
    if (hasIrrigation) {
      score += 15;
      reasons.push('Your irrigation can meet this crop\'s water needs');
    } else if (hasLimitedIrrigation) {
      score += 8;
      warnings.push('This crop needs regular irrigation — limited water may affect yield');
    } else {
      score += 0;
      warnings.push('This crop requires irrigation which is not available — consider if monsoon rainfall is sufficient');
    }
  } else {
    // Crop can grow rainfed
    score += 15;
    if (!hasIrrigation) {
      reasons.push('Can grow without irrigation (rainfed)');
    } else {
      reasons.push('Irrigation available will help — but crop can survive on rain');
    }
  }

  // 5. Temperature match (10 points) — only if provided
  if (temperature !== undefined && temperature !== '' && temperature !== null) {
    const temp = Number(temperature);
    if (!isNaN(temp)) {
      if (temp >= crop.tempRange.min && temp <= crop.tempRange.max) {
        score += 10;
        reasons.push(`Current temperature (${temp}°C) is within suitable range (${crop.tempRange.min}–${crop.tempRange.max}°C)`);
      } else if (temp >= crop.tempRange.min - 5 && temp <= crop.tempRange.max + 5) {
        score += 5;
        warnings.push(`Temperature (${temp}°C) is outside ideal range (${crop.tempRange.min}–${crop.tempRange.max}°C) — may still work`);
      } else {
        warnings.push(`Temperature (${temp}°C) is significantly outside suitable range (${crop.tempRange.min}–${crop.tempRange.max}°C)`);
      }
    }
  } else {
    // No temperature data — give partial credit
    score += 5;
  }

  // 6. Rainfall match (5 points) — only if provided
  if (rainfall !== undefined && rainfall !== '' && rainfall !== null) {
    const rain = Number(rainfall);
    if (!isNaN(rain)) {
      if (rain >= crop.rainfallRange.min && rain <= crop.rainfallRange.max) {
        score += 5;
        reasons.push(`Rainfall (${rain} mm/month) matches crop needs`);
      } else {
        warnings.push(`Rainfall (${rain} mm/month) may not match ideal range (${crop.rainfallRange.min}–${crop.rainfallRange.max} mm/month)`);
      }
    }
  } else {
    score += 2;
  }

  // Normalize to percentage
  const normalizedScore = Math.min(Math.round((score / maxScore) * 100), 100);

  // Determine suitability level
  let suitability;
  if (normalizedScore >= 70) {
    suitability = 'high';
  } else if (normalizedScore >= 45) {
    suitability = 'medium';
  } else {
    suitability = 'low';
  }

  return {
    ...crop,
    suitabilityScore: normalizedScore,
    suitability,
    reasons,
    warnings,
  };
}

/**
 * Generate crop recommendations based on farmer input
 * Returns sorted array of crop recommendations
 */
export function generateRecommendations(conditions) {
  if (!conditions.state || !conditions.soilType || !conditions.season) {
    return {
      success: false,
      error: 'Please select your state, soil type, and season to get recommendations.',
      recommendations: [],
    };
  }

  const scored = cropData.map(crop => scoreCrop(crop, conditions));

  // Sort by score, highest first
  scored.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // Filter out very low matches (below 20%)
  const recommendations = scored.filter(crop => crop.suitabilityScore >= 20);

  if (recommendations.length === 0) {
    return {
      success: false,
      error: 'No suitable crops found for these conditions. Try adjusting your inputs or consult your local agriculture office.',
      recommendations: [],
    };
  }

  return {
    success: true,
    recommendations,
    conditions,
    generatedAt: new Date().toISOString(),
    disclaimer: 'These recommendations are general guidance based on common farming practices. Actual crop selection should consider local conditions, soil test results, market prices, and advice from your nearest Krishi Vigyan Kendra or agriculture office.',
  };
}

/**
 * Get suitability label text
 */
export function getSuitabilityLabel(suitability) {
  switch (suitability) {
    case 'high': return 'Highly Suitable';
    case 'medium': return 'Moderately Suitable';
    case 'low': return 'Less Suitable';
    default: return 'Unknown';
  }
}
