/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const passport = require('passport'),
    Strategy = {
        local: require('passport-local').Strategy,
        facebook: require('passport-facebook').Strategy,
        google: require('passport-google-oauth').OAuth2Strategy,
        bearer: require('passport-http-bearer').Strategy
    },
    bcrypt = require('bcrypt-nodejs'),
    RedisSessions = require('redis-sessions'),
    rs = new RedisSessions(), //todo config in app/private/index.js
    rsapp = 'witty_sessions';

//  module.exports = passport => {
//     passport.serializeUser = (user, cb) => {
//         cb(null, user.id)
//     };
//
//     passport.deserializeUser = (id, cb) => {
//         users.getUser(id)
//             .then(user => {
//                 if (_.isEmpty(user))
//                     cb(null, null);
//                 else
//                     cb(null, user);
//             })
//             .catch(err => {
//                 cb(err)
//             });
//     };
//
//     passport.use('local-login', new Strategy.local({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     }, function(req, email, password, cb) {
//         users.getUserByEmail(email)
//             .select('*')
//             .then(user => {
//                 user = user[0];
//                 if (_.isEmpty(user))
//                     return cb(null, false);
//                 if (_.isEmpty(user.password))
//                     return cb(null, false);
//                 if (!bcrypt.compareSync(password, user.password))
//                     return cb(null, false); //todo raise WrongPasswordException or something like that
//                 return cb(null, _.pull(user, 'password'))
//             })
//             .catch(err => {
//                 return cb(err)
//             });
//     }));
// };

/**
 * This is currently a test for the bearer token strategy with redis-sessions
 * @param passport
 */
module.exports = function (passport) {
    passport.serializeUser = (user, cb) => {
        rs.create({
                app: rsapp,
                id: user.id,
                ttl: 3600
            }, function (err, resp) {
                if (err) return cb(err);
                else
                    return cb(null, resp);
            }
        );
    };

    passport.deserializeUser = (token, cb) => {
        rs.get({
                app: rsapp,
                token: token
            }, function (err, resp) {
                if (err) return cb(err);
                else
                    return cb(null, resp);
            }
        )
    };

    passport.use(new Strategy.bearer(
        (token, done) => {
            rs.get({
                    app: rsapp,
                    token: token
                }, function (err, resp) {
                    if (err)
                        return done(err);
                    if (!resp)
                        return done(null, false);
                    else
                        return done(null, resp, {scope: 'all'});
                }
            )
        }
    ));
};