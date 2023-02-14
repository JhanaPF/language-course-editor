const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth')
const fetchCtrl = require('../controllers/fetch')
const saveCtrl = require('../controllers/save')

router.get('/dictionnary', fetchCtrl.fetchOneDictionnary)
router.get('/word/_id/:_id', fetchCtrl.fetchOneWord) 

router.put('/word', auth, isAdmin, saveCtrl.addWord)
router.post('/word', auth, isAdmin, saveCtrl.updateWord)
router.delete('/word', auth, isAdmin, saveCtrl.deleteWord)

module.exports = router