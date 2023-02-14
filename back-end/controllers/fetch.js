const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {french_from_french} = require('../schemas.js') 

router.fetchOneWord =  (req, res) => {   
    
    const isValid = mongoose.Types.ObjectId.isValid(req.params._id) 
    if(!isValid) return res.status(400).json({})
  
    
    french_from_french.aggregate([
        {   $match: {_id: mongoose.Types.ObjectId(req.params._id)}  },
        {   
            $lookup:{
                from: 'french_from_french_additionals',
                localField: '_id',
                foreignField: 'word_id',
                as: 'additionalData'
            },
        },
        {   $unwind: '$additionalData'  }
    ])
    .then(word => res.status(200).json({message: word[0]}))
    .catch(error => res.status(400).json({ error }))

} 

router.fetchOneDictionnary =  (req, res) => {    

    french_from_french.find()
    .then(dic => res.status(200).json({message: dic}))
    .catch(error => res.status(400).json({error}))
} 

module.exports = router