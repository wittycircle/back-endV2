'use strict';

const { db, TABLES } = require('./index'),
	_ = require('lodash'),
	h = require('./helper'),
	socialServices = require('../controllers/social');
// ------------------ Little helpers ------------------
// const checkUsername = (exports.checkUsername = username => {
// 	return db(TABLES.USERS).select('username').whereIn('username', username);
// });

const checkUsername = (exports.checkUsername = username => {
	return db(TABLES.USERS)
		.count('username as number')
		.where('username', 'like', '%' + username + '%');
});

const checkInviteLink = (exports.checkInviteLink = invite_link => {
	return db(TABLES.USERS)
		.count('invite_link as number')
		.where('invite_link', 'like', '%' + invite_link + '%');
});

const createUsernameAndInviteLink = (first, last) => {
	let username 	= first.replace(/\s+/g, '') + '.' + last.replace(/\s+/g, '')
	let invite_link = first.replace(/\s+/g, '') + last.replace(/\s+/g, '') + '_W'

	return checkUsername(username)
		.then(r => {
			return checkInviteLink(invite_link)
				.then(r2 => {
					return {
						username 	: r[0].number ? username + r[0].number : username,
						invite_link : invite_link + (r2[0].number + 1)
					}
				})
		});
}


// ------------------ Main methods ------------------
exports.activate = token => {
	return db(TABLES.ACCOUNT_VALIDATION)
		.select('email')
		.where('token', token)
		.then(r => {
			if (!r.length) {
				return 'Bad token';
			} else {
				return Promise.all([
					db(TABLES.USERS).first('email').where('email', r[0].email),
					db(TABLES.USERS).update({ valid: 1 }).where('email', r[0].email),
					db(TABLES.ACCOUNT_VALIDATION).del().where('token', token)
				]);
			}
		});
};
// ------------------ Social [google/facebook] ------------------
const cloudinary = require('cloudinary');
const config = require('../private');
cloudinary.config(config.cloudinary);

const upload = token => {
	var photo = '';
	const index = token.indexOf('sz=');
	if (index >= 0) {
		photo = token.substring(0, index) + 'sz=200';
	} else {
		photo =
			'https://graph.facebook.com/me/picture?width=200&height=200&access_token=' +
			token;
	}
	return new Promise(resolve =>
		cloudinary.uploader.upload(photo, result => resolve(result.secure_url), {
			width: 200,
			height: 200,
			crop: 'fill',
			format: 'jpg',
			gravity: 'face'
		})
	);
};

const queryString = require('query-string');

const wrapUrl = (rawUrl, opts) => {
	const query = queryString.parse(rawUrl.match(/\?(.*)/));
	const search = queryString.stringify(Object.assign({}, query, opts));
	return rawUrl.replace(/\?(.*)/, `?${search}`);
};

const social_helper = {
	// Ici changement
	facebook: data =>
		upload(data.accessToken).then(result => {
			//      console.log('data', data);
			//      console.log('data.photos', data.photos);
			//      console.log('UPLOAD result', result);
			// return account.checkUsername(data.displayName)
			return createUsernameAndInviteLink(data.name.givenName, data.name.familyName).then(r => {
				return {
					profile: {
						facebook_id 	: data.id,
						facebook_url 	: data.profileUrl,
						first_name 		: data.name.givenName,
						last_name 		: data.name.familyName,
						picture 		: result || data.photos[0].value
					},
					user: {
						email 			: data.emails[0].value,
						username 		: r.username,
						invite_link 	: r.invite_link
					}
				};
			});
		}),
	google: data => {
		// Ici Changement
		data = JSON.parse(data._raw);
		return upload(data.image.url).then(result => {
			return createUsernameAndInviteLink(data.name.givenName, data.name.familyName).then(r => {
				return  {
					profile: {
						google_id 		: data.id,
						google_url 		: data.url,
						first_name 		: data.name.givenName,
						last_name 		: data.name.familyName,
						picture 		: result
					},
					user: {
						email 			: data.emails[0].value,
						username 		: r.username,
						// password: '',
						invite_link 	: r.invite_link
					}
				};
			});
		});
	}
};

const chooseOrigin = (origin, helper) => {
	let ret = {};
	if (origin == 'facebook') {
		ret.facebook_id = helper.profile.facebook_id;
		ret.facebook_url = helper.profile.facebook_url;
	} else if (origin == 'google') {
		ret.google_id = helper.profile.google_id;
		ret.google_url = helper.profile.google_url;
	}
	return ret;
};
// ------------------ VERIFY INVITE ------------------

const verifyUser = email => {
	return db(TABLES.INVITATION)
		.select('user_id')
		.where('mail_to', email)
		.then(r => {
			if (r.length) {
				return db(TABLES.INVITATION).update('status', 1).where('mail_to', email);
			}
			return null;
		});
};

// const checkdata = () => {
// 				console.log('\x1b[33m%s\x1b[0m', 'HELLLO DATA 3 ======>');
// 				return null;
// }

