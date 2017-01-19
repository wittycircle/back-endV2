/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const express = require('express');

let router = express.Router();


router.use(require('./users'));
router.route('/').get((req, res) => {
res.sendFile('Public/app/index.html', {root: __dirname + '/../../'})
})


module.exports = router;