const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {dictionnary} = require('../schemas/schemas.js') 

router.fetch =  (req, res) => {   

}

router.add =  (req, res) => {   
    console.log(req)
} 

router.upd =  (req, res) => {    

} 

router.del =  (req, res) => {    

} 

module.exports = router