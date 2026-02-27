/**
 * Formats a date object to a readable string based on locale.
 * @param {Date|string} date - Date object or string.
 * @param {string} locale - Locale code (e.g., 'en-US').
 */
export const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
};

/**
 * Returns the zodiac sign for a given date.
 * @param {number} day 
 * @param {number} month (1-12)
 */
export const getZodiacSign = (day, month) => {
  const zodiac = [
    { sign: 'capricorn', endDay: 19 },
    { sign: 'aquarius', endDay: 18 },
    { sign: 'pisces', endDay: 20 },
    { sign: 'aries', endDay: 19 },
    { sign: 'taurus', endDay: 20 },
    { sign: 'gemini', endDay: 20 },
    { sign: 'cancer', endDay: 22 },
    { sign: 'leo', endDay: 22 },
    { sign: 'virgo', endDay: 22 },
    { sign: 'libra', endDay: 22 },
    { sign: 'scorpio', endDay: 21 },
    { sign: 'sagittarius', endDay: 21 },
    { sign: 'capricorn', endDay: 31 }
  ];

  // Adjust month to 0-index for array access if needed, but here we use logic
  // Simple check:
  if (day <= zodiac[month - 1].endDay) {
    return zodiac[month - 1].sign;
  } else {
    return zodiac[month].sign; // wraps correctly because array has extra capricorn at end
  }
};
