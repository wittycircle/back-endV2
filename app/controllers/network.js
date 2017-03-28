const network = require('../models/network'),
    _ = require('lodash');

const allowed = 'Allowed: [networks, profile, project, unviersity]'

exports.getNetwork = (req, res, next) => {
	network.getNetwork(req.params.from)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, allowed])
			}
			else{
				let key = req.params.from
				res.send({key : r.map(e => e.network)})
			}
		})
		.catch(err => next(err))
};

exports.createNetwork = (req, res, next) => {
	network.createNetwork(req.params.from, req.body)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, allowed])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
