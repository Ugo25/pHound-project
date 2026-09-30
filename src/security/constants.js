/**
 * Security-related constants and configuration for the application.
 */

export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 300000; // 5 minutes in milliseconds
export const SESSION_TIMEOUT = 1800000; // 30 minutes in milliseconds
export const PASSWORD_MIN_LENGTH = 12;
export const MAX_INPUT_LENGTH = 500;

// Regular expressions for validation
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/|\\€£¥]).{12,}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Patterns for targeting (IPv4, IPv6, Domain, CIDR)
export const TARGET_PATTERNS = {
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  IPV6: /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i,
  DOMAIN: /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i,
  CIDR: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:[0-9]|[1-2][0-9]|3[0-2])$/
};

// Private IP ranges to block from targeting
export const PRIVATE_IP_RANGES = [
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^127\./,
  /^0\./,
  /^169\.254\./,
  /^22[4-9]\./,
  /^23[0-9]\./,
  /^255\.255\.255\.255/
];
