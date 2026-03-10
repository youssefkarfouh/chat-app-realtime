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
  isInitializing: boolean;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user: any) => set({ user }),

  accessToken: null,
  setAccessToken: (accessToken: any) => set({ accessToken }),

  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  isInitializing: true,

  initializeAuth: async () => {
    set({ isInitializing: true });
    try {
      const response = await AuthService.refreshToken();
      if (response && response.accessToken) {
        set({ accessToken: response.accessToken, isAuthenticated: true });
        const userInfoResponse = await AuthService.getUserInfo();
        if (userInfoResponse && userInfoResponse.user) {
          set({ user: userInfoResponse.user });
        }
      }
    } catch (error) {
      get().clearAuth();
    } finally {
      set({ isInitializing: false });
    }
  },
  clearAuth: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

}))
