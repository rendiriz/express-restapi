const { v4: uuidv4 } = require('uuid')

exports.seed = function (knex) {
  return knex('news_category').del()
    .then(function () {
      return knex('news_category').insert([
        {
          id_news_category: uuidv4(),
          name: 'Category 1',
          title: 'category-1',
          desc: 'Desc Category 1',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 2',
          title: 'category-2',
          desc: 'Desc Category 2',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 3',
          title: 'category-3',
          desc: 'Desc Category 3',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 4',
          title: 'category-4',
          desc: 'Desc Category 4',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 5',
          title: 'category-5',
          desc: 'Desc Category 5',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 6',
          title: 'category-6',
          desc: 'Desc Category 6',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 7',
          title: 'category-7',
          desc: 'Desc Category 7',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 8',
          title: 'category-8',
          desc: 'Desc Category 8',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 9',
          title: 'category-9',
          desc: 'Desc Category 9',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 10',
          title: 'category-10',
          desc: 'Desc Category 10',
          is_active: true
        },
        {
          id_news_category: uuidv4(),
          name: 'Category 11',
          title: 'category-11',
          desc: 'Desc Category 11',
          is_active: true
        }
      ])
    })
}
