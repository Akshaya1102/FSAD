const http2 = require("http2");

const client = http2.connect("https://localhost:8443", {
    rejectUnauthorized: false, // Ignore self-signed SSL warnings
});

function fetchWithPriority(path) {
    const request = client.request({ ":path": path });

    request.on("response", (headers) => {
        let data = "";
        request.on("data", (chunk) => (data += chunk));
        request.on("end", () => {
            console.log(`Received: ${data}`);
            if (path === "/low") client.close(); // Close after last request
        });
    });

    request.end();
}

// Send requests for different paths (server assigns priority)

fetchWithPriority("/medium"); // Medium priority (128)
fetchWithPriority("/low");    // Lowest priority (16)
fetchWithPriority("/high");   // Highest priority (256)
