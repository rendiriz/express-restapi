require('dotenv').config()
const knex = require('knex')
const knexfile = require('@root/knexfile')

const env = process.env.NODE_ENV || 'development'
const db = knex(knexfile[env])

module.exports = {
  knex,
  db
}
