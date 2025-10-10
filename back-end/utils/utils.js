const sanitizeHtml = require('sanitize-html');

/**
 * @param {*} object 
 * @returns object with lowercased strings
 */
const controlFields = (object) => {
	let controlledFields = {};  
	Object.keys(object).forEach(field=>{ // Lowercase string object
		if(typeof object[field] === 'string') {
			controlledFields[field] = sanitizeHtml(object[field]).toLowerCase();		
		}
		else controlledFields[field] = object[field];
	}); 
	return controlledFields;
};


/**
 * @param {*} object 
 */
const isObjectEmpty = (object) => {
	return Object.keys(object).length === 0 && object.constructor === Object;
};

const getDictionaryList = () => {
	//require("dotenv").config()
	return process.env.DICTIONARIES.split(', ');
};

module.exports={controlFields, isObjectEmpty, getDictionaryList};