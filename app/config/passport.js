/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const Strategy = {
        local:    require('passport-local').Strategy,
        facebook: require('passport-facebook').Strategy,
        google:   require('passport-google-oauth').OAuth2Strategy,
        bearer:   require('passport-http-bearer').Strategy
    },
    _ = require('lodash'),
    bcrypt = require('bcrypt-nodejs'),
    session = require('../middlewares/session').session,
    account = require('../models/account'),
    users = require('../models/users'),
    config = require('../private').social_auth; //automatically selects prod or dev config

const social = require('../services/social');

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((token, done) => {
        session.getUser(token, done)
    });

    passport.use(new Strategy.bearer({
            session: true
        }, (token, done) => {
             session.getUser(token, function (err, resp) {
                    if (err)
                        return done(err);
                    if (_.isEmpty(resp))
                        return done(null, false);
                    else
                        return done(null, resp);
                }
            )
        }
    ));

    const oauth_helper = {
        logon: (req, user, profile, token, origin) => {
            if (user.length) {
                user = user[0];
                return {
                    id:         user.id,
                    profile_id: user.profile_id,
                    email:      user.email,
                };
            } else {
                return account.socialRegister(profile, token,  origin).then(r => {return r});
            }
        }
    };

    passport.use(new Strategy.facebook({
            passReqToCallback: true,
            clientID:          config.facebook.clientID,
            clientSecret:      config.facebook.clientSecret,
            callbackURL:       config.facebook.callbackURL,
            profileFields:     ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'photos', 'displayName']
        }, (req, accessToken, refreshToken, profile, done) => {
            social.getFacebookStuff(accessToken, profile.id);
            users.getUserBySocialId(profile.id, 'facebook')
                .then(user => oauth_helper.logon(req, user, profile, accessToken, 'facebook'))
                .then(data => {
		    console.log(data);
		    data.ip = req.ip;
		    done(null, data);
                })
                .catch(err => done(err))
        }
    ));

    passport.use(new Strategy.google({
            passReqToCallback: true,
            clientID:          config.google.clientID,
            clientSecret:      config.google.clientSecret,
            callbackURL:       config.google.callbackURL
        }, (req, accessToken, refreshToken, profile, done) => {
            social.gmailContactsCampaign(accessToken)
                .then(console.log);
            users.getUserBySocialId(profile.id, 'google')
                .then(user => oauth_helper.logon(req, user, profile, accessToken, 'google'))
                .then(data => {
                    data.ip = req.ip;
                    done(null, data);
                })
                .catch(err => done(err))
        }
    ));

    passport.use(new Strategy.local({
        usernameField:     'email',
        // session: true,
        passReqToCallback: true
    }, (req, email, password, done) => {
        users.getUserBy({email: email})
            .then(user => {
                if (!user.length) return done(null, false);
                else
                    user = user[0];
                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, {
                        id:         user.id,
                        profile_id: user.profile_id,
                        email:      email,
                        ip:         req.ip
                    });
                }
                else return done(null, false);
            }).catch(err => done(err));
    }))
}
;
