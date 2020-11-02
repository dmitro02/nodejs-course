const fun1 = () => {
    setTimeout(() => console.log('timeout1'));
    setTimeout(() => {
        console.log('timeout2')
        Promise.resolve().then(() => console.log('promise resolve'))
    });
    setTimeout(() => console.log('timeout3'));
    setTimeout(() => console.log('timeout4'));
}

const fun2 = () => {
    setImmediate(() => console.log('timeout1'));
    setImmediate(() => {
        console.log('timeout2')
        process.nextTick(() => console.log('next tick'))
    });
    setImmediate(() => console.log('timeout3'));
    setImmediate(() => console.log('timeout4'));
}

fun1()
// fun2()

/**
OUTPUT fun1:
============
node v10.16.3
-------------
timeout1
timeout2
timeout3
timeout4
promise resolve
T

node v14.15.0
-------------
timeout1
timeout2       
promise resolve
timeout3
timeout4
*/