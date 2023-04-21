const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const commonDao = require('../dao/common')
const {lesson} = require('../schemas/schemas.js') 
const {controlFields} = require('../utils/utils')


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

router.addLesson = (req, res) => {   
    const data = req.body.lesson
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

router.updateLesson =  (req, res) => {    

} 

router.deleteLesson =  (req, res) => {    

} 

module.exports = router