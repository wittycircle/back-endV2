const project = require('../models/projects'),
    _ = require('lodash');


// exports.getProjectLikes = (req, res, next) => {
// 	project.t1(req.params.id)
// 	.then(r => {
// 		r.profiles = 
// 	})
// }
exports.getProjectLikes = (req, res, next) => {
	project.getProjectLikes(req.params.id)
		.then(r => {
			res.send({
				count: r.length,
				profiles: r,
			})
		})
		.catch(err => next(err))
}