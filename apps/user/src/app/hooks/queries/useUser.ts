import { useQuery, useMutation, useQueryClient } from '@packages/query';
import {
  fetchUserProfile,
  updateUserProfile,
  fetchUserSettings,
  updateUserSettings,
  type UserProfile,
  type UserSettings,
} from '../../services/api/userApi';

// Query keys
export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  settings: () => [...userKeys.all, 'settings'] as const,
};

// User Profile hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Evitar refetch innecesario
    refetchOnMount: false, // Usar cache si está disponible
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      // Update cache optimistically
      queryClient.setQueryData<UserProfile>(userKeys.profile(), data);
      // Invalidate to refetch if needed
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
};

// User Settings hooks
export const useUserSettings = () => {
  return useQuery({
    queryKey: userKeys.settings(),
    queryFn: fetchUserSettings,
    staleTime: 1000 * 60 * 10, // 10 minutes (settings change less frequently)
    gcTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false, // Evitar refetch innecesario
    refetchOnMount: false, // Usar cache si está disponible
  });
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserSettings,
    onSuccess: (data) => {
      // Update cache optimistically
      queryClient.setQueryData<UserSettings>(userKeys.settings(), data);
      // Invalidate to refetch if needed
      queryClient.invalidateQueries({ queryKey: userKeys.settings() });
    },
  });
};

