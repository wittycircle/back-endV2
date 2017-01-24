/**
 * Created by rdantzer on 19/01/17.
 */
const passport = require('passport');

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
                return next(err);
            } else {
                return res.send(user);
            }
        })
    })(req, res, next);
};

exports.logout = (req, res) => {

};
