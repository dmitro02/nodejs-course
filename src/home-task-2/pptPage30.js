const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

/**
OUTPUT:
==================
stdout: total 176K
drwxr-xr-x 1 Dmitro 197609 0 Mar 14  2019 bin
drwxr-xr-x 1 Dmitro 197609 0 Mar 14  2019 etc
drwxr-xr-x 1 Dmitro 197609 0 Mar 14  2019 lib
drwxr-xr-x 1 Dmitro 197609 0 Mar 14  2019 libexec
drwxr-xr-x 1 Dmitro 197609 0 Mar 14  2019 share
drwxr-xr-x 1 Dmitro 197609 0 Mar 14  2019 ssl

child process exited with code 0
*/