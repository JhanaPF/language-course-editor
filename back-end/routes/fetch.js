const express = require('express')
const router = express.Router()
const fetchCtrl = require('../controllers/fetch')

router.get('/dictionnary', fetchCtrl.fetchOneDictionnary)
router.get('/word/_id/:_id', fetchCtrl.fetchOneWord) 

module.exports = router