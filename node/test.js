function getIPAdress() {
    var interfaces = require('os').networkInterfaces();　　
    for (var devName in interfaces) {　　　　
        var iface = interfaces[devName];　　　　　　
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }　　
    }
  }
  const hostname = getIPAdress();


const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();
const path = require('path');
// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "http://163.13.164.164:8001/rvizweb/www/index.html";

// Proxy endpoints
app.use('/my-service', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/my-service`]: '123',
    },
}));


path.resolve(__dirname,'ssl/server-cert.pem')
var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync(path.resolve(__dirname, 'ssl/server-key.pem')),
  ca: [fs.readFileSync(path.resolve(__dirname, 'ssl/cert.pem'))],
  cert: fs.readFileSync(path.resolve(__dirname,'ssl/server-cert.pem'))
};

server = https.createServer(options, app)

server.listen(3003,hostname, function (req, res) {
  console.log('https://'+hostname+":3003");
});
// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});