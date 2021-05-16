const express = require('express')

const total = require('@v1/cms/news-category/total')
const list = require('@v1/cms/news-category/list')
const create = require('@v1/cms/news-category/create')
const read = require('@v1/cms/news-category/read')
const update = require('@v1/cms/news-category/update')

const router = express.Router()

router.get('/total', total.total)
router.get('/', list.list)
router.post('/', create.create)
router.get('/:uniq', read.read)
router.put('/:uniq', update.update)

module.exports = router
