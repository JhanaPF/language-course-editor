const Joi = require('joi')

const optionalString = Joi.string().optional().allow(null)

const wordValidation = Joi.object({
    word: Joi.string()
        .max(100)
        .required(),
    class: Joi.number().optional().allow(null),
    definition: optionalString,
    translated_definition: optionalString,
    level: optionalString,
    categories: Joi.array().items(Joi.number().integer()).optional().allow(null),
    source: Joi.number().optional().allow(null),
    phonetic: optionalString,
    checked: Joi.boolean().optional().allow(null),
})

const wordAdditionalDataValidation = Joi.object({
    sentence: optionalString,
    sentence_vocal: optionalString,
    riddle: optionalString,
    translated_riddle: optionalString,
    story: optionalString,
    vocal: optionalString,
})

const userValidation = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).required(),
    repeat_password: Joi.ref('password'),
    mail: Joi.string().email({ minDomainSegments: 1 }).required()
})

module.exports = {userValidation, wordValidation, wordAdditionalDataValidation}