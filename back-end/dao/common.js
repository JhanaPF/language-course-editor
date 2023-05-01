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

const resultHandler = (res, objName, successCbk, errorCbk, err, result) => {
    if(err) {
        log(err)
        if(errorCbk) return errorCbk()
        else return res.status(400).end()
    }
    else {
        if(successCbk) return successCbk(result)
        else return res.status(200).json({[objName]: result})
    }
}


/**
 * 
 * @param {*} res http response 
 * @param {Model} model 
 * @param {object} param filters
 * @param {Function} successCbk 
 * @param {Function} errorCbk 
 * @returns {object} {[model] + 's': result}
 */
const fetch = (res, model, param = {}, successCbk, errorCbk) => {
    if(!model){
        log("Model missing to fetch in collection")
        return res.status(500).end()
    }
    
    model.find(param, function(err, result){
        resultHandler(res, [model] + 's', (data)=>successCbk(data), errorCbk, err, result)
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
        resultHandler(res, successCbk, errorCbk, err, result, objName)
    })
}

/**
 * 
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName for console log
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