const account = require('../models/account'),
    _ = require('lodash');	

exports.activate = (req, res, next) => {
	account.activate(req.body.token, req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad token'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.register = (req, res, next) => {
	account.register(req.body.account)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad info [email or password]'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.resetPassword = (req, res, next) => {
	account.resetPassword(req.body.token, req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad token'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.recoverPassword = (req, res, next) => {
	account.recoverPassword(req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad format'])
			}
			else{
 //			***	SEND RECOVER EMAIL	***
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.updatePassword = (req, res, next) => {
	account.updatePassword(req.body.password, req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad format [password]'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
