/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';

const Joi = require('joi');

const detail = Joi.object().keys({
    id: Joi.number().integer().required(),
    first_name: Joi.string().allow('').required(),
    last_name: Joi.string().allow('').required(),
    about: Joi.string().allow(['', null]).required(),
    description: Joi.string().allow(['', null]).required()
});

exports.profile = Joi.object().keys({
    profile: detail.required()
});

exports.list = Joi.object().keys({
    profiles: Joi.array().items(detail).optional()
});