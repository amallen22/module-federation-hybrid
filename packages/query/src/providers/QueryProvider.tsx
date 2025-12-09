import { FC, ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createQueryClient, QueryClientConfig } from '../lib/queryClient';

export interface QueryProviderProps {
  /**
   * Children components to wrap with QueryClientProvider
   */
  children: ReactNode;
  
  /**
   * Optional QueryClient instance. If not provided, a new one will be created.
   */
  client?: QueryClient;
  
  /**
   * Optional configuration for creating a new QueryClient.
   * Ignored if `client` prop is provided.
   */
  queryClientConfig?: QueryClientConfig;
  
  /**
   * Whether to show ReactQueryDevtools in development.
   * @default true
   */
  showDevtools?: boolean;
}

/**
 * QueryProvider component that wraps the app with QueryClientProvider
 * and optionally includes ReactQueryDevtools in development.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * 
 * // With custom configuration
 * <QueryProvider queryClientConfig={{
 *   defaultOptions: {
 *     queries: { staleTime: 1000 * 60 * 5 }
 *   }
 * }}>
 *   <App />
 * </QueryProvider>
 * 
 * // With existing QueryClient
 * const queryClient = createQueryClient();
 * <QueryProvider client={queryClient}>
 *   <App />
 * </QueryProvider>
 * ```
 */
export const QueryProvider: FC<QueryProviderProps> = ({
  children,
  client,
  queryClientConfig,
  showDevtools = true,
}) => {
  const queryClient = useMemo(() => {
    if (client) {
      return client;
    }
    return createQueryClient(queryClientConfig);
  }, [client, queryClientConfig]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

