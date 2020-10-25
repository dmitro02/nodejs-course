process.argv.slice(2).forEach((arg) => {
    const arr = arg.split('=')
    module.exports[arr[0].substring(1)] = arr[1]
})

module.exports.port = process.env.PORT