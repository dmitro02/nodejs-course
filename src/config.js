require('dotenv').config()
const path = require('path')

process.argv.slice(2).forEach((arg) => {
    const arr = arg.split('=')
    module.exports[arr[0].substring(1)] = arr[1]
})

const dbOptions = {
    dbPort: process.env.DB_PORT,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUser :process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbDialect: process.env.DB_DIALECT,
    dbStorage: path.join(__dirname, '../calendar.sqlite')
}

module.exports = {
    ...module.exports,
    ...dbOptions,
    port: process.env.PORT || 3003
}