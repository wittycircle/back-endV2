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
exports.activate = (token, email) => {
	return h_exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.USERS).update({valid : 1}).where('email', email)
		}
	})
};

exports.registrer = (data) => {
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
	return h_exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.PROFILES).insert(profile_data)
			.then((profileId) => {
				user_data.profile_id = profileId[0];
				return db(TABLES.USERS).insert(user_data)
			})
		}
	})
};

exports.resetPassword = (token, email) => {
	return h_exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.USERS).update({password: password})
				.where({email: email})
		}
	})
};

exports.recoverPassword = (email) => {
	return h_exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "Invalid email"
		else {
			return {}
		}
	})
};

exports.updatePassword = (token, email) => {
	return h_exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.USERS).update({password: password})
				.where({email: email})
		}
	})
};

