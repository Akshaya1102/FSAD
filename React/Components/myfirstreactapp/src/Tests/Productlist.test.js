import React from 'react';
import { render } from '@testing-library/react';
import ProductList from '../components/ProductList';

test('renders a list of products', () => {
  const products = [
    { name: 'Product 1', description: 'Description 1', price: 10 },
    { name: 'Product 2', description: 'Description 2', price: 20 },
  ];

  const { getByTestId, getByText } = render(<ProductList products={products} />);

  const productList = getByTestId('product-list');
  expect(productList).toBeInTheDocument();

  products.forEach(product => {
    const productName = getByText(product.name);
    expect(productName).toBeInTheDocument();

    const productDescription = getByText(product.description);
    expect(productDescription).toBeInTheDocument();

    const productPrice = getByText(`Price: $${product.price}`);
    expect(productPrice).toBeInTheDocument();
  });
});


test('renders a list of products1', () => {
  const products = [
    { name: 'Product 1', description: 'Description 1', price: 10 },
    { name: 'Product 2', description: 'Description 2', price: 20 },
  ];

  const { container, getByText } = render(<ProductList products={products} />);

  const productList = container.querySelector('ul');
  expect(productList).toBeInTheDocument();

  products.forEach(product => {
    const productName = getByText(product.name);
    expect(productName).toBeInTheDocument();

    const productDescription = getByText(product.description);
    expect(productDescription).toBeInTheDocument();

    const productPrice = getByText(`Price: $${product.price}`);
    expect(productPrice).toBeInTheDocument();
  });
});

