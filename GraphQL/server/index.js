const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    addUser(name: String!, age: Int!): User
  }
`);

// Sample data
const users = [
  { id: '1', name: 'John Doe', age: 28 },
  { id: '2', name: 'Jane Smith', age: 24 },
];

// Define resolvers
const root = {
  getUser: ({ id }) => users.find(user => user.id === id),
  getUsers: () => users,
  addUser: ({ name, age }) => {
    const newUser = { id: String(users.length + 1), name, age };
    users.push(newUser);
    return newUser;
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
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});
