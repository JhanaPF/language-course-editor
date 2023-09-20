const log = console.log
const fs = require("fs")

/**
 * @param {string} fileName 
 * @param {string} filePath 
 * @param {Buffer} tempFile 
 */
const writeFile = (fileName, filePath, tempFile, successCbk, errCbk) => {
	fs.writeFile(`./${filePath}/${fileName}`, tempFile, (err) => {
		if (err) {
			log("Error writing file on system: ", err)
			if(errCbk) return errCbk()
		}

		log("File " + fileName + " saved with success")
		if(successCbk) return successCbk()
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

/**
 * @description Check if it's a temporary zone to store a file
 * @param {*} file 
 */
const isBuffer = (file) => {
	if (!Buffer.isBuffer(file)) {
		log("File is not buffer") 
		return false
	} else return true
}

module.exports = {writeFile, isBuffer, getFile}