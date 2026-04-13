import apiClient from '../../../api/client';
import type { AuthResponse, SignInPayload, SignUpPayload } from '../types';

// ─── Auth Service ─────────────────────────────────────────────────────────────
// All auth-related API calls live here. Swap endpoints to match your backend.

const authService = {
  /**
   * Sign in with email + password.
   * POST /auth/sign-in
   */
  signIn: async (payload: SignInPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/sign-in', payload);
    return data;
  },

  /**
   * Register a new account.
   * POST /auth/sign-up
   */
  signUp: async (payload: Omit<SignUpPayload, 'confirmPassword'>): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/sign-up', payload);
    return data;
  },

  /**
   * Sign out — invalidate token on server.
   * POST /auth/sign-out
   */
  signOut: async (): Promise<void> => {
    await apiClient.post('/auth/sign-out');
  },
};

export default authService;
