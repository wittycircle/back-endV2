/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const auth = require('../controllers/auth'),
    express = require('express'),
    passport = require('passport'),
    { validate, schemas } = require('../middlewares/validation'),
    _ = require('lodash');

let router = express.Router();

router.use('/local', validate(schemas.auth.local));
router.route('/local')
    .post(auth.localLogin, auth.generateToken);

router.route('/google')
    .get(auth.socialLogin('google', {scope: ['profile', 'email']}));

router.route('/google/callback')
    .get(auth.socialLogin('google'), auth.generateToken, (req, res) => res.redirect('/'));

router.route('/facebook')
    .get(auth.socialLogin('facebook', {scope: ['email']}));

router.route('/facebook/callback')
    .get(auth.socialLogin('facebook', {successRedirect: '/'}), auth.generateToken);

router.route('/logout')
    .post(passport.authenticate('bearer'), auth.logout);

module.exports = router;