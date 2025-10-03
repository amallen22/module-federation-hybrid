import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface SessionData {
  token?: string;
  refreshToken?: string;
  expiresAt?: number;
  [key: string]: any;
}

interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface GlobalState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  
  // Session (replaces cookies)
  sessionData: SessionData;
  setSessionData: (key: string, value: any) => void;
  clearSession: () => void;
  
  // Active app
  activeApp: string;
  setActiveApp: (app: string) => void;
  
  // Shared data between apps
  sharedData: Record<string, any>;
  updateSharedData: (data: Record<string, any>) => void;
  clearSharedData: (key?: string) => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Global notifications
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        sessionData: {},
        activeApp: 'shell',
        sharedData: {},
        isLoading: false,
        notifications: [],
        
        // User actions
        setUser: (user) => set({ 
          user, 
          isAuthenticated: true 
        }, false, 'setUser'),
        
        logout: () => set({ 
          user: null, 
          isAuthenticated: false, 
          sessionData: {},
          sharedData: {} 
        }, false, 'logout'),
        
        // Session actions
        setSessionData: (key, value) => 
          set((state) => ({
            sessionData: { ...state.sessionData, [key]: value }
          }), false, `setSessionData/${key}`),
        
        clearSession: () => 
          set({ sessionData: {} }, false, 'clearSession'),
        
        // Active app actions
        setActiveApp: (app) => 
          set({ activeApp: app }, false, 'setActiveApp'),
        
        // Shared data actions
        updateSharedData: (data) =>
          set((state) => ({
            sharedData: { ...state.sharedData, ...data }
          }), false, 'updateSharedData'),
        
        clearSharedData: (key) =>
          set((state) => {
            if (key) {
              const { [key]: _, ...rest } = state.sharedData;
              return { sharedData: rest };
            }
            return { sharedData: {} };
          }, false, 'clearSharedData'),
        
        // Loading actions
        setLoading: (loading) =>
          set({ isLoading: loading }, false, 'setLoading'),
        
        // Notification actions
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              { ...notification, id: Date.now().toString() }
            ]
          }), false, 'addNotification'),
        
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }), false, 'removeNotification'),
      }),
      {
        name: 'cv-global-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          sessionData: state.sessionData,
        }),
      }
    ),
    { name: 'CV Global Store' }
  )
);

// Useful selectors
export const selectUser = (state: GlobalState) => state.user;
export const selectIsAuthenticated = (state: GlobalState) => state.isAuthenticated;
export const selectSharedData = (state: GlobalState) => state.sharedData;
export const selectSessionData = (state: GlobalState) => state.sessionData;
export const selectActiveApp = (state: GlobalState) => state.activeApp;
export const selectNotifications = (state: GlobalState) => state.notifications;

// Export types
export type { User, SessionData, NotificationItem, GlobalState };
