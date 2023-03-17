const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {dictionnary} = require('../schemas/schemas.js') 

router.fetch =  (req, res) => {   

    const dictionnaries = dictionnary.find({})
    res.status(200).json({dictionnaries})
}

router.add =  (req, res) => {   
    
} 

router.upd =  (req, res) => {    

} 

router.del =  (req, res) => {    

} 
