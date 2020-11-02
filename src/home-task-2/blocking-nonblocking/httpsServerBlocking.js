const http = require('http');
const { fibonacci } = require('../utils/fibonacci')

const server = http.createServer((req, res) => {
    if (req.url === '/fib') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const result = fibonacci(44); // about 10 seconds on my machine
        res.end(JSON.stringify({ result }));
    } else {
        res.statusCode = 200;
        res.end(JSON.stringify('OK'));
    }
});

server.listen(3333, () => console.log('Listening on port 3333...'));