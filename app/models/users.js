/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';
//TO_DO: create associated test, using mocha or avajs

const { db, TABLES } = require('./index');

// const getProfileOfUser = (id) => {
//     return db.from(TABLES.USER_PROFILES).where({id: id});
// };

exports.getUserShare = (id) => {
	return db.select(['social_share'])
			.from(TABLES.USERS).where({'id': id});
};

exports.updateUserShare = (id) => {
    return db.update({social_share: 1})
    		.from(TABLES.USERS)
    		.where({id: id});
};

exports.getUsersValidateMail = (token) =>  {
	return db.select(['user_email'])
			.from(TABLES.ACCOUNT_VALIDATION)
			.where({token:token})
}

//ValidateAccount
exports.getToken = (token) => {
	return db.select(['token'])
			.from(TABLES.ACCOUNT_VALIDATION)
			.where({token: token})
}

exports.updateValidEmail = (email) => {
	return db.update({valid: 1})
			.from(TABLES.USERS)
			.where({email: email})
			.limit(1)
}

exports.deleteValidationToken = (token) => {
	return db.del()
			.where({token: token})
			.from(TABLES.ACCOUNT_VALIDATION)
}
//----
//Log 

 exports.getFirstLog = (id) => {
 	return db.select(['value'])
 			.from(TABLES.FIRST_LOG)
 			.where({user_id: id})
 }

exports.updateFirstLog = (id) => {
	return db.update({value: 1})
			.from(TABLES.FIRST_LOG)
			.where({user_id: id})
}

exports.getUserFromProfile = (id) => {
	return db.select(['id', 'username'])
			.from(TABLES.USERS)
			.where({profile_id: id})
}

exports.getProfile = (id) => {
	return db.select(['birthdate', 'description', 'genre','profile_picture',
					'location_city', 'location_state', 'location_country'])
			.from(TABLES.USER_PROFILES)
			.where({id: id})
}

exports.getProfileId = (id) => {
	return db.select(['profile_id'])
			.from(TABLES.USERS)
			.where({id: id})
}

exports.getAllFromProfile = (id) => {
	return db.select(['id', 'first_name', 'last_name', 'profession',
		'description', 'location_city', 'location_state', 'location_country',
		'profile_picture', 'about', 'genre', 'creation_date', 'cover_picture',
		'views', 'profile_picture_icon', 'cover_picture_cards'])
		.from(TABLES.USER_PROFILES)
		.where({id: id})
}
// ----
//not done still //===****==
exports.getUsers = () => {

    return db.select(['users.id', 'users.profile_id', 'users.username',
	    'profiles.id', 'profiles.first_name', 'profiles.last_name', 'profiles.profession',
		'profiles.description', 'profiles.location_city', 'profiles.location_state', 'profiles.location_country',
		'profiles.profile_picture', 'profiles.about', 'profiles.genre', 'profiles.creation_date', 'profiles.cover_picture',
		'profiles.views', 'profiles.profile_picture_icon', 'profiles.cover_picture_cards'])
	    .from(TABLES.USERS)
	    .innerJoin(TABLES.USER_PROFILES, 'users.username', 'profiles.username')
	    .limit(1);
};

// exports.getProfiles = () => {

// }

// exports.getUsers = () => {
//     return db.from(TABLES.USERS);
// };

// exports.getUserProfile = (id) => {
//     exports.getUser(id).then(user => {
//         return getProfileOfUser(user.id);
//     })
// };

exports.getUserByEmail = (email) => {
    return db.select(['id', 'profile_id']).from(TABLES.USERS).where({email: email});
}
//===****==