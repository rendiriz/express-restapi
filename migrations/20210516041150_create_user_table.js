
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
