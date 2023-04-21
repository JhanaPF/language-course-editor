const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const commonDao = require('../dao/common')
const {lesson} = require('../schemas/schemas.js') 
const {controlFields} = require('../utils/utils')
const log = console.log

// ========================
// ======= LESSONS ========
// ========================

router.fetchLessonList = (req, res) => {     
    commonDao.fetch(res, lesson, "lessons", (r)=>{return res.status(200).json(r)}, ()=>{return res.status(500).end()})
}

router.getLessonQuestions = (req, res) => { // Get all questions included in lesson
    let pipeline = [
        {}
    ]
    lesson.aggregate(pipeline, function(err, result){

    })
}

router.add = (req, res) => {   
    log("Add lesson")

    const data = req.body
    if(!data) return res.status(400).json()
    
    const form = formidable({ multiples: true })
    form.parse(req, function (err, fields, files) { 
        if (err) {
            log("Error parsing form: ", err)
            return res.status(500).end()
        }
        
        let controlledFields = controlFields(fields)

        commonDao.save(res, course, "dictionnary", controlledFields)
    })
} 

router.upd =  (req, res) => {    

} 

router.del =  (req, res) => {    

} 

module.exports = router