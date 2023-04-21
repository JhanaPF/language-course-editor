const express = require('express')
const router = express.Router()

const isAdmin = require('../middleware/isAdmin')
const wordValidator = require('../middleware/wordValidator')
const fetchCtrl = require('../controllers/fetch')
const wordCtrl = require('../controllers/word')
const dicoCtrl = require('../controllers/dictionary')

router.get('/dictionary', fetchCtrl.fetchOneDictionary)
router.get('/word/_id/:_id', fetchCtrl.fetchOneWord) 

router.put('/word', isAdmin, wordValidator, wordCtrl.addWord)
router.post('/word', isAdmin, wordValidator, wordCtrl.updateWord)
router.delete('/word', isAdmin, wordCtrl.deleteWord)

const dicoUrl = '/dictionary'
router.get("/", isAdmin, dicoCtrl.fetch)
router.put(dicoUrl, isAdmin, dicoCtrl.add)
router.post(dicoUrl, isAdmin, dicoCtrl.upd)
router.delete(dicoUrl, isAdmin, dicoCtrl.del)

module.exports = router