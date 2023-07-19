const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const courseCtrl = require('../controllers/course')
const isAuth = require('../middleware/isAuth')

router.get('/', courseCtrl.fetch)
router.put('/', isAuth, isAdmin, courseCtrl.add)
router.post('/', isAuth, isAdmin, courseCtrl.upd)
router.delete('/', isAuth, isAdmin, courseCtrl.del)

module.exports = router