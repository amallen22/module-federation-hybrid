import { useCallback } from 'react';
import sha1 from 'sha1';
import StoragePackage from '@npm_leadtech/cv-storage-js';
import {
  useLogin,
  useSignUp,
  useGoogleAuth,
  useLinkedInAuth,
  usePasswordRescue,
  usePasswordReset,
} from './useAuth';
import { formatErrorForDisplay } from '@packages/query';
import { useAuth, createMockUser } from '@packages/auth';
import type { AuthProvider } from '@packages/auth';

/**
 * Hook that provides authentication action functions compatible with Controller callbacks
 * This hook wraps TanStack Query mutations to match the existing Controller API
 */
export function useAuthActions() {
  const loginMutation = useLogin();
  const signUpMutation = useSignUp();
  const googleAuthMutation = useGoogleAuth();
  const linkedInAuthMutation = useLinkedInAuth();
  const passwordRescueMutation = usePasswordRescue();
  const passwordResetMutation = usePasswordReset();
  
  // Shared auth store
  const { setAuth } = useAuth();

  /**
   * Sign in with email and password
   * Compatible with Controller.onSignInSuccess callback signature
   */
  const signInWithProvider = useCallback(
    async ({
      provider,
      providerToken,
      callback,
      operation,
    }: {
      provider: string;
      providerToken: string;
      callback?: () => void;
      operation?: string;
    }) => {
      try {
        let mutation;
        if (provider === 'google') {
          mutation = googleAuthMutation;
        } else if (provider === 'linkedin') {
          mutation = linkedInAuthMutation;
        } else {
          throw new Error(`Unsupported provider: ${provider}`);
        }

        const result = await mutation.mutateAsync({
          providerToken,
          ...(operation && { operation }),
        });

        // Store session data (matching Controller behavior)
        const cvSessionStore = StoragePackage.sessionStoreCookie({
          apiTimeout: 10,
          apiEndpoint: '',
        });

        let sha1User = '';
        if (result.user) {
          sha1User = sha1(result.user);
        }

        cvSessionStore.put('provider', provider);
        cvSessionStore.put('access', result.authToken);
        cvSessionStore.put('userid', sha1User);
        cvSessionStore.put('user', result.user || '');

        // Also save to shared auth store for cross-app state
        const user = createMockUser(result.user || '', {
          id: sha1User,
        });
        setAuth({
          user,
          token: result.authToken,
          provider: provider as AuthProvider,
          userId: sha1User,
        });

        // Call callback if provided and user is new
        if (callback && result.isNewUser) {
          callback();
        }

        return result;
      } catch (error) {
        const errorMessage = formatErrorForDisplay(error);
        throw new Error(errorMessage.replace(/^[ A-Za-z0-9]*(: )/, ''));
      }
    },
    [googleAuthMutation, linkedInAuthMutation]
  );

  /**
   * Sign in with Cognito (email/password)
   */
  const signInWithCognito = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await loginMutation.mutateAsync({ email, password });

        // Store session data
        const cvSessionStore = StoragePackage.sessionStoreCookie({
          apiTimeout: 10,
          apiEndpoint: '',
        });

        const sha1User = sha1(email);
        cvSessionStore.put('provider', 'cognito');
        cvSessionStore.put('access', result.token);
        cvSessionStore.put('userid', sha1User);
        cvSessionStore.put('user', email);

        // Also save to shared auth store for cross-app state
        const user = createMockUser(email, {
          id: sha1User,
        });
        setAuth({
          user,
          token: result.token,
          provider: 'cognito',
          userId: sha1User,
        });

        return result;
      } catch (error) {
        const errorMessage = formatErrorForDisplay(error);
        throw new Error(errorMessage);
      }
    },
    [loginMutation]
  );

  /**
   * Password rescue
   */
  const handlePasswordRescue = useCallback(
    async (email: string) => {
      try {
        await passwordRescueMutation.mutateAsync({ email });
      } catch (error) {
        const errorMessage = formatErrorForDisplay(error);
        throw new Error(errorMessage);
      }
    },
    [passwordRescueMutation]
  );

  /**
   * Password reset
   */
  const handlePasswordReset = useCallback(
    async (verificationCode: string, newPassword: string) => {
      try {
        await passwordResetMutation.mutateAsync({
          verificationCode,
          newPassword,
        });
      } catch (error) {
        const errorMessage = formatErrorForDisplay(error);
        throw new Error(errorMessage);
      }
    },
    [passwordResetMutation]
  );

  return {
    signInWithProvider,
    signInWithCognito,
    handlePasswordRescue,
    handlePasswordReset,
    // Expose mutation states for loading/error handling
    isLoading:
      loginMutation.isPending ||
      signUpMutation.isPending ||
      googleAuthMutation.isPending ||
      linkedInAuthMutation.isPending ||
      passwordRescueMutation.isPending ||
      passwordResetMutation.isPending,
  };
}

