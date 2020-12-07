const {
    Worker, 
    isMainThread, 
    parentPort, 
    workerData
  } = require('worker_threads');

const number = 40;

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: number });
  worker.on('message', (msg) => console.log(msg));
  worker.on('error',  (err) => console.log(err));
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.log(`Worker stopped with exit code ${code}`);
    }
  });
} else {
  const { fibonacci } = require('./utils/fibonacci');
  const number = workerData;
  parentPort.postMessage(fibonacci(number));
}
  
  /**
  OUTPUT:
  =========
  102334155
  */