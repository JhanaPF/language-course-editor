const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth')
const wordValidator = require('../middleware/wordValidator')

const fetchCtrl = require('../controllers/fetch')
const saveCtrl = require('../controllers/save')

router.get('/dictionnary', fetchCtrl.fetchOneDictionnary)
router.get('/word/_id/:_id', fetchCtrl.fetchOneWord) 

router.put('/course', auth, isAdmin, wordValidator, upload.single('audio-file'), saveCtrl.addWord)
router.post('/course', auth, isAdmin, wordValidator, saveCtrl.updateWord)
router.delete('/course', auth, isAdmin, saveCtrl.deleteWord)

module.exports = router