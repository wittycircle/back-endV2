const reply = require('../models/replies'),
	_ = require('lodash');

exports.updateReplyDiscussion = (req, res, next) => {
	reply.updateReplyDiscussion(req.params.reply_id, req.user.id, req.body.message)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Does not seem to be the owner'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.removeReplyDiscussion = (req, res, next) => {
	reply.removeReplyDiscussion(req.params.reply_id, req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Does not seem to be the owner'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
// ------------------ Likes ------------------
exports.likeReply = (req, res, next) => {
	reply.likeReply(req.params.reply_id, req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'invalid reply id'])
			}
			else{
				res.send({id: r[0]})
			}
		})
		.catch(err => next(err))
};

exports.unlikeReply = (req, res, next) => {
	reply.unlikeReply(req.params.reply_id, req.user_id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Invalid reply id'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
