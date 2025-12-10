import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient } from '@packages/query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useSubscription } from '../useSubscription';

// Mock the API
const mockFetchSubscription = vi.fn();

vi.mock('../../../services/api/userApi', () => ({
  fetchSubscription: () => mockFetchSubscription(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useSubscription hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useSubscription', () => {
    it('should fetch subscription successfully', async () => {
      const mockSubscription = {
        id: '1',
        plan: 'premium' as const,
        status: 'active' as const,
        startDate: '2025-01-01',
        autoRenew: true,
      };

      mockFetchSubscription.mockResolvedValue(mockSubscription);

      const { result } = renderHook(() => useSubscription(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSubscription);
      expect(mockFetchSubscription).toHaveBeenCalledTimes(1);
    });

    it('should handle error when fetching subscription fails', async () => {
      const mockError = new Error('Failed to fetch subscription');
      mockFetchSubscription.mockRejectedValue(mockError);

      const { result } = renderHook(() => useSubscription(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(mockError);
    });
  });
});

