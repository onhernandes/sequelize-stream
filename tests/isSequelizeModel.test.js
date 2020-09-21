const isSequelizeModel = require('../src/isSequelizeModel')
const Sequelize = require('sequelize')
const instance = new Sequelize({
  dialect: 'mysql'
})
const columns = { name: Sequelize.STRING }

describe('isSequelizeModel', () => {
  it('returns true for model created with .define()', () => {
    const User = instance.define('user', columns)
    expect(isSequelizeModel(User)).toBe(true)
  })

  it('returns true for model created with class syntax', () => {
    class User extends Sequelize.Model {}
    User.init(columns, { sequelize: instance, modelName: 'user' })
    expect(isSequelizeModel(User)).toBe(true)
  })

  it('returns false for plain object', () => {
    expect(isSequelizeModel({})).toBe(false)
  })
})
