import api from '../config/api-config';
import { ApiResponse, LoginCredentials, LoginResponse } from '../types';

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.authApi.post('/login', {
      email: credentials.email,
      passwordHash: credentials.password, // Backend expects passwordHash
    });
    return response.data;
  },

  // Logout user (if you need to call a backend logout endpoint)
  logout: async (): Promise<void> => {
    // If you have a logout endpoint, call it here
    // await api.authApi.post('/logout');
    
    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },

  // Verify token or refresh (if you have these endpoints)
  verifyToken: async (): Promise<ApiResponse<any>> => {
    const response = await api.authApi.get('/verify');
    return response.data;
  },

  // Get current user info (if you have this endpoint)
  getCurrentUser: async (): Promise<ApiResponse<any>> => {
    const response = await api.authApi.get('/me');
    return response.data;
  },
};
