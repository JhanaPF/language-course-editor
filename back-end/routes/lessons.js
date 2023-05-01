const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const lessonCtrl = require('../controllers/lesson')

router.get('/', lessonCtrl.fetch)
router.put('/', isAdmin, lessonCtrl.add)
router.post('/', isAdmin, lessonCtrl.upd)
router.delete('/', isAdmin, lessonCtrl.del)

module.exports = router