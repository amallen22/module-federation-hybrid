import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ProductSlice, createProductSlice } from './slices/productSlice';
import { UISlice, createUISlice } from './slices/uiSlice';

export type StoreState = ProductSlice & UISlice;

// Create the store with proper middleware typing
export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer(
        (set, get, api) => ({
          ...createProductSlice(set, get, api),
          ...createUISlice(set, get, api)
        })
      ),
      {
        name: 'cv-hibrid-store',
        // Only persist UI and cart state, not product data which should be fetched fresh
        partialize: (state) => ({
          theme: state.theme,
          cart: state.cart,
          isCartOpen: state.isCartOpen
        })
      }
    ),
    { name: 'CV Hibrid Store' }
  )
);

