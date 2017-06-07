'use strict';

const Joi = require('joi');
const p_empty = ['', null]

module.exports.discussion = Joi.object().keys({
	title: Joi.string().trim().allow(p_empty),
	message: Joi.string().trim().allow(p_empty).required()
});

module.exports.reply = Joi.object().keys({
	message: Joi.string().trim().allow(p_empty).required(),
});