/**
 * Created by rdantzer on 31/01/17.
 */

'use strict';

const Joi = require('joi');

exports.update = Joi.object().keys({
    first_name: Joi.string().alphanum().trim().min(1).max(64).optional(),
    last_name: Joi.string().alphanum().trim().min(1).max(64).optional(),
    about: Joi.string().max(10000).optional()
});