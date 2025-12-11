import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth.types';

/**
 * Authentication store using Zustand with persistence
 * 
 * This store manages authentication state across all microfrontends.
 * Data is persisted to localStorage so it's available across app boundaries.
 * 
 * @example
 * ```tsx
 * import { useAuthStore } from '@packages/auth';
 * 
 * const { user, isAuthenticated, setAuth } = useAuthStore();
 * 
 * // After login
 * setAuth({
 *   user: { id: '1', email: 'user@example.com' },
 *   token: 'abc123',
 *   provider: 'cognito'
 * });
 * ```
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      provider: null,
      userId: null,

      // Set authentication data
      setAuth: (data) => {
        set({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          provider: data.provider,
          userId: data.userId || data.user.id,
          isLoading: false,
        });
      },

      // Clear authentication (logout)
      clearAuth: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          provider: null,
          userId: null,
          isLoading: false,
        });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Update user data
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'cv-auth-storage', // localStorage key
      storage: createJSONStorage(() => localStorage, {
        // Custom serialization/deserialization if needed
        reviver: (key, value) => {
          // No custom reviver needed, but we can add logging
          return value;
        },
        replacer: (key, value) => {
          // No custom replacer needed
          return value;
        },
      }),
      // Only persist essential auth data
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        provider: state.provider,
        userId: state.userId,
      }),
      // Usar merge para combinar el estado inicial con los datos hidratados
      // Esto asegura que los datos de localStorage se apliquen correctamente
      merge: (persistedState, currentState) => {
        console.log('[AuthStore] Merge called');
        console.log('[AuthStore] Persisted state:', persistedState);
        console.log('[AuthStore] Current state keys:', Object.keys(currentState || {}));
        
        // Si hay datos persistidos, usarlos y mantener las funciones del estado actual
        if (persistedState && typeof persistedState === 'object') {
          const merged = {
            ...currentState,
            ...persistedState,
            // Asegurar que las funciones se mantengan
            setAuth: currentState.setAuth,
            clearAuth: currentState.clearAuth,
            setLoading: currentState.setLoading,
            updateUser: currentState.updateUser,
          };
          console.log('[AuthStore] Merged state:', {
            isAuthenticated: merged.isAuthenticated,
            hasUser: !!merged.user,
            userEmail: merged.user?.email,
          });
          return merged;
        }
        
        console.log('[AuthStore] No persisted state, using current state');
        return currentState;
      },
      // Callback después de la hidratación
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('[AuthStore] Hydration error:', error);
        } else {
          console.log('[AuthStore] Hydration completed');
          console.log('[AuthStore] State after hydration:', {
            isAuthenticated: state?.isAuthenticated,
            hasUser: !!state?.user,
            userEmail: state?.user?.email,
          });
        }
      },
    }
  )
);

