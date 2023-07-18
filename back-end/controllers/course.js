const express = require('express')
const router = express.Router()
const commonDao = require('../dao/common')
const formidable = require('formidable')
const {course} = require('../schemas/schemas.js') 
const {writeFile, isBuffer} = require('../utils/fileUtils')
const {controlFields, isObjectEmpty} = require('../utils/utils')
const log = console.log
const fs = require('fs')


router.fetch = (req, res) => {
    commonDao.fetch(res, course)
}

router.add = (req, res) => {   
    log("Add Course")

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

        var saveCourse = () => {
            let controlledFields = controlFields(fields)
            controlledFields.file_name = fileName
            
            commonDao.save(res, course, "course", controlledFields)
        }
        
        let fileName = ''
        if(!isObjectEmpty(files)){
            const file = files.file
            const {newFilename, filepath} = file
            fileName = `${Date.now()}-${newFilename}.png`
            const tempFile = fs.readFileSync(filepath)
            
            if(!isBuffer(tempFile)) return res.status(500).end()
            
            writeFile(fileName, "public/pictures/courses", tempFile, saveCourse, () => res.status(500).end())
        }
    })
} 

router.upd =  (req, res) => {    
    const {_id} = req.body
    if(!req.body.course || !_id) return res.status(400).json()

    course.updateOne({_id: _id}, req.body.course) 
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
    
    course.deleteOne({_id: req.body._id}) 
    .then(() => {
        log('course ' + req.body._id + ' deleted')
        res.status(201).json()
    })
    .catch(error => {
        log(error)
        res.status(400).json()
    })
} 

module.exports = router