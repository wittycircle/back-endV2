/**
 * Created by rdantzer on 19/01/17.
 */
const passport = require('passport'),
    session = require('../middlewares/session').session,
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

exports.localLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
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
    })(req, res, next);
};

exports.resetPassword = (req, res) => {
    const token = crypto.randomBytes(20).toString('hex');
    let link = 'https://www.wittycircle.com/password/reset/' + token; //todo add method

    user.getFromUser(['id'], {email: req.body.email_reset})
        .then(r => {
            if (!r.length) {
                next(['user.not_found', 'No account with this email']);
            } else {
                user.resetPass({token: token, user_id: r[0].id, user_email: req.body.email_reset})
                    .then(res.send({success: true}))
            }
        }).catch((e) => next(e));
    //mail stuff to do
};

exports.getUserForResetPassword = (req, res) => {
    user.getUserReset(['token', 'user_id', 'user_email'], {token: req.param.token})
        .then(r => {
            if (!r.length) {
                res.status(403).send({message: 'You are not authorized to make this action.'});
            } else {
                res.send({data: r, message: 'Password Changed !'});
            }
        }).catch((e) => console.error(e))
};

exports.updatePasswordReset = (req, res) => {
    user.getUserreset(['token'], {token: req.body.token})
        .then(c => {
            if (!c.length) {
                res.status(403).send({message: 'You are not authorized to make this action.'});
            } else {
                user.updateUser({password: bcrypt.hashSync(req.body.password)}, {email: req.body.email})
                    .then((r) => {
                        res.send(r)
                    })
            }
        }).catch((e) => console.error(e))
};

exports.verifyProjectNetwork = (req, res) => {
    project.getFromProjectNetwork(['project_id'], {token: req.params.token})
        .count('project_id as number')
        .then(c => {
            if (c[0].number === 0) {
                return res.status(403).send("You are not authorized to do this action.");
            } else {
                project.updateProjectNetwork({verified: 1}, {token: req.params.token})
                    .then(r => {
                        project.getFromProjectNetwork(['network'], {project_id: c[0].project_id, verified: 1})
                            .then(res.status(200).send({success: true}))
                    })
            }
        })
};



















