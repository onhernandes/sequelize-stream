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
      const push = () => {
        const toPush = items.shift()
        this.push(toPush || null)
      }

      if (items.length > 0) {
        push()
      } else {
        findAll(options)
          .then(results => {
            items = results
            offset = offset + limit
            push()
          })
      }
    }
  })
}
