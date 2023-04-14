const router = require('express').Router()
const {dictionnary} = require('../schemas/schemas.js') 
const {isIdValid} = require('../utils/utils')

router.fetch = (req, res) => {   
    dictionnary.find({}, function(err, dictionnaries){
        if(err) return res.status(400)
        else return res.status(200).json({dictionnaries})
    })
}

router.add = (req, res) => {   
    const data = req.body.dictionnary
    if(!data) return res.status(400)
    
    const newDictionnary = new dictionnary({
        ...data
    })

    newDictionnary.save() 
    .then(() => {
        console.log('dictionnary saved ', dictionnary)
        res.status(201).json({})
    })
    .catch(error => {
        console.log(error)
        res.status(400)
    })
} 

router.upd =  (req, res) => {    
    const {dictionnary, _id} = req.body
    if(!dictionnary || _id) return res.status(400)
    if(!isIdValid(_id)) return res.status(400)

    dictionnary.updateOne({_id: _id}, req.body.dictionnary) 
    .then(() => {
        console.log(_id + ' updated')
        res.status(201)
    })
    .catch(error => {
        console.log(error)
        res.status(400)
    })
} 

router.del = (req, res) => {    
    const _id = req.body._id
    if(_id) return res.status(400)
    if(!isIdValid(_id)) return res.status(400)
    
    dictionnary.deleteOne({_id: req.body._id}) 
    .then(() => {
        console.log('dictionnary ' + req.body._id + ' deleted')
        res.status(201)
    })
    .catch(error => {
        console.log(error)
        res.status(400)
    })
} 


module.exports = router