const router = require('express').Router()
const formidable = require('formidable')
const fs = require('fs')
const {dictionary} = require('../schemas/schemas.js') 
const commonDao = require('../dao/common')
const {writeFile, isBuffer} = require('../utils/fileUtils')
const {controlFields, isObjectEmpty} = require('../utils/utils')
const log = console.log

const mongoose = require('mongoose')
const schemas = require('../schemas/schemas.js')

router.fetchOneWord = (req, res) => {
    const { dictionary_name } = req.body
    if (!dictionary_name) return res.status(400).json()
    const isValid = mongoose.Types.ObjectId.isValid(req.params._id)
    if (!isValid) return res.status(400).json({})

    schemas[dictionary_name].aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params._id) } },
        {
            $lookup: {
                from: dictionary_name + '_additionals',
                localField: '_id',
                foreignField: 'word_id',
                as: 'additionalData'
            },
        },
        { $unwind: '$additionalData' }
    ])
        .then(word => res.status(200).json({ message: word[0] }))
        .catch(error => res.status(400).json({ error }))
}

router.fetchOneDictionary = (req, res) => {
    const { dictionary_name } = req.body
    if (!dictionary_name) return res.status(400).json()

    schemas[dictionary_name].find()
        .then(dic => res.status(200).json({ message: dic }))
        .catch(error => res.status(400).json({ error }))
}


router.fetch = (req, res) => {
    commonDao.fetch(res, dictionary, {}, (r)=>{return res.status(200).json(r)}, ()=>{return res.status(500).end()})
}

router.add = (req, res) => {   
    log("Add dictionary")

    const data = req.body
    if(!data) return res.status(400).json()
    
    const form = formidable({ multiples: true })
    form.parse(req, function (err, fields, files) { 
        if (err) {
            log("Error parsing form: ", err)
            return res.status(500).end()
        }
        if(!fields) return res.status(400).end()
        
        // Scan and analyse file then write the file on system 
        // Check if raw_name already exists in database 
        // Check mimetype and size

        var saveDictionary = () => {
            let controlledFields = controlFields(fields)
            controlledFields.file_name = fileName
            
            commonDao.save(res, dictionary, "dictionnary", controlledFields)
        }
        
        let fileName = ''
        if(!isObjectEmpty(files)){
            const file = files.file
            const {newFilename, filepath} = file
            fileName = `${Date.now()}-${newFilename}.png`
            const tempFile = fs.readFileSync(filepath)
            
            if(!isBuffer(tempFile)) return res.status(500).end()
            
            writeFile(fileName, "public/pictures/courses", tempFile, saveDictionary, () => res.status(500).end())
        }
    })
} 

router.upd =  (req, res) => {    
    const {dictionary, _id} = req.body
    if(!dictionary || !_id) return res.status(400).json()

    dictionary.updateOne({_id: _id}, req.body.dictionary) 
    .then(() => {
        log(_id + ' updated')
        res.status(201).json()
    })
    .catch(error => {
        log(error)
        res.status(400).json()
    })
} 

router.del = (req, res) => {    
    const _id = req.body._id
    if(!_id) return res.status(400).json()
    
    dictionary.deleteOne({_id: req.body._id}) 
    .then(() => {
        log('dictionary ' + req.body._id + ' deleted')
        res.status(201).json()
    })
    .catch(error => {
        log(error)
        res.status(400).json()
    })
} 


module.exports = router