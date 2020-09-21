const setMethod = require('../src/setMethod')
const stream = require('../src/stream')
const Sequelize = require('sequelize')
const instance = new Sequelize({
  dialect: 'mysql'
})
const columns = { name: Sequelize.STRING }

describe('setMethod', () => {
  it('sets stream method to plain ob', () => {
    const User = {}
    setMethod(User)
    expect(User.stream).toBe(stream)
  })

  it('sets stream method to model created with define()', () => {
    const User = instance.define('user', columns)
    setMethod(User)
    expect(User.stream).toBe(stream)
  })

  it('sets stream method to model created with class syntax', () => {
    class User extends Sequelize.Model {}
    User.init(columns, { sequelize: instance, modelName: 'user' })
    setMethod(User)
    expect(User.stream).toBe(stream)
  })
})
