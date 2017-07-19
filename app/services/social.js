/**
 * Created by rdantzer on 06/05/17.
 */

'use strict';

const config = require('../private');

const { db, TABLES } = require('../models');

const { Facebook } = require('fb'),
	FB = new Facebook({
		version: 'v2.9',
		appId: config.social_auth.facebook.clientID,
		appSecret: config.social_auth.facebook.clientSecret
	});

/***** DEPRECATED *****/
// exports.followFromFacebookId = (from, facebook_id) => 
// 	db(TABLES.USER_SOCIALS).first('user_id').where({ facebook_id }).then(r =>
// 		db(TABLES.USER_FOLLOWERS).insert({
// 			user_id: from,
// 			followed: r.id
// 		})
// 	);

/***** DEPRECATED *****/
// const followFromGoogleEmail = (from, email) =>
// 	db(TABLES.USERS)
// 		.first('id')
// 		.where({ email })
// 		.then(r => {
// 			if (r) {
// 				return db(TABLES.USER_FOLLOWERS).insert({
// 					user_id: from,
// 					followed: r.id
// 				});
// 			}
// 			return null;
// 		})
// 		.catch(console.error);

/***** DEPRECATED *****/
// exports.getFacebookFriendsId = (token, id) => {
// 	FB.setAccessToken(token);

// 	FB.api(`${id}/friends`, 'get').then(res => {
// 		if (!res.data.length) {
// 			return res.data.map(r => r.id);
// 		}
// 		return [];
// 	});
// };

const got = require('got');

exports.getLinkedinProfileInfo = profileUrl => {
	const options = {
		method: 'POST',
		headers: {
			'X-Phantombuster-Key-1': 'ZXaPEvY5JS4HhCa8mI3GF0KskJvl6TNJ'
		},
		json: true,
		body: false
	};
	const profile = '{ "profile":"' + profileUrl.toString() + '"}';
	const query = `https://phantombuster.com/api/v1/agent/1031/launch?output=first-result-object&argument=${profile}&saveArgument=false`;
	return got(query, options).then(response => response.body.data.resultObject);
};

exports.gmailContactsCampaign = token =>
	got(
		`https://www.google.com/m8/feeds/contacts/default/full?alt=json&oauth_token=${token}&max-results=10000`,
		{ json: true }
	)
		.then(response => response.body)
		.then(body =>
			body.feed.entry
				.filter(e => typeof e['gd$email'] !== 'undefined')
				.map(e => e['gd$email'][0].address)
		);
