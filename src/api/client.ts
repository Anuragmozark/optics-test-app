import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// ─── Base Config ─────────────────────────────────────────────────────────────
// Replace BASE_URL with your real API endpoint before going to production.
const BASE_URL = 'https://api.yourdomain.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Attach Bearer token from storage on every request.
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // TODO: Replace with your token storage (e.g. MMKV, AsyncStorage, Keychain)
    // const token = await SecureStorage.getItem('accessToken');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: Dispatch logout action or clear tokens
      // store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default apiClient;
