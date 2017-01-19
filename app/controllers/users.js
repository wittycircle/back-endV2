/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

const user = require('../models/users');

exports.getUser = (req, res) => {
    user.getUser(req.user_id).then(user => {
        res.send(user)
    }).catch(err => {
        throw err
    });
};

exports.getUsers = (req, res) => {
    user.getUsers().then(users => {
        res.send(users)
    }).catch(err => {
        throw err
    });
};

exports.getUserShare = (req, res) => {
    // req.checkParams('user_id', 'username must be an integer.').isInt();
    // const errors = req.validationErrors(true);
    // if (errors)
    //     return res.status(400).send(errors);
    // else {

    user.getUserShare(req.user_id).then(social_share => {
        if (social_share.length === 0)
            res.send({success: false});
        else
            res.send(social_share)
    }).catch(err => {
        throw err
    });
};

exports.getUserByEmail = (req, res) => {
    user.getUserByEmail(req.user_email).then(user => {
        if (user.length === 0)
            res.send({success: false});
        else
            res.send(user);
    }).catch(err => {
        throw err
    });
};

