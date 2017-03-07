const articles = require('../models/article'),
    _ = require('lodash');

exports.createArticle = (req, res, next) => {
	articles.createArticle(req.body)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad body [title, text, tags]'])
			}
			else{
				res.send({id : r[0]})
			}
		})
		.catch(err => next(err))
};


