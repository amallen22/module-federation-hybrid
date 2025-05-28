import { StateCreator } from "zustand";
import { CartItem, Product } from "../types";

export interface UISlice {
  theme: "light" | "dark";
  isCartOpen: boolean;
  cart: CartItem[];
  toggleTheme: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const createUISlice: StateCreator<UISlice> = (set, get) => ({
  theme: "light",
  isCartOpen: false,
  cart: [],
  
  toggleTheme: () => set(state => ({ 
    theme: state.theme === "light" ? "dark" : "light" 
  })),
  
  toggleCart: () => set(state => ({ 
    isCartOpen: !state.isCartOpen 
  })),
  
  addToCart: (product, quantity = 1) => set(state => {
    const existingItem = state.cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      return {
        cart: state.cart.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    } else {
      return {
        cart: [...state.cart, {
          productId: product.id,
          quantity,
          product
        }]
      };
    }
  }),
  
  removeFromCart: (productId) => set(state => ({
    cart: state.cart.filter(item => item.productId !== productId)
  })),
  
  updateQuantity: (productId, quantity) => set(state => ({
    cart: state.cart.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    )
  })),
  
  clearCart: () => set({ cart: [] }),
  
  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  },
  
  getCartItemCount: () => {
    const state = get();
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  }
});
