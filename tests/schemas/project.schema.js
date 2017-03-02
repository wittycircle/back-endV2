'use strict';

const joi = require('joi'),
	p_empty = ['', null];

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

const p_openings = joi.object().keys({
	id: joi.number().integer().required(),
	created_at: joi.string().trim().required(),
	status: joi.string().trim().allow(p_empty).required(),
	description: joi.string().trim().allow(p_empty).required(),
	tags: joi.any().allow([(joi.string().trim().allow(p_empty), 
		joi.array().items(joi.string().trim().allow(p_empty)))])
});

 const member = joi.object().keys({
 	id: joi.number().integer().required(),
 	first_name: joi.string().trim().allow(p_empty).required(),
 	last_name: joi.string().trim().allow(p_empty).required(),
 	username: joi.string().trim().allow(p_empty).required(),
 });

const detail = joi.object().keys({
	id: joi.number().integer().required(),
	title: joi.string().trim().allow(p_empty).required(),
	picture: joi.string().trim().allow(p_empty).required(),
	description: joi.string().trim().allow(p_empty).required(),
	about: joi.string().trim().allow(p_empty).required(),
	video: joi.string().trim().allow(p_empty).required(),
	openings: joi.array().items(p_openings).required(),
	members: joi.array().items(member).required(),
	follower_count: joi.number().integer().required(),
	discussions: joi.array().items(p_discussion).required(),
});

module.exports.discussions = joi.object().keys({
	discussions: joi.array().items(p_discussion)
});

module.exports.openings = joi.object().keys({
	openings: joi.array().items(p_openings)
});

module.exports.details = joi.object().keys({
	project: detail
});