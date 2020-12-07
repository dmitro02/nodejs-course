const cp = require('child_process');

const n = cp.fork(`${__dirname}/child.js`);

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

n.send({ hello: 'world' });

/**
OUTPUT:
==================
PARENT got message: { foo: 'bar', baz: null }
CHILD got message: { hello: 'world' }
*/