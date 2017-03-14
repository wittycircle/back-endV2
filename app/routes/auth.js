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