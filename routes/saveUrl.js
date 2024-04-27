const express = require('express')
const router = express.Router()

const { shorten } = require('../controllers/saveUrl')

router.post(
    '/shorten',
    shorten
)

module.exports = router