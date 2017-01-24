/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const auth = require('../controllers/auth'),
    express = require('express'),
    passport = require('passport');

let router = express.Router();

router.route('/login')
    .post(auth.login);

router.route('/logout')
    .get(auth.logout);

module.exports = router;