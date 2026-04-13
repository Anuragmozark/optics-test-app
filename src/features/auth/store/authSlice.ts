import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { extractErrorMessage } from '../../../utils/errorUtils';
import type { AuthState, SignInPayload, SignUpPayload, AuthResponse } from '../types';

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const signIn = createAsyncThunk<AuthResponse, SignInPayload>(
  'auth/signIn',
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.signIn(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const signUp = createAsyncThunk<AuthResponse, SignUpPayload>(
  'auth/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const { confirmPassword: _, ...body } = payload;
      return await authService.signUp(body);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await authService.signOut();
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.error = null;
    },
    resetAuth: () => initialState,
  },
  extraReducers: builder => {
    // ── Sign In ──
    builder
      .addCase(signIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // ── Sign Up ──
    builder
      .addCase(signUp.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // ── Sign Out ──
    builder
      .addCase(signOut.fulfilled, () => initialState)
      .addCase(signOut.rejected, () => initialState);
  },
});

export const { clearAuthError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
