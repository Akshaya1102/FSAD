const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());


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

// Webhook handler API
app.post('/webhook', (req, res) => {
  const webhookData = req.body;
  console.log('Received webhook data:', webhookData);

  // Send the number of posts back to the client
  res.json({ data: webhookData , status:"Received sucessfully" });
});


//Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
