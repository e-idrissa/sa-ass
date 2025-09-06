import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/services/auth';
import { LoginCredentials } from '../api/types';
import { getErrorMessage } from '../api/types/errors';

const cookieName = process.env.COOKIE_NAME || 'token';
const maxAge = process.env.EXPIRES_IN || 60 * 60 * 24;
// Query keys for cache management
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
  verifyToken: () => [...authKeys.all, 'verifyToken'] as const,
};

// Login mutation hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.code === 200 && data.result) {
        // Store token and user data
        if (typeof window !== 'undefined') {
          // localStorage.setItem('auth_token', data.result.accessToken);
          document.cookie = `${cookieName}=${data.result.accessToken}; path=/; max-age=${maxAge}`;
          document.cookie = `type=${data.result.type}`;
          localStorage.setItem('user_data', JSON.stringify({
            sub: data.result.sub,
            email: data.result.email,
            role: data.result.role,
            type: data.result.type,
          }));
        }
        
        // Invalidate and refetch user-related queries
        queryClient.invalidateQueries({ queryKey: authKeys.all });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
    onError: (error) => {
      console.error('Login failed:', getErrorMessage(error));
      // Clear any stale auth data
      if (typeof window !== 'undefined') {
        document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `type=undefined`;
        localStorage.removeItem('user_data');
      }
    },
  });
};

// Logout mutation hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    },
    onError: (error) => {
      console.error('Logout failed:', getErrorMessage(error));
      
      // Even if logout fails, clear local data
      if (typeof window !== 'undefined') {
        document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `type=undefined`;
        localStorage.removeItem('user_data');
        window.location.href = '/login';
      }
    },
  });
};

// Get current user hook
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authService.getCurrentUser,
    enabled: typeof window !== 'undefined' && !!document.cookie.includes(cookieName),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if unauthorized
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Verify token hook
export const useVerifyToken = () => {
  return useQuery({
    queryKey: authKeys.verifyToken(),
    queryFn: authService.verifyToken,
    enabled: typeof window !== 'undefined' && !!document.cookie.includes(cookieName),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // Don't retry token verification
  });
};

// Hook to get auth state from localStorage
export const useAuthState = () => {
  const getAuthData = () => {
    if (typeof window === 'undefined') return null;
    
    const userDataString = localStorage.getItem('user_data');
    
    if (!userDataString) return null;
    
    try {
      const userData = JSON.parse(userDataString);
      return {
        user: userData,
        isAuthenticated: true,
      };
    } catch {
      return null;
    }
  };

  return getAuthData();
};
