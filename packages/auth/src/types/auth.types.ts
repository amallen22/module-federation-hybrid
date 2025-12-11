/**
 * Authentication types and interfaces
 */

export type AuthProvider = 'cognito' | 'google' | 'linkedin';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface AuthState {
  // Authentication status
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // User data
  user: User | null;
  
  // Auth token and provider
  token: string | null;
  provider: AuthProvider | null;
  
  // Session metadata
  userId: string | null; // SHA1 hash of user email
  
  // Actions
  setAuth: (data: {
    user: User;
    token: string;
    provider: AuthProvider;
    userId?: string;
  }) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

// Tipo extendido para incluir hasHydrated en el hook
export interface UseAuthReturn extends AuthState {
  hasHydrated?: boolean;
}

/**
 * Mock user data for development/testing
 */
export const createMockUser = (email: string, overrides?: Partial<User>): User => {
  const [emailPrefix] = email.split('@');
  return {
    id: `mock-${Date.now()}`,
    email,
    firstName: emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1),
    lastName: 'User',
    avatar: undefined,
    ...overrides,
  };
};

