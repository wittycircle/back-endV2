/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const Strategy = {
        local: require('passport-local').Strategy,
        facebook: require('passport-facebook').Strategy,
        google: require('passport-google-oauth').OAuth2Strategy
    },
    bcrypt = require('bcrypt-nodejs'),
    users = require('../models/users'),
    _ = require('lodash');

module.exports = passport => {
    passport.serializeUser = (user, cb) => {
        cb(null, user.id)
    };

    passport.deserializeUser = (id, cb) => {
        users.getUser(id)
            .then(user => {
                if (_.isEmpty(user))
                    cb(null, null);
                else
                    cb(null, user);
            })
            .catch(err => {
                cb(err)
            });
    };

    passport.use('local-login', new Strategy.local({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, cb) => {
        users.getUserByEmail(email)
            .then(user => {
                if (_.isEmpty(user))
                    cb(null, null);
                else if (!bcrypt.compareSync(password, user.password))
                    cb(null, null); //todo raise WrongPasswordException or something like that
                else
                    cb(null, user)
            })
            .catch(err => {
                cb(err)
            });
    }));
};
