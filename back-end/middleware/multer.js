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

const uploadAudio = multer({ 
    dest: 'uploads/audio/', 
    storage,   
    fileFilter: (req, file, cbk) => {
        checkFileType(req, file, cbk);
    }   
})

module.exports = {uploadAudio}