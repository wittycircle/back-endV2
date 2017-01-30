/**
 * Created by rdantzer on 19/01/17.
 */
const passport = require('passport'),
    session = require('../middlewares/session').session,
    schemas = require('../middlewares/validation').schemas,
    _ = require('lodash');

'use strict';

exports.checkLog = (req, res) => {
    res.send({success: req.isAuthenticated()})
};

exports.logout = (req, res) => {
    if (typeof req.user !== 'undefined')
        session.killAllFromUser(req.user.id, (err, result) => {
            if (err) throw (err);
            else
                res.send({success: true});
        });
};

exports.localLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            res.status(400).json({
                tg: 'tg'
            });
        else if (_.isEmpty(user))
            res.status(400).json({
                error: 'malformed_request',
                error_description: 'Your request is invalid'
            });
        else
            req.logIn(user, err => {
                if (err) res.status(400).json({
                    error: 'malformed_request',
                    error_description: 'Your request is invalid'
                });
                else
                    res.json({
                        auth: _.pick(req.session.passport.user, ['token']),
                        user: _.pick(req.user, ['id', 'profile_id', 'email'])
                    });
            });
    })(req, res, next);
};