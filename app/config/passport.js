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
    schemas = require('../middlewares/validation').schemas;

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        session.createUserSession(user, (err, token) => {
            if (err) return done(err);
            if (token === null) return done(null, false);
            return done(null, token);
        });
    });

    passport.deserializeUser((token, done) => {
        session.getUser(token, done)
    });

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

    passport.use(new Strategy.local({
        usernameField: 'email',
        // session: true,
        passReqToCallback: true
    }, (req, email, password, done) => {
        users.getUserBy({email: email}).then(user => {
            if (!user.length) return done(null, false);
            else
                user = user[0];
            if (bcrypt.compareSync(password, user.password)) {
                return done(null, {
                    id: user.id,
                    profile_id: user.profile_id,
                    email: email,
                    ip: req.ip
                });
            }
            done(null, false);
        }).catch(err => done(err));
    }))
};