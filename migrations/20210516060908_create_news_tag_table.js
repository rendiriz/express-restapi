
exports.up = function(knex) {
  return knex.schema.createTable('news_tag', function (t) {
    t.uuid('id_news_tag').primary()
    t.uuid('id_news').notNullable()
    t.string('name').notNullable()
    t.text('title')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('news_tag')
};
