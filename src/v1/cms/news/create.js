const response = require('@helper/response')
const newsModel = require('@model/NewsModel')

const _ = require('lodash')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');

const create = async (req, res) => {
  try {
    const qInsert = await getCreate(req)

    Promise.all([qInsert])
      .then(async (responses) => {
        const data = responses[0]
        return response.ok(data, 'Successfully added data.', res)
      })
  } catch (err) {
    return response.errorHandler(err, res)
  }
}

async function getCreate (req) {
  const from = req.query.from

  let body
  if (!_.isNil(from)) {
    body = req.body
  } else if (from === 'api-development') {
    const json = JSON.parse(JSON.stringify(req.body))
    body = JSON.parse(json.body)
  }

  const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10

  const id_news = uuidv4()
  const id_news_category = body.id_news_category
  const name = body.name
  const title = randomNumber + '-' + body.name.replace(/\s+/g, '-').toLowerCase()
  const content = body.content
  const desc = body.desc

  const insert = {
    id_news,
    id_news_category,
    name,
    title,
    content,
    desc
  }
  
  if (body.tag) {
		const tag = []
		_.map(body.tag, res => {
			tag.push({
				name: res,
				title: res.replace(/\s+/g, '-').toLowerCase()
			})
		})
    _.set(insert, 'news_tag', tag)
  }

  const qInsert = await newsModel
    .query()
    .withGraphFetched('news_category')
    .withGraphFetched('news_tag')
    .alias('nws')
    .first()
    .returning('*')
    .insertGraph(insert)

  return qInsert
}

module.exports = {
  create,
  getCreate
}
