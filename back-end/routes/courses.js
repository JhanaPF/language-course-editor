const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const courseCtrl = require('../controllers/course')

router.get('/courses', courseCtrl.fetch)
router.put('/course', isAdmin, courseCtrl.add)
router.post('/course', isAdmin, courseCtrl.upd)
router.delete('/course', isAdmin, courseCtrl.del)

module.exports = router