'use strict';

const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');
// ------------------ Little helpers ------------------
exports.checkUsername = (username) => {
	return db(TABLES.USERS)
			.select('username')
			.whereIn('username', username)
};

// ------------------ Main methods ------------------
exports.activate = (token) => {
	return db(TABLES.ACCOUNT_VALIDATION).select('user_email').where('token', token)
	.then((r) => {
		if (!r.length){
			return "Bad token"
		} else{
			return Promise.all([
				db(TABLES.USERS).update({valid : 1}).where('email', r[0].user_email),
				db(TABLES.ACCOUNT_VALIDATION).del().where('token', token)
				]);
		} 
	});
};

exports.register = (data, token) => {
	let profile_data = {
		first_name: data.first_name,
		last_name: data.last_name,
		username: data.username,
	},
	user_data = {
		email: data.email,
		password: data.password,
		username: data.username,
	};

	return h.exist(TABLES.USERS, "data.email", 'email').then(r => {
		if (r.length)
			return "Email already taken"
		else {
			return db(TABLES.USER_PROFILES).insert(profile_data)
			.then((profileId) => {
				user_data.profile_id = profileId[0];
				return db(TABLES.USERS).insert(user_data)
					.then((uid) => {
						return db(TABLES.ACCOUNT_VALIDATION)
							.insert({user_email: data.email, token: token})
					});
			});
		}
	})
};

exports.resetPassword = (token, email) => {
	return h.exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.USERS).update({password: password})
				.where({email: email})
		}
	})
};

exports.recoverPassword = (email) => {
	return h.exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "Invalid email"
		else {
			return {success: true}
		}
	})
};

exports.updatePassword = (token, email) => {
	return h.exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.USERS).update({password: password})
				.where({email: email})
		}
	})
};

