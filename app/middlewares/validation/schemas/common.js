'use strict';

const Joi = require('joi');
const 	p_empty = ['', null],
		p_status = ['any', 'tips', 'teammate', 'mentor'];

module.exports.location = Joi.object().keys({
	country: Joi.string().trim().min(1).max(64).optional(),
	city: Joi.string().trim().min(1).max(64).optional(),
	state: Joi.string().trim().min(1).max(64).optional()
}).or('country', 'city', 'state')

module.exports.email = Joi.object().keys({
	email: Joi.string().email().required()
});

module.exports.password = Joi.object().keys({
	password: Joi.string().min(4).max(26).required()
});