/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const Joi = require('joi');
const 	p_empty = ['', null],
		p_status = ['any', 'tips', 'teammate', 'mentor'];

module.exports.discussion = Joi.object().keys({
	title: Joi.string().trim().allow(p_empty).required(),
	message: Joi.string().trim().allow(p_empty).required()
});

module.exports.opening = Joi.object().keys({
	status: Joi.string().trim().allow(p_status).required(),
	description:Joi.string().trim().allow(p_empty).required(),
	tags: Joi.string().trim().allow(p_empty).required(),
});