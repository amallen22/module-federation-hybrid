import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient } from '@packages/query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useDocuments, useDocument } from '../useDocuments';

// Mock the API
const mockFetchDocuments = vi.fn();
const mockFetchDocument = vi.fn();

vi.mock('../../../services/api/userApi', () => ({
  fetchDocuments: () => mockFetchDocuments(),
  fetchDocument: (id: string) => mockFetchDocument(id),
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

describe('useDocuments hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useDocuments', () => {
    it('should fetch documents list successfully', async () => {
      const mockDocuments = [
        { id: '1', name: 'My CV', type: 'cv' as const, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
        { id: '2', name: 'Cover Letter', type: 'cover-letter' as const, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
      ];

      mockFetchDocuments.mockResolvedValue(mockDocuments);

      const { result } = renderHook(() => useDocuments(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockDocuments);
      expect(mockFetchDocuments).toHaveBeenCalledTimes(1);
    });

    it('should handle error when fetching documents fails', async () => {
      const mockError = new Error('Failed to fetch documents');
      mockFetchDocuments.mockRejectedValue(mockError);

      const { result } = renderHook(() => useDocuments(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(mockError);
    });
  });

  describe('useDocument', () => {
    it('should fetch single document successfully', async () => {
      const mockDocument = {
        id: '1',
        name: 'My CV',
        type: 'cv' as const,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
      };

      mockFetchDocument.mockResolvedValue(mockDocument);

      const { result } = renderHook(() => useDocument('1'), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockDocument);
      expect(mockFetchDocument).toHaveBeenCalledWith('1');
    });

    it('should not fetch when id is empty', () => {
      const { result } = renderHook(() => useDocument(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(mockFetchDocument).not.toHaveBeenCalled();
    });
  });
});

