const express = require('express')
const router = express.Router()
const saveCtrl = require('../controllers/save')
const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth')

router.put('/word', auth, isAdmin, saveCtrl.addWord)
router.post('/word', auth, isAdmin, saveCtrl.updateWord)
router.delete('/word', auth, isAdmin, saveCtrl.deleteWord)

module.exports = router