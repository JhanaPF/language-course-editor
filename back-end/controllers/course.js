const express = require('express')
const router = express.Router()
const {lesson} = require('../schemas/schemas')
const commonDao = require('../dao/common')


router.fetch =  (req, res) => {  // All lessons of a course
    const {dictionary_id} = req.body 
    commonDao.fetchById(res, lesson, "lessons", "dictionary_id", dictionary_id)
}

router.add = (req, res) => {   
    const data = req.body.lesson
    if(!data) return res.status(400).json()
    
    commonDao.save(res, lesson, "lesson", data)
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