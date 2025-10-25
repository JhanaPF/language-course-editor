const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { wordValidation, wordAdditionalDataValidation } = require('../validators/validators.js');
const {wordSchema, additionalDataSchema} = require('../schemas/schemas.js'); 
// const fs = require('fs'); // Crud files on disk
const schemas = require('../schemas/schemas');
const {isIdValid} = require('../utils/utils');
const log = console.log;


const isValid = (word, additionalData) => {

	const validateWord = wordValidation.validate(word);
	const validateAdditionalData = wordAdditionalDataValidation.validate(additionalData);
    
	if(!validateWord.error && !validateAdditionalData.error) {
		return true;
	}

	if(validateWord.error || validateAdditionalData.error) { 
		log(validateWord.error && validateWord.error, validateAdditionalData.error && validateAdditionalData.error); 
		return false; 
	}
};

router.fetch = (req, res) => {   
	const isValid = isIdValid(req.params._id); 
	if(!isValid) return res.status(400).json({message: 'Invalid id'});
    
	log('Fetching word');
	const {collection} = req.body;
	schemas[collection].aggregate([
		{
			$match: {_id: mongoose.Types.ObjectId(req.params._id)} 
		},
		{   
			$lookup:{
				from: collection + '_additionals',
				localField: '_id',
				foreignField: 'word_id',
				as: 'additionalData'
			},
		},
		{   $unwind: '$additionalData'  }
	])
		.then(word => res.status(200).json({message: word[0]}))
		.catch(error => res.status(400).json({ error }));
}; 

router.addWord = (req, res) => {
	log('Adding word ', req.file);

	const {collection} = req.body;
	if(!collection) return res.status(400).json({});
	if(!isValid(req.body.word, req.body.additionalData)) return res.status(500).json({});

	const wordModel = mongoose.model(collection, wordSchema, collection);
	const additionalDataModel = mongoose.model(collection + '_additional_data' + additionalDataSchema);

	const newWord = new wordModel({
		...req.body.word,
	});

	let newAdditionalData = new additionalDataModel({
		...req.body.additionalData,
	});

	newWord.save() 
		.then((result) => {
			log(result);
			newAdditionalData.word_id = result._id;
			newAdditionalData.save();
		})
		.then(() => {
			log(req.body.word.word + ' saved');
			res.status(201).json({});
		})
		.catch(error => {
			log(error);
			res.status(400).json({});
		});
};

router.updateWord = (req, res) => {
	const {collection} = req.body;
	if(!collection || !isIdValid(req.body.word_id)) return res.status(400).json({});
	if(!isValid(req.body.word, req.body.additionalData)) return res.status(500).json({});

	log('Updating word', req.body.word_id);  
	schemas[collection].updateOne({_id: req.body.word_id}, req.body.word) 
		.then(() => schema[collection+'_additionals'].updateOne({word_id: req.body.word_id}, req.body.additionalData))
		.then(() => {
			log(req.body.word + ' updated');
			res.status(201);
		})
		.catch(error => {
			log(error);
			res.status(400);
		});
};

router.deleteWord = (req, res) => {
    
	const {collection} = req.body;
	if(!collection) return res.status(400).json({});
	const word_id = req.body.word_id;
	const isValid = mongoose.Types.ObjectId.isValid(word_id);
	if(!isValid) return res.status(400).json({});

	log('Deleting word ' + word_id);

	schemas[collection].deleteOne({_id: word_id}) 
		.then(  schemas[collection+'_additionals'].deleteOne({_id: word_id})  )
		.then((result) => {
			const successMsg = 'Word ' + word_id + 'deleted ';
			log(successMsg, result);
			res.status(201);
		})
		.catch(error => {
			const errorMsg = 'Failed to delete ';
			log(errorMsg, error);
			res.status(400);
		});
};

module.exports = router;