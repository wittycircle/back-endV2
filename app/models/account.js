'use strict';

const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');

exports.activate = (token, email) => {
	return h_exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.USERS).update({valid : 1}).where('email', email)
		}
	})
};

exports.registrer = (details) => {
	return h_exist(TABLES.USERS, email, 'email').then(r => {
		if (!r.length)
			return "bad email"
		else {
			return db(TABLES.USERS).insert(details)
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

