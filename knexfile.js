require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'migrations'
    },
    seeds: {
      directory: './seeds/dev'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'migrations'
    },
    seeds: {
      directory: './seeds/prod'
    }
  }
}
