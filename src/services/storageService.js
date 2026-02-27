/**
 * Simple wrapper for LocalStorage to handle JSON parsing safely.
 * Used for caching readings, user preferences, and history.
 */

export const saveToStorage = (key, data) => {
  try {
    const stringified = JSON.stringify(data);
    localStorage.setItem(key, stringified);
    return true;
  } catch (e) {
    console.error('Storage Save Error:', e);
    return false;
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Storage Load Error:', e);
    return defaultValue;
  }
};

export const clearStorageKey = (key) => {
  localStorage.removeItem(key);
};

// Keys Constant
export const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  APP_LANGUAGE: 'app_language',
  PALM_HISTORY: 'palm_scan_history',
  TAROT_HISTORY: 'tarot_reading_history',
  DAILY_GUIDANCE: 'daily_guidance_cache' // To prevent re-fetching daily guidance
};
