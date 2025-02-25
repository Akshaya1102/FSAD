const http2 = require("http2");
const fs = require("fs");

const serverOptions = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
};

const server = http2.createSecureServer(serverOptions);

server.on("stream", (stream, headers) => {
    const path = headers[":path"];
    
    let weight = 16; // Default weight
    if (path === "/high") weight = 256;
    else if (path === "/medium") weight = 128;
    else if (path === "/low") weight = 16;

    console.log(`Received request for ${path} with weight ${weight}`);

    // Set priority on the stream
    stream.priority({ weight });

    // Fix CORS Error: Allow all origins (or specify a domain)
    stream.respond({
        "content-type": "text/plain",
        ":status": 200,
        "access-control-allow-origin": "*", // This allows any origin to fetch
        "access-control-allow-methods": "GET, POST, OPTIONS",
        "access-control-allow-headers": "Content-Type",
    });

    setTimeout(() => {
        stream.end(`Response for ${path} (Weight: ${weight})`);
    }, weight === 256 ? 100 : weight === 128 ? 500 : 1000);
});

// Handle preflight (OPTIONS) requests for CORS
server.on("request", (req, res) => {
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, OPTIONS",
            "access-control-allow-headers": "Content-Type",
        });
        res.end();
    }
});

server.listen(8443, () => {
    console.log("HTTP/2 Server running at https://localhost:8443");
});
