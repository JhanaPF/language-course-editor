const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const updates = [{
    user_id: {type: mongoose.Schema.ObjectId}, 
    date: {type: Date},
}]  

const fileUrl = {type: String}
const mongoId = {type: mongoose.Schema.ObjectId}
const uniqueMongoId = {type: mongoose.Schema.ObjectId, unique: true}
const uniqueRequiredString = {type: String, required: true, unique: true}
const pictureSchema = fileUrl
const stringSchema = {type: String}
const fileSchema = mongoose.Schema({ 
    description: {type: String},
    url: fileUrl,
})

const courseSchema = mongoose.Schema({ 
    description: {type: String},
    name: {type: String, required: true, unique: true},
    dictionary_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to dictionaries
    // Les drapeaux sont stockés dans la collection dictionnaire 
})

const pictureChoice = [{
    picture_id: mongoId, 
    url: fileUrl,
}] 

const textChoice =  {type: [Array]}

module.exports = {
    updates,
    fileUrl,
    mongoId,
    uniqueMongoId,
    uniqueRequiredString,
    pictureSchema,
    stringSchema,
    fileSchema,
    courseSchema,
    pictureChoice,
    textChoice
}