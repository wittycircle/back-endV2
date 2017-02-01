/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const express = require('express');

let router = express.Router();

router.use('/api/auth', require('./auth'));
router.use('/api', require('./profiles'));
module.exports = router;