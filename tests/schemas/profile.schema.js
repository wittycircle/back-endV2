/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';

const Joi = require('joi');

const detail = Joi.object().keys({
    id: Joi.number().integer().required(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    about: Joi.optional(),
    description: Joi.optional()
});

exports.profile = Joi.object().keys({
    profile: detail.required()
});

exports.list = Joi.object().keys({
    profiles: Joi.array().items(detail).optional()
});
