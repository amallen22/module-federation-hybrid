import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUIStore.setState({
      isModalOpen: false,
      activeModal: null,
      sidebarOpen: false,
      isLoading: false,
    });
  });

  describe('Modal state', () => {
    it('should have initial modal state as closed', () => {
      const state = useUIStore.getState();
      expect(state.isModalOpen).toBe(false);
      expect(state.activeModal).toBeNull();
    });

    it('should open modal with openModal', () => {
      const { openModal } = useUIStore.getState();
      openModal('test-modal');

      const state = useUIStore.getState();
      expect(state.isModalOpen).toBe(true);
      expect(state.activeModal).toBe('test-modal');
    });

    it('should close modal with closeModal', () => {
      const { openModal, closeModal } = useUIStore.getState();
      openModal('test-modal');
      closeModal();

      const state = useUIStore.getState();
      expect(state.isModalOpen).toBe(false);
      expect(state.activeModal).toBeNull();
    });
  });

  describe('Sidebar state', () => {
    it('should have initial sidebar state as closed', () => {
      const state = useUIStore.getState();
      expect(state.sidebarOpen).toBe(false);
    });

    it('should toggle sidebar with toggleSidebar', () => {
      const { toggleSidebar } = useUIStore.getState();
      
      toggleSidebar();
      expect(useUIStore.getState().sidebarOpen).toBe(true);

      toggleSidebar();
      expect(useUIStore.getState().sidebarOpen).toBe(false);
    });
  });

  describe('Loading state', () => {
    it('should have initial loading state as false', () => {
      const state = useUIStore.getState();
      expect(state.isLoading).toBe(false);
    });

    it('should set loading state with setLoading', () => {
      const { setLoading } = useUIStore.getState();
      
      setLoading(true);
      expect(useUIStore.getState().isLoading).toBe(true);

      setLoading(false);
      expect(useUIStore.getState().isLoading).toBe(false);
    });
  });
});

