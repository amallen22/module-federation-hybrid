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

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    description: "High-quality noise cancelling headphones with superior sound quality and comfort for extended listening sessions.",
    stock: 10,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 49.99,
    description: "Ergonomic wireless mouse with long battery life and precise tracking for professional use.",
    stock: 15,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "Mechanical keyboard with RGB lighting and customizable keys for gaming and productivity.",
    stock: 8,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1595225476077-1ff72c113c87"
  },
  {
    id: 4,
    name: "Ultra HD Monitor",
    price: 349.99,
    description: "27-inch 4K Ultra HD monitor with HDR support for stunning visuals and professional color accuracy.",
    stock: 5,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
  }
];

export const createProductSlice: StateCreator<ProductSlice> = (set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ products: demoProducts, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", isLoading: false });
    }
  },
  selectProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null })
});
