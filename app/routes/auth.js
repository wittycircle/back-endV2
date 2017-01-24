/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const auth = require('../controllers/auth'),
    express = require('express'),
    passport = require('passport'),
    _ = require("lodash");

let router = express.Router();

router.route('/login')
    .post((req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/login');
            req.logIn(user, err => {
                if (err) return next(err);
                return res.json({
                    auth: _.pick(req.session.passport.user, ['token']),
                    user: _.pick(req.user, ['id', 'profile_id', 'email'])
                });
            });
        })(req, res, next);
    });

router.route('/logout')
    .get(auth.logout);

module.exports = router;