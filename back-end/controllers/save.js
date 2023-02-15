const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { wordValidation, wordAdditionalDataValidation } = require('../validators/validators.js')
const {wordSchema, additionalDataSchema} = require('../schemas.js') // Importation des schémas pour envoyer des objets vers les collections de MongoDb
const fs = require('fs');
const schemas = require('../schemas')

const isValid = (word, additionalData) => {

    const validateWord = wordValidation.validate(word)
    const validateAdditionalData = wordAdditionalDataValidation.validate(additionalData)
    
    if(!validateWord.error && !validateAdditionalData.error) {
        return true
    }

    if(validateWord.error || validateAdditionalData.error) { 
        console.log(validateWord.error && validateWord.error, validateAdditionalData.error && validateAdditionalData.error) 
        return false 
    }
}

const isIdValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id) 
}

router.addWord = (req, res) => {
    console.log("Adding word ", req.file)
    const {collection} = req.body
    if(!collection) return res.status(400).json({})
    if(!isValid(req.body.word, req.body.additionalData)) return res.status(500).json({})

    const wordModel = mongoose.model(collection, wordSchema, collection)
    const additionalDataModel = mongoose.model(collection + "_additional_data" + additionalDataSchema)

    const newWord = new wordModel({
        ...req.body.word,
    })

    let newAdditionalData = new additionalDataModel({
        ...req.body.additionalData,
    })

    newWord.save() 
    .then((result) => {
        console.log(result)
        newAdditionalData.word_id = result._id
        newAdditionalData.save()
    })
    .then(() => {
        console.log(req.body.word.word + ' saved')
        res.status(201).json({})
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({})
    })
}

router.updateWord = (req, res) => {
    console.log('update word')
    const {collection} = req.body
    if(!collection || !isIdValid(req.body.word_id)) return res.status(400).json({})
    if(!isValid(req.body.word, req.body.additionalData)) return res.status(500).json({})

    console.log("Updating word", req.body.word_id)  
    schema[collection].updateOne({_id: req.body.word_id}, req.body.word) 
    .then(() => schema[collection+'_additionals'].updateOne({word_id: req.body.word_id}, req.body.additionalData))
    .then(() => {
        console.log(req.body.word + ' updated')
        res.status(201)
    })
    .catch(error => {
        console.log(error)
        res.status(400)
    })
}

router.deleteWord = (req, res) => {
    
    const {collection} = req.body
    if(!collection) return res.status(400).json({})
    const word_id = req.body.word_id
    const isValid = mongoose.Types.ObjectId.isValid(word_id)
    if(!isValid) return res.status(400).json({})

    console.log("Deleting word " + word_id)

    schemas[collection].deleteOne({_id: word_id}) 
    .then(  schemas[collection+'_additionals'].deleteOne({_id: word_id})  )
    .then((result) => {
        const successMsg = "Word " + word_id + "deleted "
        console.log(successMsg, result)
        res.status(201)
    })
    .catch(error => {
        const errorMsg = "Failed to delete "
        console.log(errorMsg, error)
        res.status(400)
    })
}

module.exports = router