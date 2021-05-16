const express = require('express')

const newsCategory = require('./news-category/NewsCategoryRoute')
// const news = require('./news-category/NewsRoute')

const router = express.Router()

router.use('/news-category', newsCategory)
// router.use('/news', news)

module.exports = router
