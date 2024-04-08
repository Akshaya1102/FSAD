const http = require('http');
const app = require('./app');

//const hostname = '127.0.0.1'; 
const port = process.env.PORT || 3000;

//App.js contains the code to process the http request and send the response
const server = http.createServer(app);

server.listen(port, () => { 
    console.log(`Server running at ${port}`); 
});
