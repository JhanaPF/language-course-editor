const express = require('express')
const router = express.Router()

const isAdmin = require('../middleware/isAdmin')
const wordValidator = require('../middleware/wordValidator')
const fetchCtrl = require('../controllers/fetch')
const wordCtrl = require('../controllers/word')
const dicoCtrl = require('../controllers/dictionary')
const {uploadAudio, uploadPicture} = require('../middleware/multer')


router.get('/dictionary', fetchCtrl.fetchOneDictionary)
router.get('/word/_id/:_id', fetchCtrl.fetchOneWord) 

router.put('/word', isAdmin, wordValidator, uploadAudio.single('audio-file'), wordCtrl.addWord)
router.post('/word', isAdmin, wordValidator, wordCtrl.updateWord)
router.delete('/word', isAdmin, wordCtrl.deleteWord)

const dicoUrl = '/dictionary'
router.put(dicoUrl, isAdmin, uploadPicture.single('file'), dicoCtrl.add)
router.post(dicoUrl, isAdmin, uploadPicture.single('flag'), dicoCtrl.upd)
router.delete(dicoUrl, isAdmin, dicoCtrl.del)

module.exports = router