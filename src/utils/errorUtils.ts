import { AxiosError } from 'axios';
import { AUTH_ERRORS } from '../features/auth/constants';

type ApiErrorBody = {
  message?: string;
};

/**
 * Extracts a human-readable error message from any thrown error.
 * Handles Axios errors, plain Error objects, and unknown shapes.
 */
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Server returned a structured error body
    const serverMessage = (error.response?.data as ApiErrorBody)?.message;
    if (serverMessage) return serverMessage;

    // Network-level failure (no response)
    if (!error.response) return AUTH_ERRORS.NETWORK_ERROR;

    // Map common HTTP status codes
    switch (error.response.status) {
      case 401:
        return AUTH_ERRORS.INVALID_CREDENTIALS;
      case 409:
        return AUTH_ERRORS.EMAIL_TAKEN;
      default:
        return AUTH_ERRORS.GENERIC;
    }
  }

  if (error instanceof Error) return error.message;

  return AUTH_ERRORS.GENERIC;
};
