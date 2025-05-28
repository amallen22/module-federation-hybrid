import { StateCreator } from "zustand";
import { Product } from "../types";
export interface ProductSlice {
    products: Product[];
    selectedProduct: Product | null;
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    selectProduct: (product: Product) => void;
    clearSelectedProduct: () => void;
}
export declare const createProductSlice: StateCreator<ProductSlice>;
