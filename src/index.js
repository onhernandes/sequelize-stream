const isSequelizeModel = require('./isSequelizeModel')
const setMethod = require('./setMethod')

module.exports = target => {
  if (isSequelizeModel(target)) {
    setMethod(target)
  } else {
    target.afterDefine(setMethod)
  }
}
