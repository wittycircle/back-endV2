/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const express = require('express'),
    router = express.Router();

router.use('/', require('./users'));

module.exports = router;