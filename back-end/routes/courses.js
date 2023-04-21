const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const courseCtrl = require('../controllers/course')

router.get('/', courseCtrl.fetch)
router.put('/course', courseCtrl.add)
router.post('/course', courseCtrl.upd)
router.delete('/course', courseCtrl.del)

module.exports = router