"use client";

import React from 'react';
import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth-provider';
import { ThemeProvider } from './theme';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Combined provider that wraps all application providers
 * This makes it easy to manage and maintain all providers in one place
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

// Export individual providers for direct use if needed
export { QueryProvider } from './query-provider';
export { AuthProvider, useAuth } from './auth-provider';
export { ThemeProvider } from './theme';

// Default export for convenience
export default AppProviders;
