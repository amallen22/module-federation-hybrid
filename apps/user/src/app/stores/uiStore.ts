import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Modal states
  isModalOpen: boolean;
  activeModal: string | null;
  
  // Sidebar state
  sidebarOpen: boolean;
  
  // Loading states
  isLoading: boolean;
  
  // Actions
  openModal: (modalId: string) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      isModalOpen: false,
      activeModal: null,
      sidebarOpen: true,
      isLoading: false,
      
      // Actions
      openModal: (modalId: string) => set({ 
        isModalOpen: true, 
        activeModal: modalId 
      }),
      
      closeModal: () => set({ 
        isModalOpen: false, 
        activeModal: null 
      }),
      
      toggleSidebar: () => set((state) => ({ 
        sidebarOpen: !state.sidebarOpen 
      })),
      
      setLoading: (loading: boolean) => set({ 
        isLoading: loading 
      }),
    }),
    { name: 'ui-store' }
  )
);

