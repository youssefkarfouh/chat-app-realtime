import { create } from 'zustand'
import axiosInstance from '../global/apiClient';



export interface AuthState {
  user: any;
  setUser: (user: any) => void;
  accessToken: any;
  setAccessToken: (accessToken: any) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  register: (userData: any) => Promise<void>;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}
export const useAuth = create<AuthState>((set) => ({


  user: null,
  setUser: (user: any) => set({ user }),

  accessToken: null,
  setAccessToken: (accessToken: any) => set({ accessToken }),

  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),


  register: async (userData: any) => {
    try {
      const response = await axiosInstance.post('/register', userData);
      console.log(response.data);
    } catch (error) {
      console.error('Error in register:', error);
    }
  },

  login: async (userData: any) => {
    try {
      const response = await axiosInstance.post('/login', userData);
      set({ user: response.data.user, accessToken: response.data.accessToken, isAuthenticated: true });
    } catch (error) {
      console.error('Error in login:', error);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/logout');
      set({ user: null, accessToken: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error in logout:', error);
    }
  },

}))

