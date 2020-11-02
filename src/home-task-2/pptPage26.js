const crypto = require("crypto");

const start = Date.now();

function logHashTime() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      console.log("Hash: ", Date.now() - start);
  });
}

// process.env.UV_THREADPOOL_SIZE = 5

for (i = 0; i < 5; i++) {
  logHashTime();
}

/**
OUTPUT:
===========
4 times
-----------
Hash:  1341
Hash:  1363
Hash:  1376
Hash:  1433

5 times
-----------
Hash:  1414
Hash:  1425
Hash:  1443
Hash:  1455
Hash:  2099

5 times with UV_THREADPOOL_SIZE=5
-----------
Hash:  1678
Hash:  1687
Hash:  1688
Hash:  1691
Hash:  1696
*/