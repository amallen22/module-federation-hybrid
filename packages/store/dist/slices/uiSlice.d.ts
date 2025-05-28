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
export declare const createUISlice: StateCreator<UISlice>;
