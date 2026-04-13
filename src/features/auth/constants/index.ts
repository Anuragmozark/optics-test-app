export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_TAKEN: 'An account with this email already exists.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC: 'Something went wrong. Please try again.',
} as const;

export const PASSWORD_MIN_LENGTH = 8;
