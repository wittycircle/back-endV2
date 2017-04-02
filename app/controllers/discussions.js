const discussion = require('../models/discussions'),
	_ = require('lodash');

// ------------------ Project Discussions ------------------

exports.updateProjectDiscussion = (req, res, next) => {
	discussion.updateProjectDiscussion(req.params.discussion_id, req.body.message, req.body.title, req.user.id)
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
exports.getDiscussionReplies = (req, res, next) => {
	discussion.getDiscussionReplies(req.params.discussion_id)
		.then(r => {
			if (typeof r === 'string'){
				return next([r, "Bad id"])
			}else {
				if (req.user){
					r.forEach(rep => {
						rep.likes.forEach(l => l.hasLiked = (l.user_id === req.user.id));
					});
				}
				res.send({replies: r})
			}
		});
};

exports.replyDiscussion = (req, res, next) => {
	discussion.replyDiscussion(req.params.discussion_id, req.user.id, req.body.message)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Could not reply'])
			}
			else{
                req.broadcastEvent('discussion_reply', {
                    id: req.params.discussion_id,
                    from: req.user.id,
                    message: req.body.message
                });
                // mailer.reply_project()
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
            else {
                req.broadcastEvent('discussion_like', {
                    from: req.user.id,
                    id: req.params.discussion_id,
                    value: 1
                });
				res.send({id: r[0]})
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
                req.broadcastEvent('discussion_like', {
                    from: req.user.id,
                    id: req.params.discussion_id,
                    value: -1
                });
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
