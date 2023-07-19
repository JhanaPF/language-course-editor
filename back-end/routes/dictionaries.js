const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')

const wordValidator = require('../middleware/wordValidator')
const wordCtrl = require('../controllers/word')
const dicoCtrl = require('../controllers/dictionary')
const dictionaryEndpoint = '/dictionary'
const wordEndpoint = '/word'

router.get('/dictionary', dicoCtrl.fetchOneDictionary)
router.get('/word/_id/:_id', dicoCtrl.fetchOneWord) 

router.put(wordEndpoint, isAuth, isAdmin, wordValidator, wordCtrl.addWord)
router.post(wordEndpoint, isAuth, isAdmin, wordValidator, wordCtrl.updateWord)
router.delete(wordEndpoint, isAuth, isAdmin, wordCtrl.deleteWord)

router.get("/", dicoCtrl.fetch)
router.put(dictionaryEndpoint, isAuth, isAdmin, dicoCtrl.add)
router.post(dictionaryEndpoint, isAuth, isAdmin, dicoCtrl.upd)
router.delete(dictionaryEndpoint, isAuth, isAdmin, dicoCtrl.del)

module.exports = router