/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const auth = require('../controllers/auth'),
    express = require('express'),
    passport = require('passport'),
    _ = require('lodash');

let router = express.Router();

//todo extract errors to middleware
router.route('/local')
    .post((req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user)
                return res.status(400).json({
                    error: 'malformed_request',
                    error_description: 'Your request is invalid'
                });
            req.logIn(user, err => {
                if (err) res.status(400).json({
                    error: 'malformed_request',
                    error_description: 'Your request is invalid'
                });
                return res.json({
                    auth: _.pick(req.session.passport.user, ['token']),
                    user: _.pick(req.user, ['id', 'profile_id', 'email'])
                });
            });
        })(req, res, next);
    });

router.route('/google')
    .post((req, res, next) => {
        res.status(404).send({
            error: 'unimplemented',
            error_description: 'This authentification strategy is not implemented yet!'
        })
    });

router.route('/facebook')
    .post((req, res, next) => {
        res.status(404).send({
            error: 'unimplemented',
            error_description: 'This authentification strategy is not implemented yet!'
        })
    });

router.route('/logout')
    .post(passport.authenticate('bearer'), auth.logout);

module.exports = router;