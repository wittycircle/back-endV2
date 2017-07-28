const invitation = require('../models/invitation'),
	mailer = require('../services/mailer');
_ = require('lodash');

exports.getInvitation = (req, res, next) => {
	invitation
		.getInvitation(req.params.invite_id)
		.then(r => {
			res.send({ informations: r });
		})
		.catch(err => next([err, 'bad id']));
};

exports.addInvitation = (req, res, next) => {
	invitation
		.addInvitation(req.user.id, req.body.mail)
		.then(r => {
			if (typeof r === 'string') {
				res.send({ success: true, status: r });
			} else {
				mailer.invite_user({ uid: req.user.id, mailList: r, type: 'invite_user' });
				res.send({ success: true });
			}
		})
		.catch(err => next([err, 'bad id']));
};

exports.fromUser = (req, res, next) => {
	invitation
		.fromUser(req.params.invite_id, req.body.email)
		.then(r => {
			res.send({ success: true });
		})
		.catch(err => next([err, 'bad id']));
};

//new incoming kreator
exports.addInvitationNik = (req, res, next) => {
	if (req.get('x-api-token') != 'LaChaussetteDesGensTriggerants') {
		return res.send({ success: false });
	}
	const authorized = [1, 8];
	const user = +req.body.from;
	if (!authorized.includes(user)) return res.send({ success: false });

	invitation
		.addInvitation(user, req.body.mail)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad id']);
			} else {
				mailer.invite_user({
					uid: user,
					mailList: req.body.mail,
					category: 'github'
				});
				res.send({ success: true });
			}
		})
		.catch(err => next(err));
};

exports.googleAuthInvitation = (req, res, next) => {
	invitation
		.inviteFromGmailAuthContacts(req.user.id)
		.then(r => {
			if (r.length) {
				mailer.invite_user({ uid: req.user.id, mailList: r, type: 'gmail_auth' });
				res.send({ success: true });
			}
		})
};
