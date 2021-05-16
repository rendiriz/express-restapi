# Express REST API
## Setup Database
Create `knexfile.js`

```
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
}
```
## Migrations
Create table user
```
knex migrate:make create_user_table
```
```
exports.up = function(knex) {
  return knex.schema.createTable('user', function (t) {
    t.uuid('id_user').primary()
    t.string('username').notNullable()
    t.text('password')
    t.boolean('is_active').notNullable().defaultTo(true)
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('modified_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
```

Commit
```
knex migrate:latest
```

Rollback
```
knex migrate:rollback
```

## Seeds
Create seed user
```
knex seed:make 001_user
```
```
const { v4: uuidv4 } = require('uuid');
const MD5 = require('crypto-js/md5');

exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {
          id_user: uuidv4(),
          username: 'superadmin',
          password: MD5('superadmin').toString()
        },
        {
          id_user: uuidv4(),
          username: 'admin',
          password: MD5('admin').toString()
        }
      ]);
    });
};
```
    
