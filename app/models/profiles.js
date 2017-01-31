/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';

const {db, TABLES} = require('./index'),
    user = require('./users');

exports.updateProfileFromUser = (body, id) => {
	return db.update(body)
		.whereIn('id', function() {
			this.select('profile_id').from(TABLES.USERS).where({'id':id})
		}).from(TABLES.USER_PROFILES)
	}
 
exports.updateProfilePicture = (body, id) => {
	return db(TABLES.USER_PROFILES)
		.update(body)
		.where({'id': id})
}
