const discussion = require('../models/discussions'),
	_ = require('lodash');

// ------------------ Project Discussions ------------------

exports.updateProjectDiscussion = (req, res, next) => {
	discussion.updateProjectDiscussion(req.params.discussion_id, req.body.message, req.body.title)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, "bad id"])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.removeProjectDiscussion = (req, res, next) => {
	discussion.removeProjectDiscussion(req.params.discussion_id)
		.then(r => {
			if (typeof r === 'string'){
				return next([r, r])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
