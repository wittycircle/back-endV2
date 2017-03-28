const network = require('../models/network'),
    _ = require('lodash');


exports.getNetwork = (req, res, next) => {
	network.getNetwork(req.params.from)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Allowed: [profile, project, unviersity]'])
			}
			else{
				let key = req.params.from
				res.send({key : r.map(e => e.network)})
			}
		})
		.catch(err => next(err))
};

