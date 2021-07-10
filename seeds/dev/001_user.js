const { v4: uuidv4 } = require('uuid')
const MD5 = require('crypto-js/md5')

exports.seed = function (knex) {
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
      ])
    })
}
