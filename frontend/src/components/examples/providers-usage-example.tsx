"use client";

import React from 'react';
import { useAuth } from '@/providers';
import { useTheme } from 'next-themes';
import { useUsers } from '@/lib/hooks/users';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut, Users, Loader2 } from 'lucide-react';

/**
 * Example component demonstrating how to use all providers together
 * This shows how AuthProvider, ThemeProvider, and QueryProvider work together
 */
export function ProvidersUsageExample() {
  // Using AuthProvider
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  
  // Using ThemeProvider (from next-themes)
  const { theme, setTheme } = useTheme();
  
  // Using QueryProvider (TanStack Query hooks)
  const { data: usersResponse, isLoading: usersLoading } = useUsers();

  // Show loading state while auth is initializing
  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="size-6 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="text-gray-600 mb-6">
          You need to be authenticated to view this content.
        </p>
        <Button onClick={() => window.location.href = '/login'}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-card rounded-lg border p-6 mb-6">
        <h1 className="text-3xl font-bold mb-6">Providers Integration Example</h1>
        
        {/* Auth Provider Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="size-5" />
            Authentication State
          </h2>
          <div className="bg-muted rounded-md p-4">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>User ID:</strong> {user?.sub}</p>
            <div className="mt-4">
              <Button 
                onClick={logout} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Theme Provider Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {theme === 'dark' ? <Moon className="size-5" /> : <Sun className="size-5" />}
            Theme Management
          </h2>
          <div className="bg-muted rounded-md p-4">
            <p className="mb-4"><strong>Current Theme:</strong> {theme || 'system'}</p>
            <div className="flex gap-2">
              <Button
                onClick={() => setTheme('light')}
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
              >
                Light
              </Button>
              <Button
                onClick={() => setTheme('dark')}
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
              >
                Dark
              </Button>
              <Button
                onClick={() => setTheme('system')}
                variant={theme === 'system' ? 'default' : 'outline'}
                size="sm"
              >
                System
              </Button>
            </div>
          </div>
        </div>

        {/* Query Provider Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="size-5" />
            Data Fetching with TanStack Query
          </h2>
          <div className="bg-muted rounded-md p-4">
            {usersLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span>Loading users...</span>
              </div>
            ) : (
              <div>
                <p className="mb-2">
                  <strong>Users Count:</strong> {usersResponse?.result?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  This data is automatically cached and synchronized by TanStack Query
                </p>
                {usersResponse?.result && usersResponse.result.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Recent Users:</p>
                    <div className="space-y-1">
                      {usersResponse.result.slice(0, 3).map((user: any) => (
                        <div key={user._id} className="text-sm bg-background rounded px-2 py-1">
                          {user.firstName} {user.lastName} ({user.role})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Integration Benefits */}
        <div className="bg-blue-50 dark:bg-blue-950 rounded-md p-4">
          <h3 className="font-semibold mb-2">🚀 Provider Integration Benefits</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Single import for all providers: <code>import &#123; useAuth &#125; from '@/providers'</code></li>
            <li>Consistent state management across the application</li>
            <li>Automatic theme persistence and system theme detection</li>
            <li>Optimized data fetching with caching and background updates</li>
            <li>Type-safe authentication state throughout the app</li>
            <li>Easy to test and maintain provider logic</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
