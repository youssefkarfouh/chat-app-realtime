import AuthService from '@/modules/auth/services/auth.service';
import { create } from 'zustand'

export interface AuthState {
  user: any;
  setUser: (user: any) => void;
  accessToken: any;
  setAccessToken: (accessToken: any) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  initializeAuth: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user: any) => set({ user }),

  accessToken: null,
  setAccessToken: (accessToken: any) => set({ accessToken }),

  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  initializeAuth: async () => {
    try {
      const token = await AuthService.refreshToken();
      if (token) {
        const user = await AuthService.getUserInfo();
        set({ user });
      }
    } catch (error) {
      get().clearAuth();
    }
  },
  clearAuth: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

}))
