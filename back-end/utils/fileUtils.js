const log = console.log
const fs = require('fs')

/**
 * 
 * @param {res} res 
 * @param {string} fileName 
 * @param {string} filePath 
 * @param {Buffer} tempFile 
 */
const writeFile = (res, fileName, filePath, tempFile) => {
    fs.writeFile(`./${filePath}/${fileName}`, tempFile, (err) => {
        if (err) {
            log("Error writing file on system: ", err)
            return res.status(500).end()
        }

        // Fichier enregistré avec succès
        log("File " + fileName + " saved with success")
    })
}

/**
 * 
 * @param {*} res 
 * @param {*} filePath 
 * @param {*} successCbk 
 * @param {*} errorCbk 
 */
const getFile = (res, filePath, successCbk, errorCbk) => {
    fs.readFile(`./${filePath}`, (err, file) => {
        if (err) {
            log("Error reading file on system: ", err)
            if(errorCbk) return errorCbk()
            else return res.status(500).json()
        }

        if(successCbk) return successCbk(file)
    })
}

const isBuffer = (file) => {
    if (!Buffer.isBuffer(file)) {
        log("File is not buffer")
        return false
    } else return true
}

module.exports = {writeFile, isBuffer, getFile}