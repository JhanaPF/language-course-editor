const { ObjectId } = require("mongodb")
const { Model } = require("mongoose")
const { dictionary } = require("../schemas/schemas")
const log = console.log


const successCbk = (res, msg, data) => {
    log(msg + " success", data)
    res.status(201).json({data})
}

const errorCbk = (res, msg, error) => {
    log(msg + " failure", error)
    res.status(400).json()
}


/**
 * 
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName 
 * @returns 
 */
const fetch = (res, model, objName) => {
    if(!model) return res.status(500).json()

    model.find({}, function(err, result){
        if(err) return res.status(400).json()
        else return res.status(200).json({[objName]: result})
    })
}

/**
 * 
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName objName of the object fetched
 * @param {ObjectId} idKey 
 * @param {ObjectId} id 
 * @returns {objName: result}
 */
const fetchById = (res, model, objName, idKey, id) => {
    if(!model || !objName || !idKey || !id) return res.status(500).json()

    model.find({[idKey]: id}, function(err, result){
        if(err) return res.status(400).json()
        else return res.status(200).json({[objName]: result})
    })
}

/**
 * 
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName 
 * @param {object} data 
 * @returns 
 */
const save = (res, model, objName, data) => {       
    const newData = new model({...data})
    const msg = objName + ' saved'

    newData.save() 
    .then(() => successCbk(res, msg, dictionary))
    .catch(error => errorCbk(res, error))
} 

/**
 * 
 * @param {*} res http response
 * @param {Model} model 
 * @param {string} objName 
 * @param {object} data 
 * @param {ObjectId} id 
 * @returns 
 */
const update = (res, model, objName, data, id) => {    
    if(!model || !id  || !data) return res.status(400).json()

    const msg = objName + ' updated'

    model.updateOne({_id: id}, data) 
    .then((result) => successCbk(res, msg, {[objName]:result}))
    .catch(error => errorCbk(res, error))
}

/**
 * 
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName 
 * @param {ObjectId} id 
 * @returns 
 */
const del = (res, model, objName, id) => {    
    if(!id || !model) return res.status(400).json()
    const msg = objName + ' deleted'

    model.deleteOne({_id: id}) 
    .then(() => successCbk(res, msg))
    .catch(error => errorCbk(res, error))
} 


module.exports = {fetch, fetchById, save, update, del}