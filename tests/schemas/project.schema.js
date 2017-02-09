'use strict';

const joi = require('joi'),
	p_empty = ['', null];

   // "id": 39,
   //    "title": "Simply awesome.",
   //    "message": "Any more visuals you can share?",
   //    "creation_date": "2016-07-05T23:02:48.000Z",
   //    "like": [],
   //    "replies": [
   //      {
   //        "id": 50,
   //        "user_id": 1,
   //        "creation_date": "2016-07-05T23:14:10.000Z",
   //        "message": "Can't wait for the next steps ;)",
   //        "like": []
   //      },

const p_likes = joi.object().keys({
	user_id: joi.number().integer().required(),
	creation_date: joi.string().trim().allow(p_empty).required()	
});

const p_replies = joi.object().keys({
	id: joi.number().integer().required(),
	user_id: joi.number().integer().required(),
	creation_date: joi.string().trim().allow(p_empty).required(),
	message: joi.string().trim().allow(p_empty).required(),
	likes: joi.array().items(p_likes)	
});

const p_discussion = joi.object().keys({
	id: joi.number().integer().required(),
	title: joi.string().trim().allow(p_empty).required(),
	message: joi.string().trim().allow(p_empty).required(),
	creation_date: joi.string().trim().allow(p_empty).required(),
	likes: joi.array().items(p_likes),
	replies: joi.array().items(p_replies)
});

module.exports.discussions = joi.object().keys({
	discussions: joi.array().items(p_discussion)
});