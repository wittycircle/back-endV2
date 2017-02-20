/**
 * Created by rdantzer on 19/02/17.
 */

'use strict';

const search = require('../models/search'),
    _ = require('lodash');

exports.searchProfile = (req, res, next) => {
    search.searchProfile(req.body.query)
        .then(results => {
            if (!_.isEmpty(results))
                res.send(results);
            else
                next({code: 404});
        })
        .catch(err => next(err));
};