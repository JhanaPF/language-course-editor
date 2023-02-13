/*
      Route pour sauvegarder, modifier et supprimer 
*/

const express = require('express')
const router = express.Router()
const saveCtrl = require('../controllers/save')
const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth')

router.post('/word', auth, isAdmin, saveCtrl.saveWord)
router.post('/word', auth, isAdmin, saveCtrl.updateWord)
router.delete('/word', auth, isAdmin, saveCtrl.deleteWord)

module.exports = router