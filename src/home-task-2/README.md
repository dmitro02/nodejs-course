## Event Loop

### Recreate code from presentation
Code recrated in files with presentation page number in filename (e.g. `pptPage21.js`).
Output included in the files as comments (matches the output in presentation for all files). 

### Code that may behave differently on different runs
See folder `differentBehaviour`. When you run `readFile.js` the function `doRead()` is running twice.
Its first and second runs produce different output becuse file content alrady in cache for the second run.
See output in the file.
 
### Write server with api that blocks loop
See folder `blocking-nonblocking`. Server from `httpsServerBlocking.js` blocks event loop by calculating fibonacci numbers. Open 2 tabs in browser, 1st one with `http://localhost:3333/fib`, 2nd one with `http://localhost:3333`. Second tab displays "OK" only after 1st one displays fibonacci calculation result.

### Same api non-blocking
See folder `blocking-nonblocking`. Server from `httpsServerNonBlocking.js` calculats fibonacci numbers in a child process. As a result the second tab displays "OK" immediately, while second tab is still waiting for response.

***

## Clusters

### Recreate code from presentations
Code recrated in files with presentation page number in filename (e.g. `pptPage21.js`).
Output included in the files as comments (matches the output in presentation for all files). 

### Create cluster with 6 workers. Run small server with some api. Run script that performs 100 calls to this server. Calculate on server how many requests handled each worker. 
See folder `clusterServer`. Run `clusterHttpServer.js`. Then run `countWorkerResponses.js`. It sends 100 requests and displays a map "process.pid => number-of-responses". Loooks like all 6 workers are used very rarely, usually it is 2-3 workers. Sometimes most of requests handled by the single worker, e.g.:
`{'20828':2,'30680':3,'31556':91,'31720':2,'33308':2}`

***

## Workers

### Calculate n-th Fibonacci number on worker thread
See `fibonacciWorkerThreads.js`. 

***

## Child/Parent Process

### Calculate n-th Fibonacci number on child process
Implemented in `blocking-nonblocking/httpsServerNonBlocking.js`