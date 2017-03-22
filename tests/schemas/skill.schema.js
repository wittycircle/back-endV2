'use strict';

const joi = require('joi'),
	p_empty = ['', null];

const skill = joi.object().keys({
	id: joi.number().integer().required(),
	name: joi.string().trim().allow(p_empty).required(),
	category: joi.string().trim().allow(p_empty).required(),
	priority: joi.number().integer().required()
});

module.exports.list = joi.object().keys({
	skills: joi.array().items(skill)
});