const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const commonDao = require('../dao/common')
const {question} = require('../schemas/schemas.js') 
const {controlFields} = require('../utils/utils')
const log = console.log

// ========================
// ======= QUESTIONS ========
// ========================

router.fetch = (req, res) => {   
    commonDao.fetch(res, question, {lesson_id: req.query.lesson}, (r)=>{return res.status(200).json(r)}, ()=>{return res.status(500).end()})
}

router.add = (req, res) => {   
    log("Add question")

    const data = req.body
    if(!data) return res.status(400).json()

    const form = formidable({ multiples: true })
    form.parse(req, function (err, fields, files) { 
        if (err) {
            log("Error parsing form: ", err)
            return res.status(500).end()
        }

        let controlledFields = controlFields(fields)
        log(fields)
        commonDao.save(res, question, "question", controlledFields)
    })
} 

router.upd =  (req, res) => {    

} 

router.del =  (req, res) => {    

} 

module.exports = router