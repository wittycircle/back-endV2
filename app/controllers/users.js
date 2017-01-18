/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

const user = require('../models/users');

exports.getUser = (req, res, next, id) => {
    user.getUser(id).then(user => {
        res.send(user);
    }).catch(err => {throw err});
};
