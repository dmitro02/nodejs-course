const path = require('path')

process.argv.slice(2).forEach((arg) => {
    const arr = arg.split('=')
    module.exports[arr[0].substring(1)] = arr[1]
})

options = {
    port: process.env.PORT || 3003,
    jwtExpiresIn: 10, 
    jwtRefreshExpiresIn: 60 * 10,
    privateKeyPath: path.join(__dirname, '../test-ssl-keys/id_rsa'),
    publicKeyPath: path.join(__dirname, '../test-ssl-keys/id_rsa.pub.pem')
}

module.exports = {
    ...module.exports,
    ...options
}