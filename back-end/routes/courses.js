const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const courseCtrl = require('../controllers/course')

router.get('/', courseCtrl.fetch)
router.put('/', isAdmin, courseCtrl.add)
router.post('/', isAdmin, courseCtrl.upd)
router.delete('/', isAdmin, courseCtrl.del)

module.exports = router