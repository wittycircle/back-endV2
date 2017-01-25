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

exports.getProfiles = () => {
	return db.from(TABLES.USER_PROFILES)
			.orderBy('views', 'desc')
			.select()
}

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



// common from sortcard
// pool.query('SELECT count(*) as followers FROM user_followers
 // WHERE follow_user_id IN (SELECT id FROM users WHERE profile_id = ?)', data[index].id,

// pool.query('SELECT count(*) as following FROM user_followers WHERE user_id IN (SELECT id FROM users WHERE profile_id = ?)', data[index].id,
// pool.query('SELECT id, username FROM users WHERE profile_id = ?', data[index].id,
// pool.query('SELECT skill_name FROM user_skills WHERE user_id IN (SELECT id FROM users WHERE profile_id = ?)', data[index].id,
// pool.query('SELECT rank FROM rank_of_the_day WHERE user_id = ?', row[0].id,

let sortCardProfile = () => {
	let follower = db.select('user_id').count('user_id as total')
	.from(TABLES.USER_FOLLOWERS).groupBy('user_id').as('ssu')

	let following = db.select('follow_user_id').count('follow_user_id as MA')
	.from(TABLES.USER_FOLLOWERS).groupBy('follow_user_id').as('su')

	return db.select(['r.rank as myRank', 'u.id', 'u.username',
		 db.raw('IFNULL(total, 0) as following'), db.raw('IFNULL (MA, 0) as follower'),
		 db.raw('GROUP_CONCAT(DISTINCT skill_name) as skills') ])
		.from(TABLES.USERS + ' as u')
		.join(TABLES.USER_SKILLS + ' as s', 'u.id', 's.user_id')
		.join(TABLES.RANK + ' as r', 'u.id', 'r.user_id')
		.leftOuterJoin(follower, 'ssu.user_id', 'u.id')
		.leftOuterJoin(following, 'su.follow_user_id', 'u.id')
		.groupBy('u.id')
		.orderByRaw('RAND()')

}	

exports.cardProfile = () => {
	let exp = db.select('user_id')
		.from(TABLES.USER_EXPERIENCES).as('e')

	let sort = sortCardProfile().as('sort')

return db.select(['sort.*', 'p.description', 'p.id', 'p.first_name', 'p.last_name', 'p.description',
		'p.location_city', 'p.location_state', 'p.location_country',
		'p.profile_picture', 'p.about', 'p.cover_picture_cards',
			])
			.from(TABLES.USERS + ' as u')
			.join(TABLES.USER_PROFILES + ' as p', 'u.profile_id', 'p.id')
			.join(sort, 'sort.id', 'u.id')
			.where('p.description', '!=', 'NULL')
			.andWhere('p.profile_picture', '!=', 'NULL')
			.andWhere('p.fake', '=', '0')
}

exports.savesave = () => {
		let follower = db.select('id', 'user_id').count('user_id as total')
	.from(TABLES.USER_FOLLOWERS).groupBy('user_id').as('ssu')


	let following = db.select('id', 'follow_user_id').count('follow_user_id as MA')
	.from(TABLES.USER_FOLLOWERS).groupBy('follow_user_id').as('su')

return db.select(['u.id', 'u.username', 's.user_id',
		's.user_id', 'e.user_id', 'p.username',
		'p.id', 'p.first_name', 'p.last_name', 'p.description',
		'p.location_city', 'p.location_state', 'p.location_country',
		'p.profile_picture', 'p.about', 'p.cover_picture_cards', 'r.rank as myRank', 
		db.raw('IFNULL(total, 0) as following'), db.raw('IFNULL (MA, 0) as follower'),
		 db.raw('GROUP_CONCAT(DISTINCT skill_name ) as skills'),
		 	])
			.from(TABLES.USERS + ' as u')
			.join(TABLES.USER_PROFILES + ' as p', 'p.id', 'u.profile_id')
			.join(TABLES.USER_SKILLS + ' as s', 'u.id', 's.user_id')
			.join(TABLES.USER_EXPERIENCES + ' as e', 's.user_id', 'e.user_id')
			.join(TABLES.RANK + ' as r', 'u.id', 'r.user_id')
			.leftOuterJoin(follower, 'ssu.user_id', 'u.id')
			.leftOuterJoin(following, 'su.follow_user_id', 'u.id')
			.where('p.description', '!=', 'NULL')
			.andWhere('p.profile_picture', '!=', 'NULL')
			.andWhere('p.fake', '=', '0')
			.groupBy('u.id')
			.orderByRaw('RAND()')
}

exports.cardProfilePlus = (arr) => {
	return db.select(['id', 'first_name', 'last_name', 'description',
					'location_city', 'location_state', 'location_country',
					'profile_picture', 'about', 'cover_picture_cards'])
			.from(TABLES.USER_PROFILES)
			.whereNotIn('id', [arr])
			.andWhere('profile_picture', '!=', 'NULL')
			.andWhere('fake = 0')
			.orderByRaw('RAND()')
			.limit(100)
}
//-------------

exports.getUserByEmail = (email) => {
    return db.select(['id', 'profile_id']).from(TABLES.USERS).where({email: email});
}
//===****==