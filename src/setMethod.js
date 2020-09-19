const stream = require('./stream')

module.exports = model => {
  model.stream = stream
  return model
}
