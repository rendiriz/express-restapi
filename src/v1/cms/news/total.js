const response = require('@helper/response')
const newsModel = require('@model/NewsModel')

const _ = require('lodash')
const moment = require('moment')

const total = async (req, res) => {
  try {
    const qTotal = await getTotal(req)

    if (qTotal.count > 0) {
      return response.ok(qTotal, 'Retrieve data successfully.', res)
    } else {
      return response.errorNotFound('Data not found.', res)
    }
  } catch (err) {
    return response.errorHandler(err, res)
  }
}

async function getTotal (req) {
  const query = req.query.search

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('nws.name', 'ilike', '%' + query + '%')
    }
  }

  const qTotal = await newsModel
    .query()
    .alias('nws')
    .first()
    .count('nws.id_news as count')
    .where('nws.is_active', true)
    .modify(fQuery)

  return qTotal
}

module.exports = {
  total,
  getTotal
}
