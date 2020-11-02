const fibonacci = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fibonacci(n - 1) + fibonacci(n - 2);
}

// const fibonacciMemoized = (n, memo) => {
//     memo = memo || {};

//     if (memo[n]) return memo[n];

//     if (n === 0) return 0;
//     if (n === 1) return 1;

//     return memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
// }

process.on("message", number => {
    const result = fibonacci(number)
    process.send(result);
    process.exit();
})

// module.exports = {
//     fibonacci,
//     fibonacciMemoized
// }