const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth')
const wordValidator = require('../middleware/wordValidator')

const fetchCtrl = require('../controllers/fetch')
const saveCtrl = require('../controllers/save')

const multer = require('multer')
var path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cbk) {
        cbk(null, 'uploads/')
    },
    filename: function (req, file, cbk) {
        cbk(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const checkFileType = (req, file, cbk) => {
    // Vérifie que le fichier est un MP3
    if (file.mimetype === 'audio/mp3') {
        cbk(null, true);
    } else {
        cbk(new Error('Le fichier doit être un MP3'), false);
    }
  }
  

const upload = multer({ 
    dest: 'uploads/', 
    storage,   
    fileFilter: (req, file, cbk) => {
        checkFileType(req, file, cbk);
    }   
})

router.get('/dictionnary', fetchCtrl.fetchOneDictionnary)
router.get('/word/_id/:_id', fetchCtrl.fetchOneWord) 

router.put('/word', auth, isAdmin, wordValidator, upload.single('audio-file'), saveCtrl.addWord)
router.post('/word', auth, isAdmin, wordValidator, saveCtrl.updateWord)
router.delete('/word', auth, isAdmin, saveCtrl.deleteWord)

module.exports = router