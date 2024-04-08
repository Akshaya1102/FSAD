const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");


const dbConfig = require('./db.config.js');

 //Connecting to the database
 mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

//mongoose.Promise = global.Promise;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


//CORS headers


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
   next();   
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
  message: "hi"
});
});
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



module.exports = app;
