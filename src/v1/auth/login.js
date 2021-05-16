const response = require('@helper/response')
const userModel = require('@model/UserModel')

const _ = require('lodash')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const MD5 = require('crypto-js/md5')

const login = async (req, res) => {
  try {
    const qLogin = await getLogin(req)

    Promise.all([qLogin])
      .then(async (responses) => {
        const result = responses[0]
        const data = result[0]

        if (result.length > 0) {
          const token = await createToken(data)
          _.set(data, 'token', token)

          return response.ok(data, 'Login was successful.', res)
        } else {
          return response.errorNotFound('Login failed.', res)
        }
      })
  } catch (err) {
    return response.errorHandler(err, res)
  }
}

async function getLogin (req) {
  const username = req.body.username
  const password = req.body.password

  const qLogin = await userModel
    .query()
    .alias('usr')
    .modify('loginSelects')
    .where({
      'usr.is_active': true,
      'usr.username': username,
      'usr.password': MD5(password).toString()
    })

  return qLogin
}

async function createToken (data) {
  const bodyJWT = {
    id_user: data.id_user
  }

  const token = jwt.sign(bodyJWT, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: 86400
  })

  return token
}

module.exports = {
  login,
  getLogin
}