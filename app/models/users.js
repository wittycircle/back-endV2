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

// ----
exports.getUsers = () => {
    return db.distinct(['users.id', 'profile_id', 'users.username',//this line from user, rest from profile
	    'first_name', 'last_name', 'profession',
		'description', 'location_city', 'location_state', 'location_country',
		'profile_picture', 'about', 'genre', 'creation_date', 'cover_picture',
		'views', 'profile_picture_icon', 'cover_picture_cards'])
	    .from(TABLES.USERS)
	    .innerJoin(TABLES.USER_PROFILES,'users.profile_id', 'profiles.id')
	    .orderBy('username')
};

exports.getUser = (id) => {
    return db.select(['users.id', 'email', 'profile_id', 'users.username',//this line from user, rest from profile
	    'first_name', 'last_name', 'profession',
		'description', 'location_city', 'location_state', 'location_country',
		'profile_picture', 'about', 'genre', 'creation_date', 'cover_picture',
		'views', 'profile_picture_icon', 'cover_picture_cards'])
	    .from(TABLES.USERS)
	    .where({'users.id': id})
	    .join(TABLES.USER_PROFILES, 'users.profile_id', 'profiles.id')
}

exports.getProfiles = () => {
	return db.from(TABLES.USER_PROFILES)
			.orderBy('views', 'desc')
			.select()
}

//CARD PROFILE THING [maybe move to a card.js in models]
    // pool.query('SELECT user_id FROM user_skills WHERE user_id IN (SELECT user_id FROM user_experiences GROUP BY user_id)' +
    //     'GROUP BY user_id',

// pool.query("SELECT id FROM profiles 
// WHERE id IN (SELECT profile_id FROM users WHERE id IN (" + arr + ")) && (DESCRIPTION != '' && DESCRIPTION is not null)",

// pool.query('SELECT id, first_name, last_name, description, location_city, 
// location_state, location_country, profile_picture, about, cover_picture_cards FROM `profiles` 
// WHERE id IN (' + arr2 + ') && profile_picture is not null && fake = 0 ORDER BY rand()', 

				// pool.query('SELECT count(*) as followers FROM user_followers
				//  WHERE follow_user_id IN (SELECT id FROM users WHERE profile_id = ?)', data[index].id,


				        // pool.query('SELECT count(*) as following FROM user_followers WHERE user_id IN
				        //  (SELECT id FROM users WHERE profile_id = ?)', data[index].id,

// pool.query('SELECT id, username FROM users WHERE profile_id = ?', data[index].id,

//pool.query('SELECT skill_name FROM user_skills WHERE user_id IN
// (SELECT id FROM users WHERE profile_id = ?)', data[index].id,


// pool.query('SELECT rank FROM rank_of_the_day WHERE user_id = ?',  row[0].id,
// 

exports.test = () => {
	// return db(TABLES.USERS).select('id', "count('id')")
	return db.count('p.id as id')
			.from( TABLES.USER_PROFILES)
			.join(TABLES.USERS + ' as p', 'p.profile_id', 'profiles.id')//.on('p.profile_id', 'profiles.id')
			// .from(TABLES.USERS)
}

exports.CardProfile = () => {
	return db.count('user_followers.id as followers')
			.count('')
			.select(['users.user_id', 'users.profiles_id',
					'skills.user_id', 'experiences.user_id',
		'profiles.id', 'profiles.first_name', 'profiles.last_name', 'profiles.description',
		'profiles.location_city', 'profiles.location_state', 'profiles.location_country',
		'profiles.profile_picture', 'profiles.about', 'profiles.cover_picture_cards',
		db.raw('SELECT count(*) as followers FROM user_followers'),
		db.raw('SELECT count(*) as following FROM user_followers WHERE user_id' +
			'IN (SELECT id FROM users WHERE profile_id')])
			.from(TABLES.USERS).as('users')
			.join(TABLES.USER_PROFILES).as('profiles')
			.join(TABLES.USER_SKILLS).as('skills')
			.join(TABLES.USER_EXPERIENCES).as('experiences')
}

exports.getIdFromSkills = () => {
	return db.select(['user_id'])
			.from(TABLES.USER_SKILLS)
			.whereIn('user_id', function() {
				this.select(['user_id'])
					.from(TABLES.USER_EXPERIENCES)
					.groupBy('user_id')
			}).groupBy('user_id')
}

exports.getIdFromProfiles = (arr) => {
	return db.select(['id'])
			.from(TABLES.USER_PROFILES)
			.whereIn('id', function () {
				this.select(['profile_id'])
				.from(TABLES.USERS)
				.whereIn('id', arr)
				.andWhere('description', '!=', '')
			})
}

exports.getInfoFromProfile = (arr) => {
	return db.select(['id', 'first_name', 'last_name', 'description',
		'location_city', 'location_state', 'location_country',
		'profile_picture', 'about', 'cover_picture_cards'])
		.from(TABLES.USER_PROFILES)
		.whereIn('id', arr)
		.andWhere('fake', '=', 0)
		.andWhere('profile_picture', '!=', 'null')
}
//-------------

exports.getUserByEmail = (email) => {
    return db.select(['id', 'profile_id']).from(TABLES.USERS).where({email: email});
}
//===****==