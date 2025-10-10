const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const commonDao = require('../dao/common');
const {lesson} = require('../schemas/schemas.js'); 
const {controlFields} = require('../utils/utils');
const log = console.log;
const { ObjectId } = require('mongodb');

// ========================
// ======= LESSONS ========
// ========================

router.fetch = (req, res) => {   
	let param = {};
	const {course_id} = req.query;
	if(course_id){
		param = {course_id: new ObjectId(course_id)};
		commonDao.fetch(res, lesson, param);
	} else {
		log('Course id missing to fetch lessons');
		return res.status(500).end();
	}
};

router.add = (req, res) => {   
	log('Add lesson');

	const data = req.body;
	if(!data) return res.status(400).json();

	const form = formidable({ multiples: true });
	form.parse(req, function (err, fields, files) { 
		if (err) {
			log('Error parsing form: ', err);
			return res.status(500).end();
		}

		let controlledFields = controlFields(fields);
		log(fields);
		commonDao.save(res, lesson, 'lesson', controlledFields);
	});
}; 

router.upd =  (req, res) => {    

}; 

router.del =  (req, res) => {    

}; 

module.exports = router;