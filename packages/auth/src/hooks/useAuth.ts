import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import type { User, UseAuthReturn } from '../types/auth.types';

/**
 * Main hook to access authentication state and actions
 * 
 * @example
 * ```tsx
 * import { useAuth } from '@packages/auth';
 * 
 * function MyComponent() {
 *   const { user, isAuthenticated, setAuth, clearAuth } = useAuth();
 * 
 *   if (!isAuthenticated) {
 *     return <LoginForm />;
 *   }
 * 
 *   return <div>Welcome, {user?.email}</div>;
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  // Usar selectores específicos para suscribirse solo a los campos necesarios
  // Esto asegura que el componente se re-renderice cuando cambien estos valores
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const provider = useAuthStore((state) => state.provider);
  const userId = useAuthStore((state) => state.userId);
  
  // Obtener las acciones del store
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const updateUser = useAuthStore((state) => state.updateUser);
  
  // Verificar si el store está hidratado
  const hasHydrated = (useAuthStore.persist as any)?.hasHydrated?.() ?? true;
  
  // Fallback: Si el store no está hidratado o no tiene datos, leer directamente de localStorage
  const [fallbackAuth, setFallbackAuth] = useState<{ isAuthenticated: boolean; user: any; token: string | null } | null>(null);
  
  useEffect(() => {
    const currentState = useAuthStore.getState();
    
    // Si el store no está hidratado o no tiene datos pero localStorage sí, usar fallback
    const stored = localStorage.getItem('cv-auth-storage');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        
        // Si localStorage tiene datos pero el store no, usar fallback
        if (parsed.isAuthenticated && !currentState.isAuthenticated) {
          console.log('[useAuth] Using fallback from localStorage');
          setFallbackAuth({
            isAuthenticated: parsed.isAuthenticated,
            user: parsed.user,
            token: parsed.token,
          });
          
          // Intentar actualizar el store con los datos de localStorage
          if (parsed.user && parsed.token && parsed.provider) {
            currentState.setAuth({
              user: parsed.user,
              token: parsed.token,
              provider: parsed.provider,
              userId: parsed.userId,
            });
          }
        } else {
          setFallbackAuth(null);
        }
      } catch (e) {
        console.error('[useAuth] Error reading localStorage:', e);
      }
    }
  }, [hasHydrated]);

  // Usar fallback si está disponible y el store no tiene datos
  const finalIsAuthenticated = fallbackAuth?.isAuthenticated ?? isAuthenticated;
  const finalUser = fallbackAuth?.user ?? user;
  const finalToken = fallbackAuth?.token ?? token;

  return {
    // State (usar fallback si es necesario)
    isAuthenticated: finalIsAuthenticated,
    isLoading,
    user: finalUser,
    token: finalToken,
    provider,
    userId,
    hasHydrated,

    // Actions
    setAuth,
    clearAuth,
    setLoading,
    updateUser,
  };
}

/**
 * Hook to check if user is authenticated
 * 
 * @example
 * ```tsx
 * import { useIsAuthenticated } from '@packages/auth';
 * 
 * function ProtectedRoute({ children }) {
 *   const isAuthenticated = useIsAuthenticated();
 *   
 *   if (!isAuthenticated) {
 *     return <Navigate to="/login" />;
 *   }
 *   
 *   return children;
 * }
 * ```
 */
export function useIsAuthenticated(): boolean {
  return useAuthStore((state) => state.isAuthenticated);
}

/**
 * Hook to get current user
 * 
 * @example
 * ```tsx
 * import { useUser } from '@packages/auth';
 * 
 * function UserProfile() {
 *   const user = useUser();
 *   
 *   if (!user) return null;
 *   
 *   return <div>{user.email}</div>;
 * }
 * ```
 */
export function useUser(): User | null {
  return useAuthStore((state) => state.user);
}

/**
 * Hook to get auth token
 * 
 * @example
 * ```tsx
 * import { useAuthToken } from '@packages/auth';
 * 
 * function ApiCall() {
 *   const token = useAuthToken();
 *   
 *   // Use token in API calls
 * }
 * ```
 */
export function useAuthToken(): string | null {
  return useAuthStore((state) => state.token);
}

