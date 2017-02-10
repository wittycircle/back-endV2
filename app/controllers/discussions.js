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
// ------------------ Reply discussions ------------------

exports.replyDiscussion = (req, res, next) => {
	discussion.replyDiscussion(req.params.discussion_id, req.user.id, req.body.message)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Could not reply'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

// ------------------ Likes discussions ------------------
exports.likeDiscussion = (req, res, next) => {
	discussion.likeDiscussion(req.params.discussion_id, req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'could not like'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.unlikeDiscussion = (req, res, next) => {
	discussion.unlikeDiscussion(req.params.discussion_id, req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Could not unlike'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
