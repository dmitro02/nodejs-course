const { Transform } = require('stream')

class Filter extends Transform {
  constructor(predicate) {
    super()
    this.predicate = predicate
  }  
  _transform(chunk, encoding, next) {
    if (!this.predicate) {
      return next(null, chunk)
    }
    if (this.predicate(chunk.toString())) {
      return next(null, chunk)
    }
    next()
  }
  has(value) {
    return !!value
  }
}

module.exports = Filter