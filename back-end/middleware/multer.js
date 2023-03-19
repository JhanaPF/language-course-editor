const multer = require('multer')
var path = require('path')

// ---
//  ---  Configurations  ---

const storage = multer.diskStorage({
    destination: function (req, file, cbk) {
        cbk(null, 'uploads/')
    },
    filename: function (req, file, cbk) {
        cbk(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const checkFileType = (req, file, type, cbk) => {
    // Vérifie que le fichier est un MP3
    if (file.mimetype === 'audio/wav') {
        cbk(null, true);
    } else {
        cbk(new Error('File format error'), false);
    }
}  

// ---
// ---  Middlewares  ---

const uploadAudio = multer({ 
    dest: 'uploads/audios/', 
    storage,   
    fileFilter: (req, file, cbk) => {
        checkFileType(req, file, 'audio/wav', cbk);
    }   
})

const uploadPicture = multer({ 
    dest: 'uploads/pictures/', 
    storage,   
    fileFilter: (req, file, cbk) => {
        checkFileType(req, file, 'image/*', cbk);
    }   
})

module.exports = {uploadAudio, uploadPicture}