const account = require('../models/account'),
	bcrypt = require('bcrypt-nodejs'),
	mailer = require('../services/mailer'),
	crypto = require('crypto'),
	_ = require('lodash');

// ------------------ Little helpers ------------------
const checkRegisterData = data => {
	let nd = {
		//new_data
		username 	: null,
		password 	: bcrypt.hashSync(data.password),
		first_name 	: data.first_name.replace(/\s+/g, ''),
		last_name 	: data.last_name.replace(/\s+/g, ''),
		email 		: data.email,
		invite_link : null
	};
	// let a_username = [];
	// for (let i = nd.first_name.length; i > 0; i--) {
	// 	a_username.push(nd.first_name.slice(0, i) + '.' + nd.last_name);
	// }
	// for (let i = nd.last_name.length - 1; i > 0; i--) {
	// 	a_username.push(nd.first_name + '.' + nd.last_name.slice(0, i));
	// }
	const a_username 	= nd.first_name + '.' + nd.last_name
	const invite_link 	= nd.first_name + nd.last_name + '_W'

	return account.checkUsername(a_username).then(r => {
		return account.checkInviteLink(invite_link).then(r2 => {
			nd.username  	= a_username + r[0].number
			nd.invite_link 	= invite_link + r2[0].number

			return nd;
		})
	});
};
// ------------------ Main methods ------------------

exports.register = (req, res, next) => {
	const token = crypto.randomBytes(20).toString('hex');
	checkRegisterData(req.body.account).then(data => {
		account
			.register(data, token)
			.then(([r, verify]) => {
				/*mailer.validate_account({
					token: token,
					email: req.body.account.email
				});*/
                  mailer.welcome({ email: req.body.account.email, token: token });

				if (verify) {
					req.broadcastEvent('add_points', {
						user_id: verify[0],
						points: 500
					});
				}
				req.broadcastEvent('user_register', { id: r[0].id });
				res.send({ success: true }).status(200);
			})
			.catch(err => next([err, 'Bad info']));
	});
};

exports.activate = (req, res, next) => {
	account
		.activate(req.params.token)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad token']);
			} else {
				res.send({ success: true });
			}
		})
		.catch(err => next(err));
};

exports.resetPassword = (req, res, next) => {
	const password = bcrypt.hashSync(req.body.password);
	account
		.resetPassword(req.params.token, password)
		.then(r => {
			res.send({ success: true });
		})
		.catch(err => next([err, 'Failed request']));
};

exports.recoverPassword = (req, res, next) => {
	const token = crypto.randomBytes(20).toString('hex');
	account
		.recoverPassword(req.body.email, token)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad format']);
			} else {
				mailer.reset_password({ token: token, email: req.body.email });
				res.send({ success: true });
			}
		})
		.catch(err => next(err));
};

exports.updatePassword = (req, res, next) => {
	account
		.updatePassword(bcrypt.hashSync(req.body.password), req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad format [password]']);
			} else {
				res.send({ success: true });
			}
		})
		.catch(err => next(err));
};

exports.updateInformations = (req, res, next) => {
	delete req.body.password;
	account
		.updateInformations(req.body, req.user.id)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad fields']);
			} else {
				res.send({ success: true });
			}
		})
		.catch(err => next(['Username already taken']));
};
