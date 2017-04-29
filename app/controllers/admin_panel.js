const panel = require('../models/admin_panel'),
      // mailer = require('../services/mailer'),
      crypto = require('crypto'),
    _ = require('lodash');

exports.projectsInvite = (req, res, next) => {
	panel.projectsInvite(req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad id'])
			}
			else{
				r.forEach(e => e.created_by = e.user_id == 1 ? 'Quentin': 'Olivier')
				res.send({project_list: r})
			}
		})
		.catch(err => next(err))
};

exports.inviteProjects = (req, res, next) => {
	const token = crypto.randomBytes(40).toString('hex')
	panel.inviteProjects(req.user.id, req.body.id, token)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad id'])
			}
			else{
				mailer.stuff({email: req.body.email, id: req.body.id, token : token, name: req.body.name})
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.updateCreator = (req, res, next) => {
	panel.updateCreator(req.user.id, req.params.token)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Could not set as creator'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

