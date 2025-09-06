# Providers Documentation

This directory contains all the React context providers used throughout the application.

## 🏗️ Architecture

### AppProviders (`index.tsx`)
The main provider that combines all other providers. This is the single entry point used in the root layout.

```tsx
import { AppProviders } from '@/providers';

// In your layout or app component
<AppProviders>
  {children}
</AppProviders>
```

### Individual Providers

#### 1. QueryProvider (`query-provider.tsx`)
- Wraps the app with TanStack Query (React Query)
- Provides data fetching, caching, and synchronization
- Includes React Query DevTools in development

**Usage:**
```tsx
import { useQuery, useMutation } from '@tanstack/react-query';
```

#### 2. AuthProvider (`auth-provider.tsx`)
- Manages user authentication state
- Handles JWT token storage and retrieval
- Provides authentication context throughout the app

**Usage:**
```tsx
import { useAuth } from '@/providers';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.email}!</div>;
}
```

#### 3. ThemeProvider (`theme.tsx`)
- Manages dark/light theme switching
- Uses next-themes for theme persistence
- Integrates with Tailwind CSS

**Usage:**
```tsx
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}
```

## 🚀 Adding New Providers

To add a new provider:

1. Create your provider file in this directory
2. Export it from the individual provider file
3. Add it to the `AppProviders` component in `index.tsx`
4. Export it from `index.tsx` for easy imports

Example:
```tsx
// 1. Create providers/my-new-provider.tsx
export function MyNewProvider({ children }) {
  return (
    <MyNewContext.Provider value={contextValue}>
      {children}
    </MyNewContext.Provider>
  );
}

// 2. Add to providers/index.tsx
import { MyNewProvider } from './my-new-provider';

export function AppProviders({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <MyNewProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </MyNewProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

// 3. Export from index.tsx
export { MyNewProvider, useMyNew } from './my-new-provider';
```

## 📝 Provider Order

The providers are nested in this order (outer to inner):
1. QueryProvider - Provides React Query functionality
2. AuthProvider - Provides authentication state
3. ThemeProvider - Provides theme management

This order ensures that:
- Authentication state is available to all components
- Theme context is available to all UI components
- Query hooks can access authentication state when needed

## 🛠️ Troubleshooting

### Common Issues

1. **"useAuth must be used within an AuthProvider"**
   - Make sure AppProviders wraps your component tree
   - Check that the component using useAuth is inside the provider

2. **Theme not persisting**
   - Ensure ThemeProvider has the correct storage configuration
   - Check that the theme attribute is set correctly on the html element

3. **Query hooks not working**
   - Verify QueryProvider is wrapping your component
   - Make sure you're using the correct import for useQuery/useMutation

### Best Practices

- Always use the combined `AppProviders` in your layout
- Import individual providers only when you need direct access to them
- Keep provider logic minimal and focused on state management
- Use custom hooks (like `useAuth`) to encapsulate provider logic
- Test provider components in isolation when possible
