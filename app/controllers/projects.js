const project = require('../models/projects'), 
    _ = require('lodash');

// ------------------ Discussions ------------------
exports.createProjectDiscussion = (req, res, next) => {
	project.createProjectDiscussion(req.params.id, req.user.id, req.body.message, req.body.title)
		.then(r => {
			if (typeof r === 'string')
                return next([r, 'Invalid project id']);
			else{
				res.send({success:true}) 
			} 
		}) 
		.catch(err => next(err))
};

exports.getProjectDiscussion = (req, res, next) => {
	project.getProjectDiscussion(req.params.id)
		.then(r => {
			if (_.isEmpty(r))
                next(['Empty discussion', 'Wrong project id']);
			else
				res.send({discussions: r})
		})
		.catch(err => next(err))
};
	
// ------------------ Likes ------------------
exports.getProjectUpvotes = (req, res, next) => {
    project.getProjectUpvotes(req.params.id)
		.then(r => {
			res.send({ like :{
				count: r.length, 
				who: r, 
				} 
			}) 
		})
		.catch(err => next(err))
};

exports.upvoteProject = (req, res, next) => {
    project.upvoteProject(req.params.id, req.user.id)
	.then(r => {
		if (!_.isEmpty(r))
            res.send({success: true});
		else 
			res.send({success: false})
    }).catch(err => next(err))
};

exports.unupvoteProject = (req, res, next) => {
    project.unupvoteProject(req.params.id, req.user.id)
	.then(r => {
		if (r)
            res.send({success: true});
		else 
			res.send({success: false})
    }).catch(err => next(err))
};