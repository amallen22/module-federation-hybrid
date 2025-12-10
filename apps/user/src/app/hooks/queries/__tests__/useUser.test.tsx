import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient } from '@packages/query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useUserProfile, useUserSettings } from '../useUser';

// Mock the API
const mockFetchUserProfile = vi.fn();
const mockFetchUserSettings = vi.fn();

vi.mock('../../../services/api/userApi', () => ({
  fetchUserProfile: () => mockFetchUserProfile(),
  fetchUserSettings: () => mockFetchUserSettings(),
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

describe('useUser hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useUserProfile', () => {
    it('should fetch user profile successfully', async () => {
      const mockProfile = {
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      mockFetchUserProfile.mockResolvedValue(mockProfile);

      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockProfile);
      expect(mockFetchUserProfile).toHaveBeenCalledTimes(1);
    });

    it('should handle error when fetching profile fails', async () => {
      const mockError = new Error('Failed to fetch profile');
      mockFetchUserProfile.mockRejectedValue(mockError);

      const { result } = renderHook(() => useUserProfile(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(mockError);
    });
  });

  describe('useUserSettings', () => {
    it('should fetch user settings successfully', async () => {
      const mockSettings = {
        language: 'es-ES',
        timezone: 'Europe/Madrid',
        emailNotifications: true,
      };

      mockFetchUserSettings.mockResolvedValue(mockSettings);

      const { result } = renderHook(() => useUserSettings(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSettings);
      expect(mockFetchUserSettings).toHaveBeenCalledTimes(1);
    });

    it('should handle error when fetching settings fails', async () => {
      const mockError = new Error('Failed to fetch settings');
      mockFetchUserSettings.mockRejectedValue(mockError);

      const { result } = renderHook(() => useUserSettings(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(mockError);
    });
  });
});

