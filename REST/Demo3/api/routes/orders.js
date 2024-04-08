const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

/* Handle incoming GET requests to /orders*/
router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate('product', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})

/* With pagination and filtering
*/
/*
router.get("/", async (req, res, next) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 5; // default page size is 10
    const page = parseInt(req.query.page) || 1; // default page is 1
    const filter = {};

    // Retrieve filter parameters from query and construct filter object
    if (req.query.quantity) {
      filter.quantity = { $gte: parseInt(req.query.quantity) };
    }
    // Add more conditions as needed for other filter parameters

    const docs = await Order.find(filter)
      .select("product quantity _id")
      .populate('product', 'name')
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const count = await Order.countDocuments(filter);
    const totalPages = Math.ceil(count / pageSize);

    const response = {
      count: docs.length,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pageSize,
      orders: docs.map(doc => ({
        _id: doc._id,
        product: doc.product,
        quantity: doc.quantity,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + doc._id
        }
      }))
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/
router.post("/", (req, res, next) => {
 Product.findById(req.body.productId)
    .then(product => {
      console.log(req.body.productId);
      if (!product) {
         return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      order.save()
      .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          product: result.product,
          quantity: result.quantity,
          _id: result._id
          
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
      
    });
  
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.findByIdAndDelete({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
