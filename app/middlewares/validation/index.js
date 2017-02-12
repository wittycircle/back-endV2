/**
 * Created by rdantzer on 30/01/17.
 */

'use strict';

const Joi = require('joi'),
    _ = require('lodash');

exports.schemas = {
    auth: require('./schemas/auth'),
    profile: require('./schemas/profile'),
    user: require('./schemas/user'),
    project: require('./schemas/project'),
    discussion: require('./schemas/discussion'),
    replies: require('./schemas/replies'),
    common: require('./schemas/common'),
    params: require('./schemas/params')
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

exports.validateParam = (schema) => (req, res, next, param) => {
    Joi.validate(param, schema, {
        abortEarly: false //might not be useful here
    }, (err, value) => {
        if (err)
            res.status(404).send(error_formatter(err));
        else if (value)
            next();
        else
            throw 'Empty param'
    });
};