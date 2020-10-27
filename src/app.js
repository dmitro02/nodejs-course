const http = require('http');
const logger = require('./logger')
const config = require('./config')

const port = config.port ? config.port : 3000;
const env = config.env ? config.env : 'test';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(`Hello world! (ENV: ${env})`);
});

server.listen(port, () => logger.log('Listening on port %s...', port));
