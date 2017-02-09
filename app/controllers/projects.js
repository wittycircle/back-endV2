const project = require('../models/projects'),
    _ = require('lodash');

// ------------------ Discussions ------------------
exports.createProjectDiscussion = (req, res, next) => {
	if (!req.body.message && !req.body.message)
		return next(["Invalid body", "Message or title required"])
	project.createProjectDiscussion(req.params.id, req.user.id, req.body.message, req.body.title)
		.then(r => {
			if (typeof r === 'string')
				return next([r, 'Invalid project id'])
			else{
				res.send({success:true}) 
			} 
		}) 
		.catch(err => next(err))
};

exports.updateProjectDiscussion = (req, res, next) => {
	project.updateProjectDiscussion(req.params.id, req.params.discussion_id, req.body.message, req.body.title)
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
	project.removeProjectDiscussion(req.params.id, req.params.discussion_id)
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

exports.getProjectDiscussion = (req, res, next) => {
	project.getProjectDiscussion(req.params.id)
		.then(r => {
			if (_.isEmpty(r))
				next(['Empty discussion', 'Wrong project id'])
			else
				res.send({discussions: r})
		})
		.catch(err => next(err))
};
	
// ------------------ Likes ------------------
exports.getProjectLikes = (req, res, next) => {
	project.getProjectLikes(req.params.id)
		.then(r => {
			res.send({ like :{
				count: r.length, 
				who: r, 
				} 
			}) 
		})
		.catch(err => next(err))
}

exports.likeProject = (req, res, next) => {
	project.likeProject(req.params.id, req.user.id)
	.then(r => {
		if (!_.isEmpty(r))
			res.send({success: true}) 
		else 
			res.send({success: false})
    }).catch(err => next(err))
}

exports.unlikeProject = (req, res, next) => {
	project.unlikeProject(req.params.id, req.user.id)
	.then(r => {
		if (r) 
			res.send({success: true}) 
		else 
			res.send({success: false})
    }).catch(err => next(err))
}