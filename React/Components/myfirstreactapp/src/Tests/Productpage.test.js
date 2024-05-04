import React from 'react';
import { render } from '@testing-library/react';
import ProductPage from '../components/ProductsPage';

test('renders a list of products on the product page', () => {
  const { getByText } = render(<ProductPage />);

  // Assert that the page title is rendered
  const pageTitle = getByText('My Online Store');
  expect(pageTitle).toBeInTheDocument();

  // Assert that each product is rendered
  const products = [
    { name: 'Product 1', description: 'Description of product1', price: 10.99 },
    { name: 'Product 2', description: 'Description of product2', price: 19.99 },
    { name: 'Product 3', description: 'Description of product3', price: 5.99 },
  ];

  products.forEach(product => {
    const productName = getByText(product.name);
    expect(productName).toBeInTheDocument();

    const productDescription = getByText(product.description);
    expect(productDescription).toBeInTheDocument();

    const productPrice = getByText(`Price: $${product.price}`);
    expect(productPrice).toBeInTheDocument();
  });
});
