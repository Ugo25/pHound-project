import { 
    EMAIL_REGEX, 
    PASSWORD_REGEX, 
    PASSWORD_MIN_LENGTH, 
    TARGET_PATTERNS, 
    PRIVATE_IP_RANGES,
    MAX_INPUT_LENGTH
  } from './constants';
  
  export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    return EMAIL_REGEX.test(email);
  };
  
  export const validatePassword = (password) => {
    const result = { valid: true, errors: [] };
    
    if (!password || typeof password !== 'string') {
      result.valid = false;
      result.errors.push('Password is required');
      return result;
    }
    
    if (password.length < PASSWORD_MIN_LENGTH) {
      result.valid = false;
      result.errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
    }
    
    if (!PASSWORD_REGEX.test(password)) {
      result.valid = false;
      if (!/(?=.*[a-z])/.test(password)) result.errors.push('Must contain a lowercase letter');
      if (!/(?=.*[A-Z])/.test(password)) result.errors.push('Must contain an uppercase letter');
      if (!/(?=.*\d)/.test(password)) result.errors.push('Must contain a number');
      if (!/(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/|\\€£¥])/.test(password)) {
        result.errors.push('Must contain a special character');
      }
    }
    
    return result;
  };
  
  export const validateTarget = (target) => {
    const result = { valid: false, error: null };
    
    if (!target || typeof target !== 'string') {
      result.error = 'Target is required';
      return result;
    }
  
    // Check if it's a private IP
    const isPrivate = PRIVATE_IP_RANGES.some(regex => regex.test(target));
    if (isPrivate) {
      result.error = 'Scanning private IP addresses is not allowed';
      return result;
    }
  
    // Check if it matches allowed patterns
    if (TARGET_PATTERNS.IPV4.test(target) || 
        TARGET_PATTERNS.IPV6.test(target) || 
        TARGET_PATTERNS.DOMAIN.test(target) ||
        TARGET_PATTERNS.CIDR.test(target)) {
      result.valid = true;
    } else {
      result.error = 'Invalid target format. Must be a valid IP, Domain, or CIDR block.';
    }
  
    return result;
  };
  
  export const validatePort = (port) => {
    const parsed = parseInt(port, 10);
    return !isNaN(parsed) && parsed >= 1 && parsed <= 65535;
  };
  
  export const sanitizeInput = (str, maxLength = MAX_INPUT_LENGTH) => {
    if (typeof str !== 'string') return '';
    return str.substring(0, maxLength).trim();
  };
