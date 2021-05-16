const response = require('@helper/response')
const newsCategoryModel = require('@model/NewsCategoryModel')

const pagination = require('@helper/pagination')
const { getTotal } = require('@v1/cms/news-category/total')

const _ = require('lodash')
const moment = require('moment')

const list = async (req, res) => {
  try {
    const start = req.query.start
    const limit = req.query.limit
    const isPagination = !((_.isNil(start) && _.isNil(limit)))

    const qList = await getList(req)
    const query = [qList]

    if (isPagination) {
      const qTotal = await getTotal(req)
      query.push(qTotal)
    }

    Promise.all(query)
      .then(async (responses) => {
        const data = responses[0]

        let paging = {}
        if (isPagination) {
          const total = responses[1].count
          paging = pagination(total, start, limit)
        }

        if (data.length > 0) {
          return response.okList(data, paging, 'Retrieve data successfully.', res)
        } else {
          return response.errorNotFound('Data not found.', res)
        }
      })
  } catch (err) {
    return response.errorHandler(err, res)
  }
}

async function getList (req) {
  const start = req.query.start
  const limit = req.query.limit
  const sort = req.query.sort
  const query = req.query.search

  const fStart = (f) => {
    if (_.isNil(start) === false) {
      f.offset(start)
    }
  }

  const fLimit = (f) => {
    if (_.isNil(limit) === false) {
      f.limit(limit)
    }
  }

  const fSort = (f) => {
    if (_.isNil(sort) === false) {
      const s = sort.split(':')
      f.orderBy(`nws_ctg.${s[0]}`, s[1])
    } else {
      f.orderBy('nws_ctg.modified_at', 'desc')
    }
  }

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('nws_ctg.name', 'ilike', '%' + query + '%')
    }
  }

  const qList = await newsCategoryModel
    .query()
    .alias('nws_ctg')
    .where('nws_ctg.is_active', true)
    .modify(fStart)
    .modify(fLimit)
    .modify(fSort)
    .modify(fQuery)

  return qList
}

module.exports = {
  list,
  getList
}
