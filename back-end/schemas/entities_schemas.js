const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

export const updates = [{
    user_id: {type: mongoose.Schema.ObjectId}, 
    date: {type: Date},
}]  

export const fileUrl = {type: String}
export const mongoId = {type: mongoose.Schema.ObjectId}
export const uniqueMongoId = {type: mongoose.Schema.ObjectId, unique: true}
export const uniqueRequiredString = {type: String, required: true, unique: true}
export const pictureSchema = fileUrl
export const stringSchema = {type: String}
export const fileSchema = mongoose.Schema({ 
    description: {type: String},
    url: entities_schemas.fileUrl,
})

export const courseSchema = mongoose.Schema({ 
    description: {type: String},
    name: {type: String, required: true, unique: true},
    dictionnary_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to dictionaries
    // Les drapeaux sont stockés dans la collection dictionnaire 
})

export const pictureChoice = [{
    picture_id: mongoId, 
    url: fileUrl,
}] 

export const textChoice =  {type: [Array]}

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