const http = require('http');
const { fork } = require('child_process'); 

const server = http.createServer((req, res) => {
    const childProcess = fork('../utils/fibonacci.js');
    childProcess.send(44);
    childProcess.on('message', result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ result }))
    });
});

server.listen(3333, () => console.log('Listening on port 3333...'));