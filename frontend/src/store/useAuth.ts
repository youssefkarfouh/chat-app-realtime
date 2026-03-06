import { create } from 'zustand'

export interface AuthState {
  user: any;
  setUser: (user: any) => void;
  accessToken: any;
  setAccessToken: (accessToken: any) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),

  accessToken: null,
  setAccessToken: (accessToken: any) => set({ accessToken }),

  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}))
