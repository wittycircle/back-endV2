
'use strict';

const express = require('express'),
    router = express.Router(),
    account = require('../controllers/account'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport'),
    auth = (x) => passport.authenticate(x);

router.route('/accounts/password')
	.put(auth('bearer'), validate(schemas.common.password), account.updatePassword)

router.route('/accounts/register')
	.post(validate(schemas.account.register), account.register);

router.route('/accounts/password-reset')
	.post(validate(schemas.common.email), account.recoverPassword)

// ------------------ Params ------------------
router.param('token', validateParam(schemas.params.token));
// ------------------ Params ------------------

router.route('/accounts/activate/:token')
	.get(account.activate)

router.route('/accounts/password-reset/:token')
	.put(account.resetPassword)

module.exports = router