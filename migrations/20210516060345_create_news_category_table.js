
exports.up = function(knex) {
  return knex.schema.createTable('news_category', function (t) {
    t.uuid('id_news_category').primary()
    t.string('name').notNullable()
    t.text('title')
    t.text('desc')
    t.boolean('is_active').notNullable().defaultTo(true)
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('modified_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('news_category')
};
