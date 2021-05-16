const response = require('@helper/response')
const newsCategoryModel = require('@model/NewsCategoryModel')

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

  const id_news_category = uuidv4()
  const name = body.name
  const title = randomNumber + '-' + body.name.replace(/\s+/g, '-').toLowerCase()
  const desc = body.desc

  const insert = {
    id_news_category,
    name,
    title,
    desc
	}

  const qInsert = await newsCategoryModel
    .query()
    .alias('nws_ctg')
    .first()
    .returning('*')
    .insertGraph(insert)

  return qInsert
}

module.exports = {
  create,
  getCreate
}
