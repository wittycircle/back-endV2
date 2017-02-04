/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';

const joi = require('joi');

const detail = joi.object().keys({
    id: joi.number().integer().required(),
    first_name: joi.string().allow('').required(),
    last_name: joi.string().allow('').required(),
    about: joi.string().allow(['', null]).required(),
    description: joi.string().allow(['', null]).required()
});

exports.profile = joi.object().keys({
    profile: detail.required()
});

exports.list = joi.object().keys({
    profiles: joi.array().items(detail).optional()
});

exports.success = joi.object().keys({
	success: joi.only(true).required()
})