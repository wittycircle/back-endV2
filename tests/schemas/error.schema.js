/**
 * Created by rdantzer on 30/01/17.
 */

'use strict';

const joi = require('joi');

const validation_error_description_schema = joi.object().keys({
    param: joi.string().required(),
    msg: joi.string().required(),
    value: joi.string().required()
});

exports.validation_error_schema = joi.object().keys({
    error: joi.string().required(),
    error_description: joi.array().items(validation_error_description_schema)
});