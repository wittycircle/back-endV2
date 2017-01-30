/**
 * Created by rdantzer on 19/01/17.
 */

'use strict';

const auth = require('../controllers/auth'),
    express = require('express'),
    passport = require('passport'),
    _ = require('lodash'),
    Validation = require('../middlewares/validation');

let router = express.Router();

router.use('/local', Validation.validate(Validation.schemas.auth.login));
router.route('/local')
    .post(auth.localLogin);

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