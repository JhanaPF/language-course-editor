const { ObjectId } = require('mongodb');
const { Model } = require('mongoose');
const log = console.log;


const successCbk = (res, msg, data, statusCode = 200) => {
	log(msg + ' success', data);
	res.status(statusCode).json(data);
};

const errorCbk = (res, msg, error) => {
	log(msg + ' failure', error);
	res.status(400).json();
};


/**
 * @param {*} res http response 
 * @param {Model} model 
 * @param {object} param filters for mongoose query - optional
 * @returns {object} {[model] + 's': result}
 */
const fetch = (res, model, param = {}) => {
	if(!model){
		log('Model missing to fetch in collection');
		return res.status(500).end();
	}

	const objName = model.modelName.toLowerCase() + 's';
    
	model.find(param)
		.then((result) => successCbk(res, objName + ' fetch', {[objName]: result}))
		.catch(error => errorCbk(res, error));
};

/**
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName objName of the object fetched
 * @param {ObjectId} idKey 
 * @param {ObjectId} id 
 * @returns {objName: result}
 */
const fetchById = (res, model, objName, idKey, id) => {
	if(!model || !objName || !idKey || !id) return res.status(500).json();

	model.find({[idKey]: id})
		.then((result) => successCbk(res, msg, {[objName]:result}))
		.catch(error => errorCbk(res, error));
};

/**
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName for console log
 * @param {object} data 
 * @returns 
 */
const save = (res, model, objName, data) => {
	const newData = new model({...data});
	const msg = objName + ' saved';

	newData.save() 
		.then((result) => successCbk(res, msg, {[objName]:result}), 201)
		.catch(error => errorCbk(res, error));
}; 

/**
 * @param {*} res http response
 * @param {Model} model 
 * @param {string} objName 
 * @param {object} data 
 * @param {ObjectId} id 
 * @returns 
 */
const update = (res, model, objName, data, id) => {    
	if(!model || !id  || !data) return res.status(400).json();

	const msg = objName + ' updated';

	model.updateOne({_id: id}, data) 
		.then((result) => successCbk(res, msg, {[objName]:result}))
		.catch(error => errorCbk(res, error));
};

/**
 * @param {*} res http response 
 * @param {Model} model 
 * @param {string} objName 
 * @param {ObjectId} id 
 * @returns 
 */
const del = (res, model, objName, id) => {    
	if(!id || !model) return res.status(400).json();
	const msg = objName + ' deleted';

	model.deleteOne({_id: id}) 
		.then(() => successCbk(res, msg))
		.catch(error => errorCbk(res, error));
}; 


module.exports = {fetch, fetchById, save, update, del};