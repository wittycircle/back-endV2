/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const express = require('express');

let router = express.Router();


router.use(require('./users'));
router.use(require('./profiles'));

module.exports = router;