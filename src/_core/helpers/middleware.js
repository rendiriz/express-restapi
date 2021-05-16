const jwt = require('jsonwebtoken')
const _ = require('lodash')

const checkToken = (req, res, next) => {
  if (_.isNil(req.headers.authorization)) {
    res.status(403).json({
      code: 403,
      error: true,
      message: 'Token missing',
      data: {}
    })
  }

  let token = req.headers.authorization
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          code: 403,
          error: true,
          message: 'Token invalid',
          data: {}
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.status(403).json({
      code: 403,
      error: true,
      message: 'Auth token is not supplied',
      data: {}
    })
  }
}

module.exports = {
  checkToken
}
