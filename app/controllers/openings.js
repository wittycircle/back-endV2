const opening = require('../models/openings');

exports.updateOpening = (req, res, next) => {
	const data = {
		status: req.body.status,
		description: req.body.description
	};
	opening
		.updateOpening(req.params.opening_id, data, req.body.tags)
		.then(r => res.send({ success: true }))
		.catch(err => next([err, 'bad id']));
};

exports.deleteOpening = (req, res, next) => {
	opening
		.deleteOpening(req.params.opening_id)
		.then(r => res.send({ success: true }))
		.catch(err => next([err, 'Bad id']));
};
