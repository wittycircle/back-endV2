const panel = require('../models/admin_panel'),
mailer = require('../services/mailer'),
crypto = require('crypto'),
_ = require('lodash');

exports.projectsInvite = (req, res, next) => {
	panel
	.projectsInvite(req.user.id)
	.then(r => {
		r.forEach(e => (e.created_by = e.user_id == 1 ? 'Quentin' : 'Olivier'));
		res.send({ project_list: r });
	})
	.catch(err => next([err, 'bad id']));
};

exports.inviteProjects = (req, res, next) => {
	const token = crypto.randomBytes(40).toString('hex');
	panel
	.inviteProjects(req.user.id, req.body.id, token)
	.then(r => {
		mailer.admin_invite({
			uid: req.user.id,
			email: req.body.email,
			token: token
		});
		res.send({ success: true });
	})
	.catch(err =>
		next([
			err.code ? 'Duplicate, project_id already invited' : err,
			'Unable to invite'
			])
		);
};

exports.updateCreator = (req, res, next) => {
	panel
	.updateCreator(req.user.id, req.params.token)
	.then(r => {
		res.send({ success: true });
	})
	.catch(err => next([err, 'Unable to set as creator']));
};

exports.getAmbassadors = (req, res, next) => {
	panel
		.getAmbassadors()
		.then(r => {
			res.send({ profiles: r });
		});
};

exports.setAmbassador = (req, res, next) => {
	panel
		.setAmbassador(req.body.id)
		.then(r => {
			res.send({ success: true });
		})
};

exports.removeAmbassador = (req, res, next) => {
	panel
		.removeAmbassador(req.body.id)
		.then(r => {
			res.send({ success: true });
		})
};

exports.getProjects = (req, res, next) => {
	panel
		.getProjects()
		.then(r => {
			res.send({ projects: r });
		})
};

exports.getUsers = (req, res, next) => {
	panel
		.getUsers()
		.then(r => {
			res.send({ users: r });
		})
};


//PROJECTS && PROFILES ADDED BY ADMIN

exports.getPPAddByAdmin = (req, res, next) => {
	panel.getPPAddByAdmin(req.params.type)
		.then(r => {
			res.send({ results: r })
		});
} 

exports.addPPByAdmin = (req, res, next) => {
	let data = { type: req.params.type, public_id: req.body.public_id, user_id: null },
		username = req.body.username;

	panel.addPPByAdmin(data, username)
		.then(r => {
			res.send({ success: true });
		});
}

exports.removePPAddByAdmin = (req, res, next) => {
	const data = { type: req.params.type, public_id: req.body.public_id, user_id: null },
		username = req.body.username;

	panel.removePPAddByAdmin(data, username)
		.then(r => {
			res.send({ success: true });
		});
}
