/**
 * Created by rdantzer on 30/01/17.
 */

'use strict';

const Validator = require('express-validator'),
    error = {
        error: '',
        error_description: ''
    },
    validation_error = {
        error: 'validation',
        error_description: []
    },
    Joi = require('joi'),
    _ = require('lodash');

exports.schemas = {
    auth: require('./schemas/auth'),
    profile: require('./schemas/profile'),
    user: require('./schemas/user'),
    project: require('./schemas/project')
};

const error_formatter = err => {
    return {
        error: 'validation',
        error_description: _.map(err.details, detail => {
            return {
                field: detail.path,
                msg: detail.message,
                value: detail.context.value || 'none'
            }
        })
    }
};

exports.validate = (schema) => (req, res, next) => {
    Joi.validate(req.body, schema, {
        abortEarly: false
    }, (err, value) => {
        if (err)
            res.send(error_formatter(err));
        else if (value)
            next();
        else
            throw 'Empty body'
    })
};