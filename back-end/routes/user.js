const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

router.post('/token', userCtrl.token)
router.post('/signup', userCtrl.signup)
router.post('/signin', userCtrl.signin)

module.exports = router