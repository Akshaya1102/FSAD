"use strict";

var _fetch = require("./fetch.js");
console.log('Hello, This is a webpack demonstration!');
(0, _fetch.makeRequest)();
var greet = function greet(name) {
  console.log("Hello, ".concat(name, "!"));
};
greet('World');
