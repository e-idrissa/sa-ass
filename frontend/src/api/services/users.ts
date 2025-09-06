import api from '../config/api-config';
import { ApiResponse, User, CreateUserData, UpdateUserData, UpdatePasswordData } from '../types';

export const usersService = {
  // Get all users
  getAll: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.usersApi.get('/users');
    return response.data;
  },

  // Get user by ID
  getById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.usersApi.get(`/users/id/${id}`);
    return response.data;
  },

  // Get user by email
  getByEmail: async (email: string): Promise<ApiResponse<User>> => {
    const response = await api.usersApi.get(`/users/email/${email}`);
    return response.data;
  },

  // Get user by role
  getByRole: async (role: string): Promise<ApiResponse<User>> => {
    const response = await api.usersApi.get(`/users/role/${role}`);
    return response.data;
  },

  // Create new user
  create: async (userData: CreateUserData): Promise<ApiResponse<User>> => {
    const response = await api.usersApi.post('/users', userData);
    return response.data;
  },

  // Update user
  update: async (id: string, userData: UpdateUserData): Promise<ApiResponse<User>> => {
    const response = await api.usersApi.patch(`/users/id/${id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.usersApi.delete(`/users/id/${id}`);
    return response.data;
  },

  // Update password (if you add this endpoint to backend)
  updatePassword: async (id: string, passwordData: UpdatePasswordData): Promise<ApiResponse<User>> => {
    const response = await api.usersApi.patch(`/users/id/${id}/password`, passwordData);
    return response.data;
  },
};
