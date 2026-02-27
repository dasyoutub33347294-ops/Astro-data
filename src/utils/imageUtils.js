/**
 * Converts a File object to a Base64 string.
 * @param {File} file - The file object from input.
 * @returns {Promise<string>} - Base64 string.
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Resizes an image if it exceeds max dimensions (to save tokens/bandwidth).
 * @param {string} base64Str - The original base64 image.
 * @param {number} maxWidth - Max width in pixels.
 * @param {number} maxHeight - Max height in pixels.
 * @returns {Promise<string>} - Resized base64 string.
 */
export const resizeImage = (base64Str, maxWidth = 800, maxHeight = 800) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.8)); // 0.8 quality
    };
  });
};
