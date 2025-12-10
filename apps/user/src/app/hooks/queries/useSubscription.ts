import { useQuery, useMutation, useQueryClient } from '@packages/query';
import {
  fetchSubscription,
  type Subscription,
} from '../../services/api/userApi';

// Query keys
export const subscriptionKeys = {
  all: ['subscription'] as const,
  current: () => [...subscriptionKeys.all, 'current'] as const,
};

// Subscription hooks
export const useSubscription = () => {
  return useQuery({
    queryKey: subscriptionKeys.current(),
    queryFn: fetchSubscription,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false, // Evitar refetch innecesario
    refetchOnMount: false, // Usar cache si está disponible
  });
};

// Subscription mutations (for future use)
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscription: Partial<Subscription>) => {
      // TODO: Implement actual API call
      return Promise.resolve({
        id: '1',
        plan: subscription.plan || 'premium',
        status: subscription.status || 'active',
        startDate: new Date().toISOString(),
        autoRenew: subscription.autoRenew ?? true,
      } as Subscription);
    },
    onSuccess: (data) => {
      // Update cache optimistically
      queryClient.setQueryData<Subscription>(subscriptionKeys.current(), data);
      // Invalidate to refetch if needed
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
    },
  });
};

