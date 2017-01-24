/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const Strategy = {
        local: require('passport-local').Strategy,
        facebook: require('passport-facebook').Strategy,
        google: require('passport-google-oauth').OAuth2Strategy,
        bearer: require('passport-http-bearer').Strategy
    },
    bcrypt = require('bcrypt-nodejs'),
    session = require('../middlewares/session').session,
    users = require('../models/users'),
    _ = require("lodash");

module.exports = function (passport) {

    passport.serializeUser = function (user, done) {
        console.log(done);
        session.createUserSession(user, done)
    };

    passport.deserializeUser = function (token, done) {
        session.getUser(token, done)
    };

    passport.use(new Strategy.bearer({
            session: false
        }, (token, done) => {
            session.getUser(token, function (err, resp) {
                    if (err)
                        return done(err);
                    if (!resp)
                        return done(null, false);
                    else
                        return done(null, resp);
                }
            )
        }
    ));

    passport.use('local-login', new Strategy.local({
            usernameField: 'email',
            session: false,
            passReqToCallback: true
        }, (req, email, password, done) => {
            users
                .getUserByEmail(email)
                .select('id', 'profile_id', 'email', 'password')
                .then(user => {
                    if (user === null) return done(null, false);
                    else
                        user = user[0];
                    if (bcrypt.compareSync(password, user.password)) {
                        return done(null, {
                            id: user.id,
                            profile_id: user.profile_id,
                            email: user.email,
                            ip: req.ip
                        });
                    }
                    return done(null, false);
                })
                .catch(err => done(err))
        }
    ))
};