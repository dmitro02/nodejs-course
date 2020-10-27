const log = (...args) => console.log(...args);

const warn = (...args) => console.warn(...args);

const error = (...args) => console.error(...args);

const debug = (...args) => console.debug(...args);

module.exports = {
    log, 
    warn, 
    error, 
    debug
}
