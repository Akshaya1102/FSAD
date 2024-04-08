const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'access-control-allow-origin':'*'
  });

  // Send periodic updates
  setInterval(() => {
    res.write(`data: ${JSON.stringify({ message: 'Server time: ' + new Date() })}\n\n`);
  }, 1000);
}).listen(3000);

console.log('Server running at http://localhost:3000/');
