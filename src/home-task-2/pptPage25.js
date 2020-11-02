function repeat(num) {
   for (let i = 0; i < num; i++) {
     for (let j = 0; j < num; j++) {
         // do nothing
     }
   }
 }
 
 const start = new Date()
 repeat(100000)
 setTimeout(() => console.log('Timeout:', new Date() - start), 0);
 process.nextTick(() => console.log('Next: ', new Date() - start));

/**
OUTPUT:
===========
Next:  5007
Timeout: 5015
*/