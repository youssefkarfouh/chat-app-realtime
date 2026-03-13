import AuthService from '@/modules/auth/services/auth.service';
import { create } from 'zustand'

export interface AuthState {
  user: any;
  setUser: (user: any) => void;
  accessToken: any;
  setAccessToken: (accessToken: any) => void;
  initializeAuth: () => Promise<void>;
  clearAuth: () => void;
  isInitializing: boolean;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user: any) => set({ user }),

  accessToken: null,
  setAccessToken: (accessToken: any) => set({ accessToken }),
  isInitializing: true,

  initializeAuth: async () => {
    set({ isInitializing: true });
    try {
      const response = await AuthService.refreshToken();
      if (response && response.accessToken) {
        set({ accessToken: response.accessToken });
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
    set({ user: null, accessToken: null });
  },

}))
