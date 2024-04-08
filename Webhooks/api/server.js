const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

let postCount = 0;

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
// API to handle the '/post' route
app.post('/post', (req, res) => {
  const postData = req.body.data;
  console.log('Received post data:', postData);

  postCount++;

  // Check if the number of posts has crossed 5
  if (postCount==5) {
    // Send webhook notification and email
    sendWebhook(postCount);
   
  }

  res.json({ message: 'Post received successfully'});
});


// Function to send webhook notification
function sendWebhook(postCount) {
  //const webhookUrl = 'http://localhost:3000/webhook'; //Replace with your actual webhook URL
  const webhookUrl = 'https://webhook.site/3f1f862d-3891-418e-baea-2095378314b5';
  axios.post(webhookUrl, { postCount })
    .then(response => console.log(JSON.stringify(response.data)))
    .catch(error => console.error('Error sending webhook:', error));
}

//Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
