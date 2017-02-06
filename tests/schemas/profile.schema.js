/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';

const joi = require('joi'),
	p_empty = ['', null]

const detail = joi.object().keys({
    id: joi.number().integer().required(),
    first_name: joi.string().trim().allow(p_empty).required(),
    last_name: joi.string().trim().allow(p_empty).required(),
    about: joi.string().trim().allow(p_empty).required(),
    description: joi.string().trim().allow(p_empty).required()
});

const p_location = joi.object().keys({
	country: joi.string().alphanum().trim().allow(p_empty),
	state: joi.string().alphanum().trim().allow(p_empty),
	city: joi.string().alphanum().trim().allow(p_empty)
});

const p_like = joi.object().keys({
	count: joi.number().integer().required(),
	who: joi.array().items(detail)
});

exports.profile = joi.object().keys({
    profile: detail.required()
});

exports.list = joi.object().keys({
    profiles: joi.array().items(detail).optional()
});

exports.success = joi.object().keys({
	success: joi.only(true).required()
});

exports.location = joi.object().keys({
	location: p_location
});

exports.likes = joi.object().keys({
	like: p_like
});