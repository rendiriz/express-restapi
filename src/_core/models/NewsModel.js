const { Model } = require('objection')
const { db } = require('@config/connection')

Model.knex(db)

class NewsModel extends Model {
  static get tableName () {
    return 'news'
  }

  static get idColumn () {
    return 'id_news'
  }

  static get relationMappings() {
    const newsCategoryModel = require('./NewsCategoryModel')
    const newsTagModel = require('./NewsTagModel')
    
    return {
      news_category: {
        relation: Model.BelongsToOneRelation,
        modelClass: newsCategoryModel,
        join: {
          from: 'news.id_news_category',
          to: 'news_category.id_news_category'
        }
      },
      news_tag: {
        relation: Model.HasManyRelation,
        modelClass: newsTagModel,
        join: {
          from: 'news.id_news',
          to: 'news_tag.id_news'
        }
      }
    }
  }
}

module.exports = NewsModel
