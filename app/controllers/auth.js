/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const passport = require('passport'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt-nodejs'),
    social = require('../private').social_auth,
    _ = require('lodash');


exports.checkLog = (req, res) => {
    res.send({success: req.isAuthenticated()})
};

exports.ensureAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.status(400); //Todo 401 UNAUTHORIZED
};

exports.ensureAdminAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.moderator)
        next();
    else
        res.redirect('/'); //todo 403 FORBIDDEN
};

exports.ensureModerator = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.moderator || req.user.ambassador))
        next();
    else
        res.redirect('/'); //todo 403 FORBIDDEN
};

exports.login = (req, res, next) => {
    passport.authenticate('local-login', (err, user) => {
        if (err || !user)
            return res.send({success: false});
        req.logIn(user, err => {
            if (err)
                res.send({success: false}); //todo login failure report
            else {
                return res.send({
                    success: true,
                    user: _.pick(user, ['id', 'email', 'profile_id', 'username', 'moderator', 'ambassador'])
                });
            }
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    if (!req.isAuthenticated())
        res.send({message: 'User is not logged in'}) //todo security?
    else
        req.session.destroy(err => {
            if (err) throw err;
            res.send({success: true});
        })
};
