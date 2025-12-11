/**
 * @packages/auth - Shared authentication state management
 * 
 * This package provides a centralized authentication store using Zustand
 * that can be shared across all microfrontends in the CV-Hibrid monorepo.
 * 
 * @example
 * ```tsx
 * import { useAuth, loginWithEmail } from '@packages/auth';
 * 
 * function LoginForm() {
 *   const { setAuth, setLoading } = useAuth();
 *   
 *   const handleLogin = async (email: string, password: string) => {
 *     setLoading(true);
 *     try {
 *       const { user, token } = await loginWithEmail(email, password);
 *       setAuth({ user, token, provider: 'cognito' });
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 * }
 * ```
 */

// Store
export { useAuthStore } from './stores/authStore';

// Hooks
export {
  useAuth,
  useIsAuthenticated,
  useUser,
  useAuthToken,
} from './hooks/useAuth';

// Services
export {
  loginWithEmail,
  loginWithProvider,
  signUpWithEmail,
  logout,
  initializeFromLegacySession,
  getAuthState,
} from './services/authService';

// Types
export type {
  AuthProvider,
  User,
  AuthState,
} from './types/auth.types';

export { createMockUser } from './types/auth.types';

