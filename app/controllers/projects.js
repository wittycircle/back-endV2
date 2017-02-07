const project = require('../models/projects'),
    _ = require('lodash');

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
};

exports.likeProject = (req, res, next) => {
	project.likeProject(req.params.id, req.user.id)
	.then(r => {
        if (!_.isEmpty(r))
            res.send({success: true})
        else
            res.send({success: false})
    }).catch(err => next(err))
};

exports.unlikeProject = (req, res, next) => {
	project.unlikeProject(req.params.id, req.user.id)
	.then(r => {
		if (r)
            res.send({success: true});
		else 
			res.send({success: false})
    })
};