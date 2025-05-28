export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  imageUrl?: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}
