const router = require('express').Router()
const formidable = require('formidable')
const fs = require('fs')
const {dictionary} = require('../schemas/schemas.js') 
const commonDao = require('../dao/common')
const { object } = require('joi')
const log = console.log

router.fetch = (req, res) => {   
    dictionary.find({}, function(err, dictionnaries){
        if(err) return res.status(400).json()
        else return res.status(200).json({dictionnaries})
    })
}

router.add = (req, res) => {   
    console.log("Add dictionary")

    const data = req.body
    if(!data) return res.status(400).json()
    
    const form = formidable({ multiples: true })
    form.parse(req, function (err, fields, files) { 
        if (err) {
            log("Error parsing form: ", err)
            return res.status(500).json()
        }

        // Scan and analyse file then write the file on system 
        // Check if raw_name already exists in database 

        
        const file = files.file
        const {newFilename, filepath} = file
        const fileName = `${Date.now()}-${newFilename}`
        const tempFile = fs.readFileSync(filepath)
        
        if (!Buffer.isBuffer(tempFile)) {
            log("File is not buffer")
            return res.status(500).json()
        }
        
        let controlledFields = {}
        Object.keys(fields).forEach(field=>{ // Lowercase string fields
            if(typeof fields[field] === "string") controlledFields[field] = fields[field].toLowerCase()
            else controlledFields[field] = fields[field]
        }) 
        controlledFields.file_name = newFilename


        // Writing file and saving new document


        fs.writeFile(`./uploads/pictures/${fileName}`, tempFile, (err) => {
            if (err) {
                log("Error writing file on system: ", err)
                return res.status(500).json()
            }

            // Fichier enregistré avec succès
            log("File " + fileName + " saved with success")
        })
        
        commonDao.save(res, dictionary, "dictionnary", controlledFields)
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