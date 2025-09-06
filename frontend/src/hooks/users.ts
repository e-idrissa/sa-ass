import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../api/services/users';
import { CreateUserData, UpdateUserData, UpdatePasswordData } from '../api/types';
import { getErrorMessage } from '../api/types/errors';

// Query keys for cache management
export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (filters: string) => [...usersKeys.lists(), { filters }] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
  byEmail: (email: string) => [...usersKeys.all, 'byEmail', email] as const,
  byRole: (role: string) => [...usersKeys.all, 'byRole', role] as const,
};

// Get all users hook
export const useUsers = () => {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: usersService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get user by ID hook
export const useUser = (id: string) => {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get user by email hook
export const useUserByEmail = (email: string) => {
  return useQuery({
    queryKey: usersKeys.byEmail(email),
    queryFn: () => usersService.getByEmail(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get user by role hook
export const useUserByRole = (role: string) => {
  return useQuery({
    queryKey: usersKeys.byRole(role),
    queryFn: () => usersService.getByRole(role),
    enabled: !!role,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Create user mutation hook
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: CreateUserData) => usersService.create(userData),
    onSuccess: (data) => {
      if (data.code === 201) {
        // Invalidate and refetch users list
        queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
        
        // Optionally add the new user to the cache
        if (data.result && data.result._id) {
          queryClient.setQueryData(
            usersKeys.detail(data.result._id),
            data
          );
        }
      }
    },
    onError: (error) => {
      console.error('Create user failed:', getErrorMessage(error));
    },
  });
};

// Update user mutation hook
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: UpdateUserData }) =>
      usersService.update(id, userData),
    onSuccess: (data, variables) => {
      if (data.code === 200) {
        // Invalidate and refetch users list
        queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
        
        // Update the specific user in cache
        queryClient.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });
        
        // Optionally update the cache directly
        if (data.result) {
          queryClient.setQueryData(
            usersKeys.detail(variables.id),
            data
          );
        }
      }
    },
    onError: (error) => {
      console.error('Update user failed:', getErrorMessage(error));
    },
  });
};

// Delete user mutation hook
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => usersService.delete(id),
    onSuccess: (data, variables) => {
      if (data.code === 200) {
        // Remove user from cache
        queryClient.removeQueries({ queryKey: usersKeys.detail(variables) });
        
        // Invalidate users list
        queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      }
    },
    onError: (error) => {
      console.error('Delete user failed:', getErrorMessage(error));
    },
  });
};

// Update password mutation hook
export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, passwordData }: { id: string; passwordData: UpdatePasswordData }) =>
      usersService.updatePassword(id, passwordData),
    onSuccess: (data, variables) => {
      if (data.code === 200) {
        // Invalidate the specific user in cache
        queryClient.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });
      }
    },
    onError: (error) => {
      console.error('Update password failed:', getErrorMessage(error));
    },
  });
};
