/**
 * Created by rdantzer on 26/01/17.
 */

'use strict';

/**
 *  Error middleware
 */

exports.error = (err, req, res, next) => {
    res.json(err);
};