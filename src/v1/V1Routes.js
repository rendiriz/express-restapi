const express = require('express')

const auth = require('./auth/AuthRoute')
const cms = require('./cms/CmsRoute')

const router = express.Router()

router.use('/auth', auth)
router.use('/cms', cms)

module.exports = router
