const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const wordValidator = require('../middleware/wordValidator')
const wordCtrl = require('../controllers/word')
const dicoCtrl = require('../controllers/dictionary')
const dictionaryEndpoint = '/dictionary'
const wordEndpoint = '/word'

router.get('/dictionary', dicoCtrl.fetchOneDictionary)
router.get('/word/_id/:_id', dicoCtrl.fetchOneWord) 

router.put(wordEndpoint, isAdmin, wordValidator, wordCtrl.addWord)
router.post(wordEndpoint, isAdmin, wordValidator, wordCtrl.updateWord)
router.delete(wordEndpoint, isAdmin, wordCtrl.deleteWord)

router.get("/", dicoCtrl.fetch)
router.put(dictionaryEndpoint, isAdmin, dicoCtrl.add)
router.post(dictionaryEndpoint, isAdmin, dicoCtrl.upd)
router.delete(dictionaryEndpoint, isAdmin, dicoCtrl.del)

module.exports = router