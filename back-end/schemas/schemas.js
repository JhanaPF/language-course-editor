const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//require('dotenv').config()

const updates = [{
    user_id: {type: mongoose.Schema.ObjectId}, 
    date: {type: Date},
}]  

const fileUrl = {type: String}
const mongoId = {type: mongoose.Schema.ObjectId}
const uniqueMongoId = {type: mongoose.Schema.ObjectId, unique: true}

const courseSchema = mongoose.Schema({ 
    description: {type: String},
    name: {type: String, required: true, unique: true},
    dictionnary_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to dictionaries
    // Les drapeaux sont stockés dans la collection dictionnaire 
})

const pictureChoice = [{
    picture_id: mongoId, 
    url: fileUrl,
}] 


const textChoice =  {
    type: [Array]
}


const lessonSchema = mongoose.Schema({
        // Une photo
        // Une phrase/ un mot
        // Un enregistrement audio
        // Enregistrer la phrase sous forme d'array
        
        // La réponse:
        // Une traduction
        // Choix de quatre phrases/mots
        // Choix de quatre images
        // Un champs pour le type de réponse
        // L'index du mot à sélectionner pour les phrases à compléter

        // langage, ex french_to_french
        // Index de la question dans la leçon

    answerIndex: {type: Number, min: 0, max: 100},
    course_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to dictionaries
    picture: fileUrl,
    sentence: {type: Array},
    sentence_audio: fileUrl, // Il devrait y avoir plusieurs enregistrements
    translation: {type: Array},
    pictureChoice,
    textChoice,
    answerIndex: {type: Number, min: 0, max: 100},
    answerType: {type: String, enum: ["translation", "pictureChoice", "textChoice", ""]},
})

const fileSchema = mongoose.Schema({ 
    description: {type: String},
    url: fileUrl,
})

const audioRecordingSchema = fileSchema // Des enregistrements audio des collections word, additionals et lesson
const pictureSchema = fileSchema // Des images de la collection lesson

const dictionnarySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    language: {type: String},
    pivot_tongue: {type: String},
    flag_url: url, 
    released: {type: Boolean},
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
    vocal_url: fileUrl, 
    updates,
})

const additionalDataSchema = mongoose.Schema({
    word_id: {type: mongoose.Schema.ObjectId, unique: true}, // Relation to word schema
    sentence: {type: String}, // Sentence in context. Phrase en contexte
    sentence_vocal_url: fileUrl, 
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