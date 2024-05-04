import React from 'react';
import ProductList from './ProductList';

const ProductPage = () => {
  const products = [
    { name: 'Product 1', description: 'Description of product1', price: 10.99 },
    { name: 'Product 2', description: 'Description of product2', price: 19.99 },
    { name: 'Product 3', description: 'Description of product3', price: 5.99 },
  ];

  return (
    <div>
      <h1>My Online Store</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
