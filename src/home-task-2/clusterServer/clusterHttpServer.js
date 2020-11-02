const cluster = require('cluster');
const http = require('http');
const { fibonacci } = require('../utils/fibonacci');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < 6; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);  
    res.end(JSON.stringify(
      { 
        result: fibonacci(34),
        responder: process.pid
      }
    ));
  }).listen(3333);

  console.log(`Worker ${process.pid} started`);
}