const newUser = (req, data, helper, origin) => { // Add data to autofollow friends
	const profileInsert = {
		first_name 	: helper.profile.first_name,
		last_name 	: helper.profile.last_name,
		picture 	: helper.profile.picture,
		network_id	: 1
	},
	socialInsert 				= chooseOrigin(origin, helper);
	helper.user.password 		= ''
	profileInsert.cover_picture = ''

	return db(TABLES.USERS).insert(helper.user).then(([id]) => {
		socialInsert.user_id = id;
		profileInsert.user_id = id;

		console.log('NEW checkpoint A');
		return Promise.all([
			db(TABLES.USER_SOCIALS).insert(socialInsert),
			db(TABLES.PROFILES).insert(profileInsert),
			verifyUser(helper.user.email),
			db(TABLES.RANK).insert({ user_id: id, rank: id }),
			db(TABLES.RANK_POINTS).insert({ user_id: id, points: 300 }),
			socialServices.autoFollowSocials(req, id, data, origin)
		]).then(r => {
			console.log(r);
			return {
				id: id,
				email: helper.user.email
			};
		}).catch(function(err) {
		  console.log(err); // some coding error in handling happened
		});
	});
};

const modifyUser = (helper, origin, user) => {
	let u_obj = chooseOrigin(origin, helper);
	//  console.log('user', user);
	console.log('MODIFY checkpoint A')
	return db(TABLES.USER_SOCIALS)
		.update(u_obj)
		.where({ user_id: user.id })
		.then(r => {
			return {
				id: user.id,
				email: helper.user.email
			};
		});
};

exports.socialRegister = (req, data, origin) => {
	return social_helper[origin](data).then(helper => {
		return db(TABLES.USERS)
			.first(['id'])
			.where({ email: helper.user.email })
			.then(r => {
				if (r) {
					return modifyUser(helper, origin, r);
				} else {
					return newUser(req, data, helper, origin); // Add data to autofollow friends			
				}
			});
	});
};

// ------------------ Main methods ------------------

//helpers register

const permission = id => {
	return db.batchInsert(TABLES.NOTIF_PERM, [
		{ notif_type: 'profile_view', user_id: id },
		{ notif_type: 'user_follow', user_id: id },
		{ notif_type: 'follow_project', user_id: id },
		{ notif_type: 'feedback', user_id: id },
		{ notif_type: 'ask_project', user_id: id },
		{ notif_type: 'reply_project', user_id: id },
		{ notif_type: 'new_message', user_id: id }
	]);
};

exports.register = (data, token) => {
	//  console.log('data', data);
	let profile_data = {
		first_name: data.first_name,
		last_name: data.last_name,
		loc_id: 1,
		network_id: 1
	},
		user_data = {
			email: data.email,
			password: data.password,
			username: data.username,
			invite_link: data.invite_link
		};
	return Promise.all([
		h.exist(TABLES.USERS, data.email, 'email'),
		h.exist(TABLES.USERS, data.username, 'username')
	]).then(([r, r2]) => {
		if (r.length || r2.length) {
			throw r.length ? 'Email already taken' : 'username already taken';
		} else {
			return db(TABLES.USERS).insert(user_data).then(user => {
				profile_data.user_id = user[0];
				return Promise.all([
					db(TABLES.PROFILES).insert(profile_data),
					verifyUser(data.email),
					permission(user[0]),
					db(TABLES.USER_SOCIALS).insert({ user_id: user[0] }),
					db(TABLES.RANK).insert({ user_id: user[0], rank: user[0] }),
					db(TABLES.RANK_POINTS).insert({ user_id: user[0], points: 300 }),
					db(TABLES.ACCOUNT_VALIDATION).insert({
						email: data.email,
						token: token
					})
				]).then(allR => {
					//          console.log('allR', allR);
					return db(TABLES.USERS)
						.select('id')
						.where('id', user[0])
						.then(r => [r, allR[1]]);
				});
			});
		}
	});
};

exports.resetPassword = (token, password) => {
	return db(TABLES.RESET_PASSWORDS)
		.first('user_id')
		.where({ token: token })
		.then(r => {
			if (!r) throw 'bad token';
			else {
				return Promise.all([
					db(TABLES.USERS).update({ password }).where('id', r.user_id),
					db(TABLES.RESET_PASSWORDS).del().where({ token })
				]);
			}
		});
};

exports.recoverPassword = (email, token) => {
	return db(TABLES.USERS).first('id').where('email', email).then(user => {
		if (!user) return 'Invalid email';
		else {
			return db(TABLES.RESET_PASSWORDS).insert({
				email: email,
				user_id: user.id,
				token: token
			});
		}
	});
};

exports.updatePassword = (password, uid) => {
	return h.exist(TABLES.USERS, uid).then(r => {
		if (!r.length) return 'bad user id';
		else {
			return db(TABLES.USERS).update({ password: password }).where({ id: uid });
		}
	});
};

exports.updateInformations = (data, uid) => {
	return h.exist(TABLES.USERS, uid).then(r => {
		if (!r.length) return 'bad user id';
		else {
			return db(TABLES.USERS).update(data).where({ id: uid });
		}
	});
};
