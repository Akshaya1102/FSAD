const express = require("express");
const app = express();

//Middleware to parse the json, url  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//local variable! Will be replaced with MongoDB
const orders = [];

/**
 * API : creating a New order
 * URI: /orders
 * Method: POST
 */
// req- request object,  res-response object, use req.body , req.params to read
//app.verb(uri,handlerfn(req,res))
app.post("/orders", (req, res) => {
  const order = req.body;
  if (order.product_name || order.customer_name || order.product_qty) {
    orders.push({
      ...order,
      id: orders.length + 1,
      date: Date.now().toString()
    });
    console.log();
    res.status(201).json({
      message: "Order created successfully"
    });
  } else {
    res.status(401).json({
      message: "Invalid Order creation"
    });
  }
});

/**
 * API : Retreive all orders
 * URI: /orders
 * Method: GET
 */

app.get("/orders", (req, res) => {
  res.status(200).send(orders);
});

/**
 * API : Update an order
 * URI: /orders/:id
 * Method: PATCH
 */
app.patch("/orders/:id", (req, res) => {
  const order_id = req.params.id;
  const order_update = req.body;
  console.log(req.body, order_id);
  for (let order of orders) {
    if (order.id == order_id) {
      if (order_update.product_name != null || undefined)
        order.product_name = order_update.product_name;
      if (order_update.product_qty != null || undefined)
        order.product_qty = order_update.product_qty;
      if (order_update.customer_name != null || undefined)
        order.customer_name = order_update.customer_name;

      return res
        .status(200)
        .json({ message: "Updated Succesfully", data: order });
    }
  }

  res.status(404).json({ message: "Invalid Order Id" });
});

/**
 * API : Deletes an order
 * URI: /orders/:id
 * Method: DELETE
 */
app.delete("/orders/:id", (req, res) => {
  const order_id = req.params.id;

  for (let order of orders) {
    if (order.id == order_id) {
      orders.splice(orders.indexOf(order), 1);

      return res.status(200).json({
        message: "Deleted Successfully"
      });
    }
  }
  res.status(404).json({ message: "Invalid Order Id" });
});

app.use(function(req, res){
   res.status(401).json({
    message: "Not Found"
  });
  });

module.exports = app;