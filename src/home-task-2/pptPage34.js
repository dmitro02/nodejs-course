const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello World!\nfrom ${process.pid}\n`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}

/**
OUTPUT:
==================
Master 13624 is running
Worker 29936 started
Worker 19916 started
Worker 37724 started
Worker 8524 started
*/