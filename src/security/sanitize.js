import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * @param {string} dirty HTML string to sanitize
 * @returns {string} Sanitized HTML string
 */
export const sanitizeHTML = (dirty) => {
  if (typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre', 'span'],
    ALLOWED_ATTR: ['href', 'title', 'class', 'target', 'rel']
  });
};

/**
 * Sanitizes a URL to ensure it doesn't use the javascript: protocol
 * @param {string} url The URL to check
 * @returns {string} The sanitized URL or empty string if invalid
 */
export const sanitizeURL = (url) => {
  if (typeof url !== 'string') return '';
  const sanitized = url.trim();
  
  try {
    const parsedUrl = new URL(sanitized, window.location.origin);
    if (parsedUrl.protocol === 'javascript:' || parsedUrl.protocol === 'vbscript:') {
      return '';
    }
    return sanitized;
  } catch (e) {
    // If it's a relative URL, we just ensure it doesn't start with javascript:
    if (sanitized.toLowerCase().startsWith('javascript:') || sanitized.toLowerCase().startsWith('vbscript:')) {
      return '';
    }
    return sanitized;
  }
};

/**
 * Strips all HTML tags from a string
 * @param {string} str The string to process
 * @returns {string} The string without any HTML tags
 */
export const stripTags = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '');
};
