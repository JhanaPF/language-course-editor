const express = require('express')
const router = express.Router()
const {lesson} = require('../schemas/schemas')
const commonDao = require('../dao/common')
const mongoose = require('mongoose')
const formidable = require('formidable')
const {course} = require('../schemas/schemas.js') 

router.fetch =  (req, res) => {  // All lessons of a course
    const {dictionary_id} = req.body 
    commonDao.fetch(res, course, "courses", "dictionary_id", dictionary_id)
}

router.add = (req, res) => {   
    const data = req.body.lesson
    if(!data) return res.status(400).json()
    
    const form = formidable({ multiples: true })
    form.parse(req, function (err, fields, files) { 
        if (err) {
            log("Error parsing form: ", err)
            return res.status(500).end()
        }

        // Scan and analyse file then write the file on system 
        // Check if raw_name already exists in database 

        
        const file = files.file
        const {newFilename, filepath} = file
        const fileName = `${Date.now()}-${newFilename}.png`
        const tempFile = fs.readFileSync(filepath)

        if(!isBuffer(tempFile)) return res.status(500).end()
        
        let controlledFields = {}
        Object.keys(fields).forEach(field=>{ // Lowercase string fields
            if(typeof fields[field] === "string") controlledFields[field] = fields[field].toLowerCase()
            else controlledFields[field] = fields[field]
        }) 
        controlledFields.file_name = fileName

        writeFile(res, fileName, "public/pictures/courses", tempFile)
        
        commonDao.save(res, course, "dictionnary", controlledFields)
    })
} 

router.upd =  (req, res) => {    
    const {dictionary, id, data} = req.body
    if(!dictionary || !_id) return res.status(400).json()

    commonDao.update(res, lesson, "lesson", data, id)
} 

router.del = (req, res) => {    
    const _id = req.body._id
    if(!_id) return res.status(400).json()

    commonDao.del(res, lesson, "lesson", _id)
} 


module.exports = router