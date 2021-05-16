const response = require('@helper/response')
const newsCategoryModel = require('@model/NewsCategoryModel')

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
      f.where('nws_ctg.name', 'ilike', '%' + query + '%')
    }
  }

  const qTotal = await newsCategoryModel
    .query()
    .alias('nws_ctg')
    .first()
    .count('nws_ctg.id_news_category as count')
    .where('nws_ctg.is_active', true)
    .modify(fQuery)

  return qTotal
}

module.exports = {
  total,
  getTotal
}
