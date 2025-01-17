import { create } from 'zustand';
import { handleTokens } from '../../services/handleToken';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  loading: true,

  checkAuth: async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      try {
        await handleTokens(); // Validate or refresh tokens
        set({ isAuthenticated: true, loading: false });
      } catch (err) {
        console.error('Token check failed:', err);
        localStorage.removeItem('refresh_token'); // Clear invalid tokens
        set({ isAuthenticated: false, loading: false });
      }
    } else {
      set({ isAuthenticated: false, loading: false });
    }
  },
}));
