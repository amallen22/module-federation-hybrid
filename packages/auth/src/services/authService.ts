import { useAuthStore } from '../stores/authStore';
import type { User, AuthProvider, AuthState } from '../types/auth.types';
import { createMockUser } from '../types/auth.types';

/**
 * Authentication service functions
 * These functions provide a clean API for authentication operations
 */

/**
 * Login with email and password (Cognito)
 * 
 * @param email - User email
 * @param password - User password
 * @returns Promise with user data
 */
export async function loginWithEmail(
  email: string,
  _password: string
): Promise<{ user: User; token: string }> {
  // TODO: Replace with actual API call when backend is ready
  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = createMockUser(email);
      const token = `mock-token-${Date.now()}`;
      resolve({ user, token });
    }, 500);
  });
}

/**
 * Login with provider (Google, LinkedIn)
 * 
 * @param provider - Auth provider
 * @param providerToken - Token from provider
 * @returns Promise with user data
 */
export async function loginWithProvider(
  provider: AuthProvider,
  _providerToken: string
): Promise<{ user: User; token: string; isNewUser?: boolean }> {
  // TODO: Replace with actual API call when backend is ready
  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Extract email from provider token (mock)
      const mockEmail = provider === 'google' 
        ? 'user@gmail.com' 
        : 'user@linkedin.com';
      
      const user = createMockUser(mockEmail);
      const token = `mock-${provider}-token-${Date.now()}`;
      resolve({ user, token, isNewUser: false });
    }, 500);
  });
}

/**
 * Sign up with email and password
 * 
 * @param email - User email
 * @param password - User password
 * @returns Promise with user data
 */
export async function signUpWithEmail(
  email: string,
  _password: string
): Promise<{ user: User; token: string }> {
  // TODO: Replace with actual API call when backend is ready
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = createMockUser(email);
      const token = `mock-token-${Date.now()}`;
      resolve({ user, token });
    }, 500);
  });
}

/**
 * Logout current user
 */
export function logout(): void {
  useAuthStore.getState().clearAuth();
}

/**
 * Initialize auth state from existing session (e.g., from cookies)
 * This is useful for migration from legacy cookie-based auth
 * 
 * @param sessionData - Session data from legacy system
 */
export function initializeFromLegacySession(sessionData: {
  access?: string;
  user?: string;
  userid?: string;
  provider?: string;
}): void {
  if (sessionData.access && sessionData.user) {
    const user = createMockUser(sessionData.user);
    useAuthStore.getState().setAuth({
      user,
      token: sessionData.access,
      provider: (sessionData.provider as AuthProvider) || 'cognito',
      userId: sessionData.userid || undefined,
    });
  }
}

/**
 * Get current auth state (for non-React contexts)
 */
export function getAuthState(): Pick<AuthState, 'isAuthenticated' | 'user' | 'token' | 'provider'> {
  const state = useAuthStore.getState();
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token,
    provider: state.provider,
  };
}

