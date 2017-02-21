/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const Joi = require('joi'),
    p_empty = ['', null];

module.exports.discussion = Joi.object().keys({
	title: Joi.string().trim().allow(p_empty).required(),
	message: Joi.string().trim().allow(p_empty).required()
});