import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDocuments,
  fetchDocument,
  type Document,
} from '../../services/api/userApi';

// Query keys
export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...documentKeys.lists(), filters] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
};

// Documents hooks
export const useDocuments = () => {
  return useQuery({
    queryKey: documentKeys.list(),
    queryFn: fetchDocuments,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
};

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => fetchDocument(id),
    enabled: !!id, // Only fetch if id is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Document mutations (for future use)
export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
      // TODO: Implement actual API call
      return Promise.resolve({
        ...document,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Document);
    },
    onSuccess: () => {
      // Invalidate documents list to refetch
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: Implement actual API call
      return Promise.resolve();
    },
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: documentKeys.detail(id) });
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
};

