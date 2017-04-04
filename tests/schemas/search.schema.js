'use strict';

const joi = require('joi'),
	p_empty = ['', null];

// ------------------ Profile ------------------
const profile = joi.object().keys({
	username: joi.string().trim().allow(p_empty),
	rank: joi.number().integer(),
	user_id: joi.number().integer(),
	id: joi.number().integer(),
	picture: joi.string().trim().allow(p_empty),
	cover_picture: joi.string().trim().allow(p_empty),
	about: joi.string().trim().allow(p_empty),
	description: joi.string().trim().allow(p_empty),
	network: joi.string().trim().allow(p_empty),
	location: joi.string().trim().allow(p_empty),
	follower: joi.number().integer(),
	following: joi.number().integer(),
	skills: joi.any().allow([(joi.string().trim().allow(p_empty), 
		joi.array().items(joi.string().trim().allow(p_empty)))])
});

module.exports.profiles = joi.object().keys({
	profiles: joi.array().items(profile)
});
 
// ------------------ Project ------------------
const project = joi.object().keys({
	id: joi.number().integer().required(),
	title: joi.string().trim().allow(p_empty).required(),
	description: joi.string().trim().allow(p_empty).required(),
	picture_card: joi.string().trim().allow(p_empty).required(),
	status: joi.string().trim().allow(p_empty).required(),
	category_id: joi.number().integer().required(),
	category_name: joi.string().trim().allow(p_empty).required(),
	network: joi.string().trim().allow(p_empty).required(),
	profile_picture: joi.string().trim().allow(p_empty).required(),
	user_id: joi.number().integer().required(),
	username: joi.string().trim().allow(p_empty).required(),
	location: joi.string().trim().allow(p_empty).required(),
	followers: joi.number().integer().required(),
	members: joi.number().integer().required(),
});

module.exports.projects = joi.object().keys({
	projects: joi.array().items(project)
});