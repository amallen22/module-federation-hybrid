// QueryClient
export { createQueryClient } from './lib/queryClient';
export type { QueryClientConfig } from '@tanstack/react-query';

// Providers
export { QueryProvider } from './providers/QueryProvider';
export type { QueryProviderProps } from './providers/QueryProvider';

// Utilities
export {
  extractErrorMessage,
  isNetworkError,
  formatErrorForDisplay,
} from './utils/errorHandler';

// Re-export commonly used TanStack Query hooks and types
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useSuspenseQuery,
  QueryClient,
} from '@tanstack/react-query';

export type {
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

