/**
 * Created by rdantzer on 19/01/17.
 */
const passport = require('passport'),
    user = require('../models/users'),
    project = require('../models/projects'),
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
            else
                res.json({
                    auth: _.pick(req.session.passport.user, ['token']),
                    user: _.pick(req.user, ['id', 'profile_id', 'email'])
                });
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
                else
                    req.broadcastEvent('user_online', {id: req.user.id});
                res.json({
                    auth: _.pick(req.session.passport.user, ['token']),
                    user: _.pick(req.user, ['id', 'profile_id', 'email'])
                });
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
                else
                    req.broadcastEvent('user_online', {id: req.user.id});
                    res.json({
                        auth: _.pick(req.session.passport.user, ['token']),
                        user: _.pick(req.user, ['id', 'profile_id', 'email'])
                    });
            });
    })(req, res, next);
};

// exports.verifyProjectNetwork = (req, res) => {
//     project.getFromProjectNetwork(['project_id'], {token: req.params.token})
//         .count('project_id as number')
//         .then(c => {
//             if (c[0].number === 0) {
//                 return res.status(403).send("You are not authorized to do this action.");
//             } else {
//                 project.updateProjectNetwork({verified: 1}, {token: req.params.token})
//                     .then(r => {
//                         project.getFromProjectNetwork(['network'], {project_id: c[0].project_id, verified: 1})
//                             .then(res.status(200).send({success: true}))
//                     })
//             }
//         })
// };
