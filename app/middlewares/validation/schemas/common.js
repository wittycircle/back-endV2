'use strict';

const Joi = require('joi');
const 	p_empty = ['', null],
		p_status = ['any', 'tips', 'teammate', 'mentor'];

module.exports.location = Joi.object().keys({
	country: Joi.string().alphanum().trim().min(1).max(64).optional(),
	city: Joi.string().alphanum().trim().min(1).max(64).optional(),
	state: Joi.string().alphanum().trim().min(1).max(64).optional()
}).or('country', 'city', 'state')