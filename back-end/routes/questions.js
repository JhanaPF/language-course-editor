const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const questionCtrl = require('../controllers/question')

router.get('/', questionCtrl.fetch)
router.put('/', isAdmin, questionCtrl.add)
router.post('/', isAdmin, questionCtrl.upd)
router.delete('/', isAdmin, questionCtrl.del)

module.exports = router