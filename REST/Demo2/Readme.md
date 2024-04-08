Node.js is one of the most popular server-side frameworks.
Express is a web application framework for Node.js 

Demonstration 2: 

Create app.js
const express = require('express');
const app = express();
 app.use((req, res, next) => {
res.status(200).json({
message: "Im up!'
});
}); //sets middleware
module.exports=app;


Edit Server.js
const app=require('./app');
const server = http.createServer(app);  

Run npm start




