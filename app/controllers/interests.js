
const interests = require('../models/interests'),
    _ = require('lodash');

exports.getList = (req, res, next) => {
	interests.getList()
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Nothing found'])
			}
			else{
				res.send({interests: r.map(e => e.name)})
			}
		})
		.catch(err => next(err))
};
