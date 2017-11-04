const tracking = require('../models/tracking'),
	_ = require('lodash');

exports.updateTrackingPageClick = (req, res, next) => {
	const params = {
		user_id: req.params.user_id,
		page_id: req.params.page_id,
		zone_id: req.params.zone_id
	};

	tracking
		.updateTrackingPageClick(req, params);
};


exports.updateTrackingPageView = (req, res, next) => {
	const params = {
		user_id: req.params.user_id,
		page_id: req.params.page_id,
	};

	tracking
		.updateTrackingPageView(req, params);
};