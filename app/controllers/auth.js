'use strict';

const passport = require('passport'),
    user = require('../models/users'),
    project = require('../models/projects'),
    _ = require('lodash'),
    session = require('../middlewares/session').session;

exports.checkLog = (req, res) => {
    res.send({success: req.isAuthenticated()})
};

exports.logout = (req, res) => {
    if (typeof req.user !== 'undefined')
        session.killAllFromUser(req.user.id, (err, result) => {
            if (err) throw (err);
            else {
                req.broadcastEvent('user_logout', {id: req.user.id})
                res.send({success: true});
            }
        });
};

exports.generateToken = (req, res, next) => {
    session.killAllFromUser(req.user.id, (err, success) => {
        if (err) next({code: 500, error: 'token_generation', error_description: 'unable to generate token'});
        else {
            session.createUserSession(req.user, (err, token) => {
                if (err) next({
                    code: 500,
                    error: 'session_generation',
                    error_description: 'unable to generate session'
                });
                else {
                    req.token = {
                        auth: token,
                        user: {
                            id: req.user.id,
                            profile_id: req.user.profile_id,
                            email: req.user.email
                        }
                    };
                    next();
                }
            })
        }
    })
};

const generic_login = (req, res, next) => (err, user) => {
    if (err) next({
        code: 401,
        error: 'unauthorized',
        error_description: 'invalid token'
    });
    else if (_.isEmpty(user))
        next({
            code: 400,
            error: 'malformed',
            error_description: 'invalid credentials'
        });
    else
        req.logIn(user, err => {
            if (err) next({
                code: 500,
                error: 'internal_error',
                error_description: 'Please try later'
            });
            else {
                req.broadcastEvent('user_login', {id: req.user.id});
                next();
            }
        });
};

exports.localLogin = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) next({
            code: 401,
            error: 'unauthorized',
            error_description: 'invalid token'
        });
        else if (_.isEmpty(user))
            next({
                code: 400,
                error: 'malformed',
                error_description: 'invalid credentials'
            });
        else
            req.logIn(user, err => {
                if (err) next({
                    code: 500,
                    error: 'internal_error',
                    error_description: 'Please try later'
                });
                else {
                    req.broadcastEvent('user_login', {id: req.user.id});
                    next();
                }
            });
    })(req, res, next);
};

exports.socialLogin = (auth, opts) => (req, res, next) => {
    passport.authenticate(auth, opts || {}, (err, user) => {
        if (err) next({
            code: 401,
            error: 'unauthorized',
            error_description: 'invalid token'
        });
        else if (_.isEmpty(user))
            next({
                code: 400,
                error: 'malformed',
                error_description: 'invalid credentials'
            });
        else
            req.logIn(user, err => {
                if (err) next({
                    code: 500,
                    error: 'internal_error',
                    error_description: 'Please try later'
                });
                else {
                    req.broadcastEvent('user_login', {id: req.user.id});
                    next()
                }
            });
    })(req, res, next);
};

