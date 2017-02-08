/**
 * Created by rdantzer on 26/01/17.
 */

'use strict';

/**
 *  Error middleware
 */

const _ = require('lodash');

const create_error = (name, description) => {
    return {
        error: name,
        description: description
    }
};

/**
 * => next(['error name', 'an error description'])
 * HTTP/1.1 200
 * {
 *      error: "error name",
 *      error_description: "an error description"
 * }
 *
 * => .catch(err => next(err)) (for knex try/catch)
 * HTTP/1.1 404
 * {
 *      error: 'resource.not.found',
 *      error_description: err.error (explicit error text autogenerated)
 * }
 *
 * => next({code: 418})
 * HTTP/1.1 418
 * {
 *      success: false
 * }
 *
 * => next({code: 404, error: '', error_description: ''})
 * => next({error: ''. error_description: ''})
 */

exports.error = (err, req, res, next) => {
    if (_.isArray(err))
        res.status(404).send(create_error(err[0], err[1]));
    else if (typeof err.error === 'string')
        res.status(404).send(create_error('resource.not.found', err.error));
    else if (typeof err.code !== 'undefined') {
        if (typeof err.sqlState !== 'undefined') {
            res.status(500).send({success: false});
            console.error(err);
        }
        else if (typeof err.error !== 'undefined' || typeof err.error_description !== 'undefined')
            res.status(err.code).send(err);
        else {
            res.status(err.code).send({success: false});
            console.error(err);
        }
    }
    else {
        res.send(err).status(400);
        console.error(err);
    }
};