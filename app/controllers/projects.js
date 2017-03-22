const project = require('../models/projects'), 
	// format = require('./format'),
    _ = require('lodash');

// ------------------ Project [main methods] ------------------
const data = (req) => {
	let r = {
	user_id: req.user.id,
	title: req.body.title,
	category_id: req.body.category, //id and not a string (there is a table categories)
	description: req.body.description,
	about: req.body.about,
	picture: req.body.picture,
	video: req.body.video,
	network: req.body.network,
	project_visibility: req.body.public || 'undefined'
	};
	if (req.body.location) {
	r.country = req.body.location.country
	r.city = req.body.location.city
	r.state = req.body.location.state
	};
	return r;
};

exports.createProject = (req, res, next) => {
	project.createProject(data(req), req.body.members, req.body.openings, req.body.discussions)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Invalid informations'])
			}
			else{
				res.send({id: r})
			}
		})
		.catch(err => next(err))
};

exports.updateProject = (req, res, next) => {
	req.body.category_id = req.body.category;
	delete req.body.category;
	project.updateProject(req.params.id, req.body)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Invalid id'])
			}
			else{
				res.send({success: true})//make model base on create, look at the docs
			}
		})
		.catch(err => next(err))
};

exports.removeProject = (req, res, next) => {
	project.removeProject(req.params.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Invalid id'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.getProject = (req, res, next) => {
	project.getProject(req.params.id)
		.then(r => {
			if (r.id === null) {
				return next(["Could not retrieve project", 'Invalid id'])
			}
			else{
				res.send({project: r[0]})
			}
		})
		.catch(err => next(err))
};

exports.getProjects = (req, res, next) => {
	project.getProjectList()
		.then(r => {
			if (r.id === null) {
				return next(["Could not retrieve project", 'Invalid id'])
			}
			else{
				res.send({projects: r})
			}
		})
		.catch(err => next(err))
};

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
				// res.send({discussions: format.discussion(r)})
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
					el.tags = _.split(el.tags, ',')
				})
				res.send({openings: r})
			}
		})
		.catch(err => next(err))
};

// ------------------ Upvotes ------------------
exports.getProjectLikes = (req, res, next) => {
	project.getProjectLikes(req.params.id)
		.then(r => {
			res.send({ upvotes :{
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
