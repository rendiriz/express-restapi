const response = require('@helper/response')
const newsCategoryModel = require('@model/NewsCategoryModel')

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
  const name = body.name
  const title = (body.name) ? randomNumber + '-' + body.name.replace(/\s+/g, '-').toLowerCase() : undefined;
  const desc = body.desc
  const is_active = body.is_active
  const modified_at = moment().format('YYYY-MM-DD HH:mm:ss')

  const update = {
    id_news_category: p_uniq,
    name,
    title,
    desc,
    is_active,
    modified_at
  }

  const qUpdate = await newsCategoryModel
    .query()
    .alias('nws_ctg')
    .first()
    .returning('*')
    .upsertGraph(update)

  return qUpdate
}

module.exports = {
  update,
  getUpdate
}
