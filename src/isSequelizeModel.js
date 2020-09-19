const Model = require('sequelize').Model

module.exports = object =>
  object instanceof Model ||
  Reflect.getPrototypeOf(object) === Model
