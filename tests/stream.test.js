const setMethod = require('../src/setMethod')
const Sequelize = require('sequelize')
const Op = require('sequelize').Op
const instance = new Sequelize({
  dialect: 'mysql'
})
const columns = { name: Sequelize.STRING }

describe('stream()', () => {
  it('calls findAll() with no results', (done) => {
    const User = instance.define('user', columns)
    User.findAll = async () => []
    setMethod(User)

    const results = []
    User
      .stream()
      .on('data', (data) => {
        results.push(data)
      })
      .on('error', e => {
        throw e
      })
      .on('end', () => {
        expect(results).toHaveLength(0)
        done()
      })
  })

  it('calls findAll() 2 times', (done) => {
    const User = instance.define('user', columns)
    const data = [
      [{ name: 'Francisco' }, { name: 'Rodolfo' }]
    ]
    const mockFindAll = jest.fn()
    User.findAll = async () => {
      mockFindAll()
      return data.shift() || []
    }
    setMethod(User)

    const results = []
    User
      .stream()
      .on('data', (data) => {
        results.push(data)
      })
      .on('error', e => {
        throw e
      })
      .on('end', () => {
        expect(results).toHaveLength(2)
        expect(mockFindAll).toHaveBeenCalledTimes(2)
        done()
      })
  })

  it('calls findAll() with custom query', (done) => {
    const User = instance.define('user', columns)
    const data = [
      [{ name: 'Francisco' }, { name: 'Rodolfo' }]
    ]
    const mockFindAll = jest.fn()
    const query = {
      where: {
        nome: {
          [Op.eq]: 'Francisco'
        }
      }
    }
    let calledWhere
    User.findAll = async ({ where }) => {
      mockFindAll()
      calledWhere = where
      return data.shift() || []
    }
    setMethod(User)

    const results = []
    User
      .stream(query)
      .on('data', (data) => {
        results.push(data)
      })
      .on('error', e => {
        throw e
      })
      .on('end', () => {
        expect(results).toHaveLength(2)
        expect(mockFindAll).toHaveBeenCalledTimes(2)
        expect(calledWhere).toMatchObject(query.where)
        done()
      })
  })

  it('do not use custom offset', (done) => {
    const User = instance.define('user', columns)
    const data = [
      [{ name: 'Francisco' }, { name: 'Rodolfo' }]
    ]
    const mockFindAll = jest.fn()
    const query = {
      offset: 5
    }
    let receivedOffset
    User.findAll = async ({ offset }) => {
      mockFindAll()
      receivedOffset = offset
      return data.shift() || []
    }
    setMethod(User)

    const results = []
    User
      .stream(query)
      .on('data', (data) => {
        results.push(data)
      })
      .on('error', e => {
        throw e
      })
      .on('end', () => {
        expect(results).toHaveLength(2)
        expect(mockFindAll).toHaveBeenCalledTimes(2)
        expect(receivedOffset).toBe(0)
        done()
      })
  })

  it('calls findAll() with custom limit', (done) => {
    const User = instance.define('user', columns)
    const data = [
      [{ name: 'Francisco' }, { name: 'Rodolfo' }]
    ]
    const mockFindAll = jest.fn()
    const query = {
      limit: 50
    }
    let receivedLimit
    User.findAll = async ({ limit }) => {
      mockFindAll()
      receivedLimit = limit
      return data.shift() || []
    }
    setMethod(User)

    const results = []
    User
      .stream(query)
      .on('data', (data) => {
        results.push(data)
      })
      .on('error', e => {
        throw e
      })
      .on('end', () => {
        expect(results).toHaveLength(2)
        expect(mockFindAll).toHaveBeenCalledTimes(2)
        expect(receivedLimit).toBe(50)
        done()
      })
  })
})
