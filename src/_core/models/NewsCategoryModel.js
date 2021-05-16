const { Model } = require('objection')
const { db } = require('@config/connection')

const newsModel = require('./NewsModel')

Model.knex(db)

class NewsCategoryModel extends Model {
  static get tableName () {
    return 'news_category'
  }

  static get idColumn () {
    return 'id_news_category'
  }

  static relationMappings = {
    news: {
      relation: Model.HasManyRelation,
      modelClass: newsModel,
      join: {
        from: 'news_category.id_news_category',
        to: 'news.id_news_category'
      }
    }
  }
}

module.exports = NewsCategoryModel
