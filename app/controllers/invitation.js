const invitation = require('../models/invitation'),
    mailer = require('../services/mailer');
    _ = require('lodash');

exports.getInvitation = (req, res, next) => {
	invitation.getInvitation(req.params.invite_id)
		.then(r => {
			if (!r || !r.length || typeof r === 'string') {
				return next([r, 'Bad id'])
			}
			else{
				res.send({informations: r})
			}
		})
		.catch(err => next(err))
};

exports.addInvitation = (req, res, next) => {
	invitation.addInvitation(req.user.id, req.body.mail)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad id'])
			}
			else{
				mailer.invite_user({uid: req.user.id, mailList: req.body.mail})
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.fromUser = (req, res, next) => {
	invitation.fromUser(req.params.invite_id, req.body.email)
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