const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()
const entities_schemas = require('./entities_schemas')
const uniqueRequiredString = entities_schemas.uniqueRequiredString

const dictionarySchema = mongoose.Schema({ // Carry informations about available dictionaries and courses created to link both of them
    language: String,
    raw_name: uniqueRequiredString, // spanish_from_french for example to link with the dictionary word collection
    pivot_language: String,
    file_name: entities_schemas.fileUrl, 
    released: {type: Boolean, default: false}, // Is the dictionary accessible for public
    createdAt: entities_schemas.createdAtSchema,
})

const dictionary = mongoose.model('Dictionary', dictionarySchema) 

// --- Level creator schemas ---

const courseSchema = mongoose.Schema({
    language: String,
    pivot_language: String,
    raw_name: uniqueRequiredString, // spanish_from_french for example to link with the dictionary word collection
    dictionary: {type: Boolean, default: false}, // Has a dictionary 
    file_name: entities_schemas.fileUrl, 
    released: {type: Boolean, default: false}, // Is it accessible for public
    createdAt: entities_schemas.createdAtSchema,
})
const course = mongoose.model('Course', courseSchema) 


const lessonSchema = mongoose.Schema({
    dictionary_id: entities_schemas.mongoId,
    name: String,
    description: String,
    createdAt: entities_schemas.createdAtSchema,
})
const lesson = mongoose.model('Lesson', lessonSchema) 

const questionSchema = mongoose.Schema({
    lesson_id: entities_schemas.mongoId,
    dictionary_id: entities_schemas.mongoId,// Ex spanish_from_french
    course_id: entities_schemas.mongoId, // Relation to dictionaries
    question_index: {type: Number, min: 0, max: 100},
    picture: entities_schemas.fileUrl,
    sentence: {type: [String]}, // Can be a single word
    sentence_audio: entities_schemas.fileUrl, // Must have many recordings
    translation: {type: Array},
    picture_choice: entities_schemas.pictureChoice,
    text_choice: entities_schemas.textChoice,
    answer_index: {type: Number, min: 0, max: 100},
    // answerType: {type: String, enum: ["translation", "pictureChoice", "textChoice", ""]},
    createdAt: entities_schemas.createdAtSchema,
})
const question = mongoose.model('Question', questionSchema) 
// ------------

// dictionary word schemas: word and additional data
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
    createdAt: entities_schemas.createdAtSchema,
})

const additionalDataSchema = mongoose.Schema({
    word_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to word schema
    sentence: {type: String}, // Sentence in context. Phrase en contexte
    sentence_vocal_url: entities_schemas.fileUrl, 
    riddle: {type: String}, 
    translated_riddle: {type: String}, 
    story: {type: String}, // Anecdotes
    updates: entities_schemas.updates,
    createdAt: entities_schemas.createdAtSchema,
})
// ------


const userSchema = mongoose.Schema({ // User schema for dahsboard's users
    name : {type: String},
    mail : {type: String, required: true, unique: true},
    password : {type: String},
    role:{type: String, enum: ['guest', 'admin', 'superAdmin', 'player']}, // SuperAdmin, Admin, Joueur, etc...
    dialects: {type: Array}, // languages the user can crud
    createdAt: entities_schemas.createdAtSchema,
})

// Add unique validator plugin to all schemas
userSchema.plugin(uniqueValidator)
wordSchema.plugin(uniqueValidator)
dictionarySchema.plugin(uniqueValidator)
questionSchema.plugin(uniqueValidator)
lessonSchema.plugin(uniqueValidator)
dictionarySchema.plugin(uniqueValidator)
// ---

// Define list of dialects with this syntax "languageToLearn_from_pivotTongue" to generate all the models and collections for each dictionary
const languages = process.env.DICTIONARIES.split(", ")
let dictionaryModels = {} // ex language_from_pivotlanguage and language_from_pivotlanguage_additional
for (const language of languages) { // Dynamic generation of Mongo models
    dictionaryModels[language] = mongoose.model(language, wordSchema, language) // 3rd parameter define name of collection
    
    const languageSentences = language + "_additional"
    collectionName = languageSentences.charAt(0).toUpperCase() + languageSentences.slice(1) 
    dictionaryModels[languageSentences] = mongoose.model(languageSentences, additionalDataSchema)
}

const user = mongoose.model('User', userSchema) 

module.exports = {...dictionaryModels, user, wordSchema, additionalDataSchema, question, lesson, dictionary, course}