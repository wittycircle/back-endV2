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

let redirect = (req, res) => {
    res.send(req.token);
};

let social_redirect = (req, res) => {
    res.cookie('auth', JSON.stringify(req.token), {maxAge: 24 * 3600 * 60});
	res.redirect('/')
};

router.use('/local', validate(schemas.auth.local));
router.route('/local')
    .post(auth.localLogin, auth.generateToken, redirect);

router.route('/google')
    .get(auth.socialLogin('google', {scope: ['profile', 'email', 'https://www.google.com/m8/feeds/contacts/default/full']}));

router.route('/google/callback')
    .get(auth.socialLogin('google', {successRedirect: 'https://www.wittycircle.com', failureRedirect : 'https://www.wittycircle.com'}), auth.generateToken, social_redirect);

router.route('/facebook')
    .get(auth.socialLogin('facebook', {scope: ['email', 'user_friends']}));

router.route('/facebook/callback')
    .get(auth.socialLogin('facebook', {successRedirect: 'https://www.wittycircle.com', failureRedirect : 'https://www.wittycircle.com'}), auth.generateToken, social_redirect);

router.route('/logout')
    .post(passport.authenticate('bearer'), auth.logout);

module.exports = router;
