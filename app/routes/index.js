/**
 * Created by rdantzer on 17/01/17.
 */
'use strict';

const express = require('express'),
  path = require('path');

let router = express.Router();

router.use('/api', require('./users'));
router.use('/api', require('./profiles'));
router.use('/api/auth', require('./auth'));
router.use('/api', require('./projects'));
router.use('/api', require('./discussions'));
router.use('/api', require('./replies'));
router.use('/api', require('./openings'));
router.use('/api', require('./skills'));
router.use('/api', require('./account'));
router.use('/api', require('./article'));
router.use('/api', require('./network'));
router.use('/api', require('./interests'));
router.use('/api', require('./statistics'));
router.use('/api', require('./invitation'));
router.use('/api', require('./admin_panel'));
router.use('/api', require('./social'));
router.use('/api', require('./suggestions'));
router.use('/api', require('./upload'));
router.use('/api/tracking', require('./tracking'));
router.use(require('../middlewares/error').error);

router.get('/sitemap.xml', (req, res) => {
	res.sendFile(path.join(__dirname, '../../', 'sitemap.xml'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
