// ─── Request Payloads ────────────────────────────────────────────────────────

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// ─── API Responses ───────────────────────────────────────────────────────────

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};

// ─── Redux State ─────────────────────────────────────────────────────────────

export type AuthState = {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};
