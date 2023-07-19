const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')
const lessonCtrl = require('../controllers/lesson')

router.get('/', lessonCtrl.fetch)
router.put('/', isAuth, isAdmin, lessonCtrl.add)
router.post('/', isAuth, isAdmin, lessonCtrl.upd)
router.delete('/', isAuth, isAdmin, lessonCtrl.del)

module.exports = router