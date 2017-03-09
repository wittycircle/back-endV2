const articles = require('../models/article'),
    _ = require('lodash');

// ------------------ Main methods ------------------
exports.createArticle = (req, res, next) => {
	req.body.uid = req.user.id ;
	articles.createArticle(req.body)
		.then(r => {
			if (r > 0){
				res.send({success: true})
			}else {
				return next([r, 'Could not create article'])
			}
		}).catch(err => next(err))
};

exports.getArticles = (req, res, next) => {
	articles.getArticles()
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Could not find any article'])
			}
			else{
				res.send({articles: r})
			}
		})
		.catch(err => next(err))
};

exports.removeArticle = (req, res, next) => {
	articles.removeArticle(req.params.article_id, req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad article id'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};


exports.updateArticle = (req, res, next) => {
	req.body.uid = req.user.id;
	articles.updateArticle(req.body, req.params.article_id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad id'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
