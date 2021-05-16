const { Model } = require('objection')
const { db } = require('@config/connection')

Model.knex(db)

class UserModel extends Model {
  static get tableName () {
    return 'user'
  }

  static get idColumn () {
    return 'id_user'
  }

  static modifiers = {
    loginSelects(query) {
      query.select(
        'id_user',
        'username',
      );
    }
  }
}

module.exports = UserModel
