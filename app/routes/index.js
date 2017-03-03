/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const express = require('express');

let router = express.Router();

router.use('/api', require('./users'));
router.use('/api', require('./profiles'));
router.use('/api/auth', require('./auth'));
router.use('/api', require('./projects'));
router.use('/api', require('./discussions'));
router.use('/api', require('./replies'));
router.use('/api', require('./openings'));
router.use('/api', require('./skills'));
router.use('/api', require('./main_page'));

router.use(require('../middlewares/error').error);

router.use('*', (req, res, next) => {
    res.status(404).send({
        error: 'not_found',
        error_description: 'resource doesn\'t exist'
    });
});

module.exports = router;