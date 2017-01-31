/**
 * Created by rdantzer on 18/01/17.
 */

'use strict';
//TO_DO: create associated test, using mocha or avajs

const { db, TABLES } = require('./index');

//Helper for what is exported 
const follower = db.select('user_id').count('user_id as total')
.from(TABLES.USER_FOLLOWERS).groupBy('user_id').as('ssu')

const following = db.select('follow_user_id').count('follow_user_id as MA')
.from(TABLES.USER_FOLLOWERS).groupBy('follow_user_id').as('su')

const sortCardProfile = db.select(['u.id', 'u.username', 'u.profile_id',
	 	's.user_id', 'r.rank as myRank', 
		 db.raw('IFNULL(total, 0) as follower'), db.raw('IFNULL (MA, 0) as following'),
		 db.raw('GROUP_CONCAT(DISTINCT skill_name) as skills') ])
		.from(TABLES.USERS + ' as u')
		.join(TABLES.USER_SKILLS + ' as s', 'u.id', 's.user_id')
		.join(TABLES.RANK + ' as r', 'u.id', 'r.user_id')
		.leftOuterJoin(follower, 'ssu.user_id', 'u.id')
		.leftOuterJoin(following, 'su.follow_user_id', 'u.id')
		.groupBy('u.id').as('sort')

const profileStuff = db(TABLES.USER_PROFILES)
			.select(['id', 'first_name', 'last_name', 'description',
					'location_city', 'location_state', 'location_country',
					'profile_picture', 'about', 'cover_picture_cards'])
			.where('description', '!=', 'NULL')
			.andWhere('profile_picture', '!=', 'NULL')
			.andWhere('fake', '=', '0')
 			.as('p')

// end helper

exports.updateUser = (info, cond) => {
	return db(TABLES.USERS).update(info).where(cond)
}

exports.getUserShare = (id) => {
	return db.select(['social_share'])
			.from(TABLES.USERS).where({'id': id});
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

exports.cardProfile = () => {
	let exp = db.select('user_id')
		.from(TABLES.USER_EXPERIENCES).as('e')

return db.select(['sort.*', 'p.*'])
			.from(TABLES.USERS + ' as u')
			.join(profileStuff, 'u.profile_id', 'p.id')
			.join(sortCardProfile, 'sort.id', 'u.id')
			.join(exp, 'e.user_id', 'sort.user_id')
			.groupBy('u.id')
			.orderByRaw('RAND()')
}

exports.cardProfileHome = (city, state, country) => {
	return db.select(['sort.*', 'p.*'])
			.from(sortCardProfile)
			.join(profileStuff
			.where('location_city', 'like','%' + city + '%')
			.orWhere('location_state', 'like', '%' + state + '%')
			.orWhere('location_country', 'like', '%' + country + '%')
			, 'p.id', 'sort.profile_id')
			.limit(4)
			.orderByRaw('RAND()')
}

exports.getUserByEmail = (email) => {
	// Really need everything ? Seem unsafe
	let sub = db.select('id', 'profile_id').from(TABLES.USERS).where('email', email).as('u')

	return db.select('p.id as profile_id', 'p.*', 'u.id as id')
			.from(sub)
			.join(TABLES.USER_PROFILES + ' as p', 'u.profile_id', 'p.id')
}

exports.getUserBy = (by) => {
    return db.select(['id', 'profile_id', 'password']).from(TABLES.USERS).where(by);
};

exports.getUserByUsername = (username) => {
	// Really need everything ? Seem unsafe
	let sub = db.select('*').from(TABLES.USERS).where('username', username).as('u')

	return db.select('u.*', 'p.*') // 
			.from(sub)
			.join(TABLES.USER_PROFILES + ' as p', 'u.profile_id', 'p.id')
			.limit(1)
}

exports.updateProfileView = (username) => {
	let sub = db.select('id', 'profile_id').from(TABLES.USERS).where('username', username).as('u')

	return db.update({'views': db.raw('views + 1')}, ['id'])
			.from(TABLES.USER_PROFILES + ' as p')
			.join(sub, 'u.profile_id', 'p.id')
}

exports.searchUser = (search) => {
	//Really need everything from profile?
	let sub = db.select('*').from(TABLES.USER_PROFILES)
				.where('first_name', 'like', '%' + search +'%')
				.orWhere('last_name', 'like', '%' + search +'%')
				.as('p')

	return db.select('p.*', 'u.id', 'u.profile_id')
			.from(TABLES.USERS + ' as u')
			.join(sub, 'p.id', 'u.profile_id')
}
//Create user stuff
exports.getUserByEmail = (email) => {
	return db.select('id').from(TABLES.USERS)
		.where('email', email)
}

exports.createProfile = (first, last) => {
	return db(TABLES.USER_PROFILES)
			.insert({'first_name' : first, 'last_name': last})
}

exports.checkUsername = (username) => {
	return db(TABLES.USERS)
			.select('username')
			.whereIn('username', username)
}
exports.createUser = (profile_id, email, username, password) => {
	return db(TABLES.USERS)
		.insert({
		'profile_id': profile_id,
		'email': email,
		'username': username,
		'password': password
	})
}

exports.updateProfile = (info, id) => {
	return db(TABLES.USER_PROFILES)
			.update(info)
			.where('id', id)
}

exports.updateProfileFromUser = (info, id) => {
	return db(TABLES.USER_PROFILES)
			.update(info)
			join(TABLES.USERS, 'users.profile_id', 'profiles.id')
			.where('users.id', id)
}

exports.updateInvitation = (email) => {
	return db(TABLES.INVITATION)
			.update({'status': 'registered'})
			.where('invite_email', email)
			.andWhere('status', 'pending')
}

// Update profile stuff


exports.getFromUser = (need, info) => {
	return db(TABLES.USERS)
	.select(need)
	.where(info)
}
//===****==
