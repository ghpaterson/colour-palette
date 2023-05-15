const cors_proxy = require("cors-anywhere");

// Set the desired port number for the proxy server
const port = 8080;

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
  })
  .listen(port, () => {
    console.log(`CORS Anywhere proxy server running on localhost:${port}`);
  });
