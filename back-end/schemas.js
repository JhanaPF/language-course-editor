const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//require('dotenv').config()

const updates = [{
    user_id: {type: mongoose.Schema.ObjectId}, 
    date: {type: Date},
}]  

const dictionnarySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    language: {type: String},
    pivot_tongue: {type: String},
    flag_url: {type: String}, // url
})

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
    vocal_url: {type: String}, // Url 
    updates,
})

const additionalDataSchema = mongoose.Schema({
    word_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to word schema
    sentence: {type: String}, // Sentence in context. Phrase en contexte
    sentence_vocal_url: {type: String}, // Url
    riddle: {type: String}, 
    translated_riddle: {type: String}, 
    story: {type: String}, // Anecdotes
    updates,
})

// Schema for both players and dahsboard's users
const userSchema = mongoose.Schema({
    name : {type: String},
    mail : {type: String, required: true, unique: true},
    password : {type: String},
    role:{type: String, enum: ['guest, admin, superAdmin', 'player']}, // SuperAdmin, Admin, Joueur, etc...
    dialects: {type: Array}, // Langue dans lesquelles le joueur a joué
})

userSchema.plugin(uniqueValidator)
wordSchema.plugin(uniqueValidator)
dictionnarySchema.plugin(uniqueValidator)


// Define list of dialects with this syntax "languageToLearn_from_pivotTongue" to generate all the models and collections for each dictionnary
const languages = process.env.DICTIONARIES.split(", ")
let models = {}
for (const language of languages) { // Dynamic generation of Mongo models
    models[language] = mongoose.model(language, wordSchema, language) // 3rd parameter define name of collection
    
    const languageSentences = language + "additional"
    collectionName = languageSentences.charAt(0).toUpperCase() + languageSentences.slice(1) 
    models[languageSentences] = mongoose.model(languageSentences, additionalDataSchema)
}

const user = mongoose.model('User', userSchema) 

module.exports = {...models, user, wordSchema, additionalDataSchema}