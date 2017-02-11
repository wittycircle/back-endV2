const project = require('../models/projects'), 
    _ = require('lodash');

// ------------------ Discussions ------------------
exports.createProjectDiscussion = (req, res, next) => {
	const data = {
		project_id: req.params.id,
		user_id: req.user.id,
		message: req.body.message,
		title: req.body.title
	};
	project.createProjectDiscussion(data)
		.then(r => {
			if (typeof r === 'string')
				return next([r, 'Invalid project id'])
			else{
				res.send({id: r[0]})
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

// ------------------ Openings ------------------

exports.createOpening = (req, res, next) => {
	const data = {
		project_id: req.params.id,
		status: req.body.status,
		description: req.body.description,
		tags: req.body.tags
	}; 
	project.createOpening(data)
	.then(r => {
		if (typeof r === 'string') {
			return next([r, 'Invalid project id']) 
		} else{
			res.send({id: r[0]}) 
		} 
	}) 
	.catch(err => next(err)) 
};

exports.getProjectOpenings = (req, res, next) => {
	project.getProjectOpenings(req.params.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad id'])
			}
			else{
				r.forEach(el => {
					el.tags = el.tags.split(',')
				})
				res.send({openings: r})
			}
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
