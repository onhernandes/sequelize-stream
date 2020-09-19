const { Readable } = require('stream')

module.exports = function stream (options = {}) {
  let offset = 0
  const limit = Reflect.get(options, 'limit') || 100

  options.limit = limit
  options.offset = offset

  const findAll = this.findAll
  let items = []

  return new Readable({
    objectMode: true,
    read () {
      if (items.length) {
        const item = items.shift()
        this.push(item)
        return
      }

      findAll(options)
        .then(results => {
          items = results
          offset = offset + limit
        })
    }
  })
}
