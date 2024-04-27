import { makeRequest } from "./fetch.js";
console.log('Hello, This is a webpack demonstration!');
makeRequest();

const greet = (name) => {
    console.log(`Hello, ${name}!`);
  };
  
greet('World');
  