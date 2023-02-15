
module.exports = (req, res, next) => {

    const word = req.body.word
    const additionalData = req.body.additionalData
    if(!word || !additionalData) res.status(400)
    
    const validateWord = wordValidation.validate(word)
    const validateAdditionalData = wordAdditionalDataValidation.validate(additionalData)
    
    if(!validateWord.error && !validateAdditionalData.error) {
        next()
    }

    if(validateWord.error || validateAdditionalData.error) { 
        console.log(validateWord.error && validateWord.error, validateAdditionalData.error && validateAdditionalData.error) 
        return res.status(500)
    }
}