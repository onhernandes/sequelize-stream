# sequelize-model-stream

Stream dada from your DB using Sequelize!

## Install

```sh
npm install sequelize-model-stream
```

## Usage

First, you've to initialize, passing your Sequelize's instance, so all defined models will have `.stream()` method:

```
const Sequelize = require('sequelize')
const SequelizeStream = require('sequelize-model-stream')
const instance = new Sequelize({ dialect: 'mysql' })

const User = instance.define('user', { name: Sequelize.STRING })
SequelizeStream(instance)

User
  .stream()
  .on('data', data => console.log(data))
  .on('error', console.log)
  .on('end', () => console.log('end!'))
```

...or simply pass your model:

```
const Sequelize = require('sequelize')
const SequelizeStream = require('sequelize-model-stream')
const instance = new Sequelize({ dialect: 'mysql' })

const User = instance.define('user', { name: Sequelize.STRING })
const Account = instance.define('account', { title: Sequelize.STRING })
SequelizeStream(User)

console.log(Account.stream) // undefined

User
  .stream()
  .on('data', data => console.log(data))
  .on('error', console.log)
  .on('end', () => console.log('end!'))
```

### Filtering, etc and etc

`stream()` is simply a workaround for `Model.findAll()`, so you can filter and do everything you would do using directly `Model.findAll()`

```
const Sequelize = require('sequelize')
const SequelizeStream = require('sequelize-model-stream')
const instance = new Sequelize({ dialect: 'mysql' })

const User = instance.define('user', { name: Sequelize.STRING })
SequelizeStream(instance)

User
  .stream({ where: { name: 'Rodolfo' } })
  .on('data', data => console.log(data))
  .on('error', console.log)
  .on('end', () => console.log('end!'))
```

### Limit batch size

Since `stream()` is simply a workaround for `Model.findAll()`, the default limit is 100. If you want to fetch more or less for each call, just set `{ limit: 5 }`

```
const Sequelize = require('sequelize')
const SequelizeStream = require('sequelize-model-stream')
const instance = new Sequelize({ dialect: 'mysql' })

const User = instance.define('user', { name: Sequelize.STRING })
SequelizeStream(instance)

User
  .stream({ limit: 5 })
  .on('data', data => console.log(data))
  .on('error', console.log)
  .on('end', () => console.log('end!'))
```

And yes, you cannot set `offset`, it's set/calculated internally
