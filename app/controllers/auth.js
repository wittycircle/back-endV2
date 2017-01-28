/**
 * Created by rdantzer on 19/01/17.
 */
const passport = require('passport'),
    session = require('../middlewares/session').session;

'use strict';

exports.checkLog = (req, res) => {
    res.send({success: req.isAuthenticated()})
};

exports.login = (req, res, next) => {
    passport.authenticate('local-login', (err, user) => {
        if (err || !user)
            res.status(400).send({error: 'wrong credentials'});
        req.logIn(user, (err) => {
            if (err) {
                res.send.status(500).send({error: 'auth error'});
            } else {
                res.send(user);
            }
        })
    })(req, res, next);
};

exports.logout = (req, res) => {
    if (typeof req.user !== 'undefined')
        session.killAllFromUser(req.user.id, (err, result) => {
            if (err) throw (err);
            else
                res.send({success: true});
        });
};
