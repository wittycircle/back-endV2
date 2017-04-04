'use strict';

const Joi = require('joi');
const p_empty = ['', null]

module.exports.reply = Joi.object().keys({
	message: Joi.string().trim().allow(p_empty).required(),
});