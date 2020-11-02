const fibonacci = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fibonacci(n - 1) + fibonacci(n - 2);
}

process.on("message", number => {
    const result = fibonacci(number)
    process.send(result);
    process.exit();
})

module.exports = { fibonacci }