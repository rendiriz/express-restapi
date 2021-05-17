
exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('news_tag', function (t) {
    t.uuid('id_news_tag').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    t.uuid('id_news').notNullable()
    t.string('name').notNullable()
    t.text('title')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('news_tag')
};
