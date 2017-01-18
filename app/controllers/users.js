/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

const user = require('../models/users');

exports.getUser = (req, res, next) => {
    user.getUser(req.user_id).then(user => {
        res.send(user);
    }).catch(err => {throw err});
};

exports.getUsers = (req, res, next) => {
    user.getUsers().then(users => {
        res.send(users);
    }).catch(err => {throw err});
};
