
exports.up = function(knex) {
  return knex.schema.createTable('news', function (t) {
    t.uuid('id_news').primary()
    t.uuid('id_news_category').notNullable()
    t.string('name').notNullable()
    t.text('title')
    t.text('content')
    t.text('desc')
    t.boolean('is_active').notNullable().defaultTo(true)
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('modified_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('news')
};
