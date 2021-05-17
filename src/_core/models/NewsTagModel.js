const { Model } = require('objection')
const { db } = require('@config/connection')

Model.knex(db)

class NewsTagModel extends Model {
  static get tableName () {
    return 'news_tag'
  }

  static get idColumn () {
    return 'id_news_tag'
  }

  static get relationMappings() {
    const newsModel = require('./NewsModel')
    
    return {
      news: {
        relation: Model.BelongsToOneRelation,
        modelClass: newsModel,
        join: {
          from: 'news_tag.id_news',
          to: 'news.id_news'
        }
      }
    }
  }
}

module.exports = NewsTagModel
