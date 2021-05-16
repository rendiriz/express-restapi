const express = require('express')

const auth = require('./auth/AuthRoute')

const router = express.Router()

router.use('/auth', auth)

module.exports = router
