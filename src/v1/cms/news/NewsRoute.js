const express = require('express')

const total = require('@v1/cms/news/total')
const list = require('@v1/cms/news/list')
const create = require('@v1/cms/news/create')
const read = require('@v1/cms/news/read')
const update = require('@v1/cms/news/update')

const router = express.Router()

router.get('/total', total.total)
router.get('/', list.list)
router.post('/', create.create)
router.get('/:uniq', read.read)
router.put('/:uniq', update.update)

module.exports = router
