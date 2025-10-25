const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const commonDao = require('../dao/common');
const {question} = require('../schemas/schemas.js'); 
const {controlFields} = require('../utils/utils');
const log = console.log;

// ========================
// ======= QUESTIONS ========
// ========================

router.fetch = (req, res) => {   
	let param = {};
	const {lesson_id} = req.query;
	if(lesson_id){
		param = {lesson_id: new ObjectId(lesson_id)};
		commonDao.fetch(res, lesson, param);
	} else {
		log('Lesson id missing to fetch questions');
		return res.status(500).end();
	}
};

router.add = (req, res) => {   
    
	const data = req.body;
	log('Add question !', data);
	if(!data) return res.status(400).json({message: 'No data'});
    

	const form = formidable({ multiples: true });
	form.parse(req, function (err, fields, files) { 
		if (err) {
			log('Error parsing form: ', err);
			return res.status(500).end();
		}

		Object.keys(fields).forEach(field => {
			if(field === 'sentence' || field === 'translation'){ 
				fields[field] = JSON.parse(fields[field]);
			}
		});
		let controlledFields = controlFields(fields);
        
		log(fields);
        
		commonDao.save(res, question, 'question', controlledFields);
	});
}; 

router.upd =  (req, res) => {    

}; 

router.del =  (req, res) => {    

}; 

module.exports = router;