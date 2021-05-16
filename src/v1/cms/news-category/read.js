const response = require('@helper/response')
const newsCategoryModel = require('@model/NewsCategoryModel')

const _ = require('lodash')
const moment = require('moment')

const read = async (req, res) => {
  try {
    const qRead = await getRead(req)

    Promise.all([qRead])
      .then(async (responses) => {
        const data = responses[0]

        if (_.isEmpty(data) === false) {
          return response.ok(data, 'Retrieve data successfully.', res)
        } else {
          return response.errorNotFound('Data not found.', res)
        }
      })
  } catch (err) {
    return response.errorHandler(err, res)
  }
}

async function getRead (req) {
  const p_uniq = req.params.uniq

  const qRead = await newsCategoryModel
    .query()
    .alias('nws_ctg')
    .first()
    .returning('*')
    .where('nws_ctg.is_active', true)
    .findById(p_uniq)

  return qRead
}

module.exports = {
  read,
  getRead
}
