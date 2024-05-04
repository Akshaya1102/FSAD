import React from 'react';

const ProductList = ({ products }) => {
  let filterPrice = 0;
  return (
    <div>
      <h2>Products</h2>
      <ul data-testid="product-list">
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
       
    </div>
  );
};

export default ProductList;
