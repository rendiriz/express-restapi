const express = require('express')

const login = require('./login')

const router = express.Router()

router.post('/login', login.login)

module.exports = router
