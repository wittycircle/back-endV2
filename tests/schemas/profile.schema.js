/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';

const joi = require('joi'),
	p_empty = ['', null],
	detail = require('./common.schema').detail

const p_location = joi.object().keys({
	country: joi.string().alphanum().trim().allow(p_empty),
	state: joi.string().alphanum().trim().allow(p_empty),
	city: joi.string().alphanum().trim().allow(p_empty)
});

exports.profile = joi.object().keys({
    profile: detail.required()
});

exports.list = joi.object().keys({
    profiles: joi.array().items(detail).optional()
});

exports.location = joi.object().keys({
	location: p_location
});
