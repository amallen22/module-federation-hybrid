import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

/**
 * Default configuration for QueryClient
 */
const defaultConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto por defecto
      gcTime: 1000 * 60 * 5, // 5 minutos (antes cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0, // No retry mutations por defecto
    },
  },
};

/**
 * Creates a configured QueryClient instance
 * 
 * @param options - Optional configuration to override defaults
 * @returns Configured QueryClient instance
 * 
 * @example
 * ```ts
 * const queryClient = createQueryClient();
 * 
 * // With custom options
 * const queryClient = createQueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 1000 * 60 * 5, // 5 minutos
 *     }
 *   }
 * });
 * ```
 */
export function createQueryClient(options?: QueryClientConfig): QueryClient {
  const config: QueryClientConfig = options
    ? {
        ...defaultConfig,
        ...options,
        defaultOptions: {
          queries: {
            ...defaultConfig.defaultOptions?.queries,
            ...options.defaultOptions?.queries,
          },
          mutations: {
            ...defaultConfig.defaultOptions?.mutations,
            ...options.defaultOptions?.mutations,
          },
        },
      }
    : defaultConfig;

  return new QueryClient(config);
}

