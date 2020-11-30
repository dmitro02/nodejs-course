process.argv.slice(2).forEach((arg) => {
    const arr = arg.split('=')
    module.exports[arr[0].substring(1)] = arr[1]
})

options = {
    port: process.env.PORT || 3003,
    jwtExpiresIn: 30, 
    jwtRefreshExpiresIn: 60 * 10
}

module.exports = {
    ...module.exports,
    ...options
}