import React from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    description: "High-quality noise cancelling headphones"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 49.99,
    description: "Ergonomic wireless mouse with long battery life"
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "Mechanical keyboard with RGB lighting"
  }
];

export interface ProductListProps {
  title?: string;
  onProductSelect?: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  title = "Featured Products",
  onProductSelect 
}) => {
  return (
    <div style={{ padding: '15px', maxWidth: '600px' }}>
      <h3>{title}</h3>
      <div>
        {demoProducts.map(product => (
          <div 
            key={product.id}
            style={{
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #eee',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => onProductSelect?.(product)}
          >
            <h4 style={{ margin: '0 0 8px' }}>{product.name}</h4>
            <p style={{ margin: '0 0 8px', color: '#666' }}>{product.description}</p>
            <div style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

