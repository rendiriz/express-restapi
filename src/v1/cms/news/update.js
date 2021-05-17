const response = require('@helper/response')
const newsModel = require('@model/NewsModel')

const _ = require('lodash')
const moment = require('moment')

const update = async (req, res) => {
  try {
    const qUpdate = await getUpdate(req)

    Promise.all([qUpdate])
      .then(async (responses) => {
        const data = responses[0]
        return response.ok(data, 'Successfully changed data.', res)
      })
  } catch (err) {
    return response.errorHandler(err, res)
  }
}

async function getUpdate (req) {
  const from = req.query.from

  let body
  if (!_.isNil(from)) {
    body = req.body
  } else if (from === 'api-development') {
    const json = JSON.parse(JSON.stringify(req.body))
    body = JSON.parse(json.body)
  }

  const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10

  const p_uniq = req.params.uniq
  const id_news_category = body.id_news_category
  const name = body.name
  const title = (body.name) ? randomNumber + '-' + body.name.replace(/\s+/g, '-').toLowerCase() : undefined;
  const content = body.content
  const desc = body.desc
  const is_active = body.is_active
  const modified_at = moment().format('YYYY-MM-DD HH:mm:ss')

  const update = {
    id_news: p_uniq,
    id_news_category,
    name,
    title,
    content,
    desc,
    is_active,
    modified_at
  }

  if (body.tag) {
		const tag = []
		_.map(body.tag, res => {
      if (!isNaN(res)) {
        tag.push({
          id_news_tag: Number(res)
        })
      } else {
        tag.push({
          name: res,
          title: res.replace(/\s+/g, '-').toLowerCase()
        })
      }
		})
    _.set(update, 'news_tag', tag)
  }

  const qUpdate = await newsModel
    .query()
    .withGraphFetched('news_category')
    .withGraphFetched('news_tag')
    .alias('nws')
    .first()
    .returning('*')
    .upsertGraph(update)

  return qUpdate
}

module.exports = {
  update,
  getUpdate
}
