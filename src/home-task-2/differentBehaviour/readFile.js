const fs = require('fs');

const filesCache = {};

const readFile = (fileName, callback) => {
    if (filesCache[fileName]) {
        return callback(null, filesCache[fileName]);
    }
    fs.readFile(fileName, (err, fileContent) => {
        if (err) return callback(err);
        
        filesCache[fileName] = fileContent;
        callback(null, fileContent);
    });
}

const doRead = (fileName) => {
    console.log('\nrun doRead:')
    readFile(fileName, (err, result) => {
      console.log('file read complete');
    });
    console.log('file read started');
}

setTimeout(() => doRead('./fileToRead.txt'), 0);
setTimeout(() => doRead('./fileToRead.txt'), 2000);

/**
 OUTPUT:
===========
run doRead:
file read started
file read complete

run doRead:
file read complete
file read started
*/