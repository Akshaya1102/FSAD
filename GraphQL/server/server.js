const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the GraphQL schema
const schema = buildSchema(`
  type Product {
    id: String!
    name: String!
    price: Float!
  }

  type Query {
    getProduct(id: String!): Product
    getProducts: [Product]
  }

  type Mutation {
    addProduct(name: String!, price: Float!): Product
  }
`);

// Sample data
const products = [
  { id: '1', name: 'Test', price: 28 },
  { id: '2', name: 'Pen', price: 24 },
];

// Define resolvers
const root = {
  getProduct: async ({ id }) => {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const prodData = await response.json();
        const product = prodData.product;
        return product;
      } catch (error) {
        throw new Error('Failed to fetch user data');
      }
  },
  getProducts: async () => {
    try {
        const response = await fetch(`http://localhost:3000/products/`);
        const prodData = await response.json();
        console.log(prodData);
        const products = prodData.products;
        return products;
      } catch (error) {
        throw new Error('Failed to fetch user data');
      }
  },
   addProduct: ({ name, price }) => {
    const newProduct = { id: String(products.length + 1), name, price};
    products.push(newProduct);
    return newProduct;
  },
};
  

// Create an Express server
const app = express();

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for easy testing in the browser
  })
);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});
