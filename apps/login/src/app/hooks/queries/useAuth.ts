import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AuthManager } from '@npm_leadtech/cv-lib-auth';
import StoragePackage from '@npm_leadtech/cv-storage-js';
import {
  postAuthToken,
  signInWithCognito,
  signUpWithCognito,
  rescuePassword,
  resetPassword,
  createAuthManager,
  type PostAuthTokenParams,
  type PostAuthTokenResponse,
} from '../../services/api/authApi';
import { formatErrorForDisplay } from '@packages/query';

/**
 * Hook to get or create AuthManager instance
 * 
 * @returns AuthManager instance or undefined
 */
export function useAuthManager(): AuthManager | undefined {
  return useMemo(() => {
    try {
      const sessionStore = StoragePackage.sessionStoreCookie({
        apiTimeout: 10,
        apiEndpoint: '',
      });
      return createAuthManager(sessionStore);
    } catch (error) {
      console.error('Error creating AuthManager:', error);
      return undefined;
    }
  }, []);
}

/**
 * Hook for login with email and password
 * 
 * @example
 * ```tsx
 * const loginMutation = useLogin();
 * 
 * const handleLogin = () => {
 *   loginMutation.mutate({ email: 'user@example.com', password: 'password' });
 * };
 * ```
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const authManager = useAuthManager();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (!authManager) {
        throw new Error('AuthManager not available');
      }
      const token = await signInWithCognito(authManager, email, password);
      return { token, email };
    },
    onSuccess: () => {
      // Invalidate any auth-related queries
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
}

/**
 * Hook for user signup with email and password
 * 
 * @example
 * ```tsx
 * const signUpMutation = useSignUp();
 * 
 * const handleSignUp = () => {
 *   signUpMutation.mutate({ email: 'user@example.com', password: 'password' });
 * };
 * ```
 */
export function useSignUp() {
  const queryClient = useQueryClient();
  const authManager = useAuthManager();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (!authManager) {
        throw new Error('AuthManager not available');
      }
      await signUpWithCognito(authManager, email, password);
      return { email };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error) => {
      console.error('SignUp error:', error);
    },
  });
}

/**
 * Hook for Google authentication
 * 
 * @example
 * ```tsx
 * const googleAuthMutation = useGoogleAuth();
 * 
 * const handleGoogleAuth = (token: string) => {
 *   googleAuthMutation.mutate({ providerToken: token });
 * };
 * ```
 */
export function useGoogleAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ providerToken, operation }: { providerToken: string; operation?: string }) => {
      const params: PostAuthTokenParams = {
        provider: 'google',
        providerToken,
        ...(operation && { operation }),
      };
      return postAuthToken(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error) => {
      console.error('Google auth error:', error);
    },
  });
}

/**
 * Hook for LinkedIn authentication
 * 
 * @example
 * ```tsx
 * const linkedInAuthMutation = useLinkedInAuth();
 * 
 * const handleLinkedInAuth = (token: string) => {
 *   linkedInAuthMutation.mutate({ providerToken: token });
 * };
 * ```
 */
export function useLinkedInAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ providerToken, operation }: { providerToken: string; operation?: string }) => {
      const params: PostAuthTokenParams = {
        provider: 'linkedin',
        providerToken,
        ...(operation && { operation }),
      };
      return postAuthToken(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error) => {
      console.error('LinkedIn auth error:', error);
    },
  });
}

/**
 * Hook for password rescue (forgot password)
 * 
 * @example
 * ```tsx
 * const passwordRescueMutation = usePasswordRescue();
 * 
 * const handlePasswordRescue = () => {
 *   passwordRescueMutation.mutate({ email: 'user@example.com' });
 * };
 * ```
 */
export function usePasswordRescue() {
  const authManager = useAuthManager();

  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      if (!authManager) {
        throw new Error('AuthManager not available');
      }
      await rescuePassword(authManager, email);
      return { email };
    },
    onError: (error) => {
      console.error('Password rescue error:', error);
    },
  });
}

/**
 * Hook for password reset with verification code
 * 
 * @example
 * ```tsx
 * const passwordResetMutation = usePasswordReset();
 * 
 * const handlePasswordReset = () => {
 *   passwordResetMutation.mutate({
 *     verificationCode: '123456',
 *     newPassword: 'newpassword'
 *   });
 * };
 * ```
 */
export function usePasswordReset() {
  const authManager = useAuthManager();

  return useMutation({
    mutationFn: async ({
      verificationCode,
      newPassword,
    }: {
      verificationCode: string;
      newPassword: string;
    }) => {
      if (!authManager) {
        throw new Error('AuthManager not available');
      }
      await resetPassword(authManager, verificationCode, newPassword);
      return { success: true };
    },
    onError: (error) => {
      console.error('Password reset error:', error);
    },
  });
}

