const http = require('http');
const server = require('./server')
const os = require('os');
const cluster = require('cluster');
const port = process.env.port || 3000;
const index = http.createServer(server);

if(cluster.isMaster) {
    for (let c = 0; c < os.cpus().length; c++) {
        var worker = cluster.fork();
        console.log(worker.id);
    }
} 
else {

    console.log(os.cpus());
    index.listen(port);

}