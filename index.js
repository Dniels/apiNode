const http = require('http');
const server = require('./server')
const port = process.env.port || 3000;
const index = http.createServer(server);
index.listen(port);