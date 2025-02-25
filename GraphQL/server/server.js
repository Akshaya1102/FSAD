const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the GraphQL schema
const schema = buildSchema(`
  type Product {
    _id: String!
    name: String!
    price: Float!
  }

  type ProductResponse {
    message: String!
    name: String!
    price: Float!
    _id: String!
  }
  type Query {
    getProduct(id: String!): Product
    getProducts: [Product]
  }

  type Mutation {
    addProduct(name: String!, price: Float!): ProductResponse
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
      console.log(prodData);
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

      const products = prodData.products;
      return products;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  },
  addProduct: async ({ name, price }) => {
    try {
      // Define the product object
      const product = {
        name,
        price
      };

      // Make a POST request to REST API
      const response = await fetch('http://localhost:3000/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set headers to indicate JSON payload
        },
        body: JSON.stringify(product) // Convert product object to JSON
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error('Failed to add product via API');
      }

      // Parse the JSON response
      const data = await response.json();
      // Transform the response to match the GraphQL ProductResponse type
      console.log(data.message, data.createdProduct);
      const transformedProduct = {
        message: data.message,
        _id: data.createdProduct._id,          // Map productId to id
        name: data.createdProduct.name,      // Map productName to name
        price: data.createdProduct.price             // Map cost to price
      };
      console.log(transformedProduct);
      // Return the transformed product
      return transformedProduct;
     
    } catch (error) {
      // Handle error (e.g., network issues, API errors)
      throw new Error(`Failed to add product: ${error.message}`);
    }
  }


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
