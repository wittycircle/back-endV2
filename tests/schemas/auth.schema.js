/**
 * Created by rdantzer on 29/01/17.
 */

'use strict';

/**
 * Joi auth schema definition
 */

const joi = require('joi');

const token_schema = joi.object().keys({
    token: joi.string().length(64).required()
});

const user_schema = joi.object().keys({
    id: joi.number().integer().required(),
    profile_id: joi.number().integer().required(),
    email: joi.string().email().required()
});

exports.response_schema = joi.object().keys({
    auth: token_schema,
    user: user_schema
});

