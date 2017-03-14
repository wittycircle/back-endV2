/**
 * Created by rdantzer on 30/01/17.
 */

'use strict';

const Joi = require('joi');

exports.id = Joi.number().integer().greater(0).required().label('resource_id');

exports.token = Joi.string().trim().required();