
'use strict';

const express = require('express'),
    router = express.Router(),
    account = require('../controllers/account'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');

router.route('/accounts/password')
    .put(auth(AUTH.PRIVATE), validate(schemas.common.password), account.updatePassword)

router.route('/accounts/informations')
    .put(auth(AUTH.PRIVATE), validate(schemas.account.informations), account.updateInformations)

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