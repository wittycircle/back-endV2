const network = require('../models/network'),
    _ = require('lodash');

const allowed = 'Allowed: [networks, profile, profile_network, project, unviersity]'

exports.getNetwork = (req, res, next) => {
	network.getNetwork(req.user.id, req.params.from)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, allowed])
			}
			else{
				let o = {}
				o[req.params.from] = r.map(e => e.network)
				res.send(o)
			}
		})
		.catch(err => next(err))
};

exports.getNetworkInfo = (req, res, next) => {
	if (req.params.flag != 'complete')
		return next(['Bad flag', 'allowed: [complete]'])
	network.getNetworkInfo(req.user.id, req.params.from)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, allowed])
			}
			else{
				let o = {}
				o[req.params.from] = r
				res.send(o)
			}
		})
		.catch(err => next(err))
};

exports.createNetwork = (req, res, next) => {
	network.createNetwork(req.user.id, req.params.from, req.body)
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

exports.updateNetwork = (req, res, next) => {
	network.updateNetwork(req.user.id, req.params.from, req.params.id, req.body)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'allowed'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};


exports.removeNetwork = (req, res, next) => {
	network.removeNetwork(req.user.id, req.params.from, req.params.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'allowed'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
