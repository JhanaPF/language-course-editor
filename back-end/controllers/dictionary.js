const router = require('express').Router()
const {dictionary} = require('../schemas/schemas.js') 
const log = console.log

router.fetch = (req, res) => {   
    dictionary.find({}, function(err, dictionnaries){
        if(err) return res.status(400).json()
        else return res.status(200).json({dictionnaries})
    })
}

router.add = (req, res) => {   
    console.log(11)
    console.log(req.body)
    const data = req.body.dictionary
    if(!data) return res.status(400).json()
    
    const newdictionary = new dictionary({...data})

    newdictionary.save() 
    .then(() => {
        log('dictionary saved ', dictionary)
        res.status(201).json({})
    })
    .catch(error => {
        log(error)
        res.status(400).json()
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