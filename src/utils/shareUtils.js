/**
 * Uses the Web Share API to share content.
 * Falls back to clipboard copy if sharing is not supported.
 * @param {string} title - Title of the share.
 * @param {string} text - Body text to share.
 * @param {string} url - URL to share (optional).
 * @returns {Promise<boolean>} - True if shared successfully.
 */
export const shareContent = async (title, text, url = window.location.href) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return true;
    } catch (error) {
      console.warn('Error sharing:', error);
      return false;
    }
  } else {
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`);
      alert('Copied to clipboard!'); // Simple fallback alert
      return true;
    } catch (err) {
      console.error('Clipboard failed', err);
      return false;
    }
  }
};
