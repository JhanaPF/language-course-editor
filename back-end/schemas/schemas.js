const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()
//import * as entities_schemas from './entities_schemas'
const entities_schemas = require('./entities_schemas')

const uniqueRequiredString = entities_schemas.uniqueRequiredString
const dictionnarySchema = mongoose.Schema({ // Carry informations about available dictionnaries and courses created
    name: uniqueRequiredString,
    language: uniqueRequiredString,
    raw_name: uniqueRequiredString, // spanish_from_french for example to link with the dictionnary word collection
    pivot_tongue: uniqueRequiredString,
    flag_url: entities_schemas.fileUrl, 
    released: {type: Boolean, default: false},
})
const dictionnary = mongoose.model('Dictionnary', dictionnarySchema) 

const lessonSchema = mongoose.Schema({

    dictionnary_id: entities_schemas.mongoId,

    name: String,
    description: String,
    picture: entities_schemas.fileUrl,
})
const lesson = mongoose.model('Lesson', lessonSchema) 

const questionSchema = mongoose.Schema({
    // Enregistrer la phrase sous forme d'array

    lesson_id: entities_schemas.mongoId,
    dictionnary_id: entities_schemas.mongoId,// ex spanish_from_french
    answerIndex: {type: Number, min: 0, max: 100},
    course_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to dictionaries
    picture: entities_schemas.fileUrl,
    sentence: {type: [String]}, // Can be a single word
    sentence_audio: entities_schemas.fileUrl, // Il devrait y avoir plusieurs enregistrements
    translation: {type: Array},
    pictureChoice: entities_schemas.pictureChoice,
    textChoice,
    answerIndex: {type: Number, min: 0, max: 100},
    //answerType: {type: String, enum: ["translation", "pictureChoice", "textChoice", ""]},
})
const question = mongoose.model('Question', questionSchema) 

const wordSchema = mongoose.Schema({
    word : {type: String, required: true, unique: true}, 
    class : {type: Number}, // noun, verb, adjective, etc
    definition : {type: String}, 
    // Pivot tongue
    translated_definition : {type: String}, // Definition in pivot tongue
    level: {type: String}, // Current, familiar, sustained
    categories: [Number], 
    source: {type: Number}, // If word comes from external source
    phonetic: {type: String},
    vocal_url: entities_schemas.fileUrl, 
    updates: entities_schemas.updates,
})

const additionalDataSchema = mongoose.Schema({
    word_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to word schema
    sentence: {type: String}, // Sentence in context. Phrase en contexte
    sentence_vocal_url: entities_schemas.fileUrl, 
    riddle: {type: String}, 
    translated_riddle: {type: String}, 
    story: {type: String}, // Anecdotes
    updates: entities_schemas.updates,
})

// Schema for dahsboard's users
const userSchema = mongoose.Schema({
    name : {type: String},
    mail : {type: String, required: true, unique: true},
    password : {type: String},
    role:{type: String, enum: ['guest', 'admin', 'superAdmin', 'player']}, // SuperAdmin, Admin, Joueur, etc...
    dialects: {type: Array}, // Langue dans lesquelles le joueur a joué
})

userSchema.plugin(uniqueValidator)
wordSchema.plugin(uniqueValidator)
dictionnarySchema.plugin(uniqueValidator)

// Define list of dialects with this syntax "languageToLearn_from_pivotTongue" to generate all the models and collections for each dictionnary
const languages = process.env.DICTIONARIES.split(", ")
let dictionnaryModels = {} // ex language_from_pivotlanguage and language_from_pivotlanguage_additional
for (const language of languages) { // Dynamic generation of Mongo models
    dictionnaryModels[language] = mongoose.model(language, wordSchema, language) // 3rd parameter define name of collection
    
    const languageSentences = language + "_additional"
    collectionName = languageSentences.charAt(0).toUpperCase() + languageSentences.slice(1) 
    dictionnaryModels[languageSentences] = mongoose.model(languageSentences, additionalDataSchema)
}

const user = mongoose.model('User', userSchema) 

module.exports = {...dictionnaryModels, user, wordSchema, additionalDataSchema, question, lesson, dictionnary}