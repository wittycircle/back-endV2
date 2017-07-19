const reply = require('../models/replies'),
		_ = require('lodash');

exports.updateReplyDiscussion = (req, res, next) => {
		reply.updateReplyDiscussion(req.params.reply_id, req.user.id, req.body.message)
				.then(r => {
						if (typeof r === 'string') {
								return next([r, 'Does not seem to be the owner'])
						}
						else {
								req.broadcastEvent('discussion_reply_update', {
										id: req.params.reply_id,
										from: req.user.id,
										message: req.body.message
								});
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
						else {
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
						else {
								req.broadcastEvent('discussion_reply_like', {
										from: req.user.id,
										id: req.params.reply_id,
										value: 1
								});
								res.send({id: r[0]})
						}
				})
				.catch(err => next(err))
};

exports.unlikeReply = (req, res, next) => {
		reply.unlikeReply(req.params.reply_id, req.user.id)
				.then(r => {
						if (typeof r === 'string') {
								return next([r, 'Invalid reply id'])
						}
						else {
								req.broadcastEvent('discussion_reply_like', {
										from: req.user.id,
										id: req.params.reply_id,
										value: -1
								});
								res.send({success: true})
						}
				})
				.catch(err => next(err))
};
