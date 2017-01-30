/**
 * Created by rdantzer on 30/01/17.
 */

'use strict';

const expressValidator = require('express-validator'),
    error = {
        error: '',
        error_description: ''
    },
    validation_error = {
        error: 'validation',
        error_description: []
    };

exports.schemas = {
    auth: require('./schemas/auth')
};

exports.validator = expressValidator();

exports.validate = (schema) => (req, res, next) => {
    if (typeof schema !== 'object') throw 'No schema specified for validation middleware';

    req.validate(schema);

    req.getValidationResult().then(result => {
        if (result.isEmpty())
            next();
        else {
            res.send({
                error: 'validation',
                error_description: result.array()
            });
        }
    });
};
