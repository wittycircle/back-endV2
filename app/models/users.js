const { db, TABLES } = require('./index');

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
