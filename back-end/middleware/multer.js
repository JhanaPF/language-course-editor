const multer = require('multer')
var path = require('path')

// Multer is not used anymore. Using Formidable and Fs for file processing 

// ========================
// ===  Configurations  ===
// ========================

const storage = multer.diskStorage({
    destination: function (req, file, cbk) {
        cbk(null, 'uploads/')
    },
    filename: function (req, file, cbk) {
        cbk(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const checkFileType = (file, type, cbk) => {
    if (file.mimetype === type) 
        cbk(null, true)
    else
        cbk(new Error('File format error'), false)
}  

// =====================
// ===  Middlewares  ===
// ===================== 

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
        checkFileType(file, 'png/jpg', cbk);
    }   
})

module.exports = {uploadAudio, uploadPicture}