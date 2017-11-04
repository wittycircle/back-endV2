
'use strict';

const express = require('express'),
		router = express.Router(),
		tracking = require('../controllers/tracking'),
		{validate, validateParam, schemas} = require('../middlewares/validation'),
		{auth, AUTH} = require('../services/auth');

router.route('/:user_id/:page_id/click/:zone_id')
	.put(tracking.updateTrackingPageClick);

router.route('/:user_id/:page_id/view')
	.put(tracking.updateTrackingPageView);

module.exports = router