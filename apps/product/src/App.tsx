import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';

// Import the Product type from the ProductList component
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductApp: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>Product Catalog</h2>
      <div style={{ marginTop: '10px' }}>
        <p>Browse our selection of premium products</p>
        <ProductList 
          title="Featured Products" 
          onProductSelect={handleProductSelect}
        />
        {selectedProduct && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            border: '1px solid #e0e0e0'
          }}>
            <h3>Selected Product</h3>
            <p><strong>{selectedProduct.name}</strong></p>
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price.toFixed(2)}</p>
            <button 
              onClick={() => alert(`Added ${selectedProduct.name} to cart!`)}
              style={{
                marginTop: '15px',
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductApp;
