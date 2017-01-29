/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const express = require('express');

let router = express.Router();

router.use('/api', require('./users'));
router.use('/api', require('./profiles'));
router.use('/api/auth', require('./auth'));

module.exports = router;