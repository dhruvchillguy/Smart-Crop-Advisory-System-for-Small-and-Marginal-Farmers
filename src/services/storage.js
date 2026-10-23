/**
 * Storage Service
 * Uses Electron IPC when running in Electron, falls back to localStorage in browser.
 * This ensures the app works both as a desktop app and in a browser during development.
 */

const isElectron = typeof window !== 'undefined' && window.electronAPI?.isElectron;

// ---- PROFILE ----

export async function getProfile() {
  if (isElectron) {
    return await window.electronAPI.getProfile();
  }
  try {
    const raw = localStorage.getItem('smartcrop_profile');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveProfile(profile) {
  if (isElectron) {
    return await window.electronAPI.saveProfile(profile);
  }
  try {
    localStorage.setItem('smartcrop_profile', JSON.stringify(profile));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ---- SAVED RECOMMENDATIONS ----

export async function getSavedRecommendations() {
  if (isElectron) {
    return await window.electronAPI.getSavedRecommendations();
  }
  try {
    const raw = localStorage.getItem('smartcrop_recommendations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveRecommendation(recommendation) {
  if (isElectron) {
    return await window.electronAPI.saveRecommendation(recommendation);
  }
  try {
    const existing = await getSavedRecommendations();
    recommendation.id = Date.now().toString();
    recommendation.savedAt = new Date().toISOString();
    existing.push(recommendation);
    localStorage.setItem('smartcrop_recommendations', JSON.stringify(existing));
    return { success: true, id: recommendation.id };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function deleteRecommendation(id) {
  if (isElectron) {
    return await window.electronAPI.deleteRecommendation(id);
  }
  try {
    const existing = await getSavedRecommendations();
    const filtered = existing.filter(r => r.id !== id);
    localStorage.setItem('smartcrop_recommendations', JSON.stringify(filtered));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
