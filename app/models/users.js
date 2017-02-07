const { db, TABLES } = require('./index');

//Create user stuff
exports.getUserSkills = (id) => {
	return db.select(['skill_id as id', 'name', 'category'])
		.from(TABLES.SKILLS + ' as s')
		.join(TABLES.USER_SKILLS +  ' as us', 'us.skill_id', 's.id')
		.where({user_id: id})
		.groupBy('us.skill_id')
};

exports.addUserSkill = (id, uid) => {
	return db(TABLES.SKILLS).select('id').where('id', id).then(r => {
		if (r && r.length) {
			console.log(r)
			return db(TABLES.USER_SKILLS) 
				.insert({user_id: uid, skill_id: id })
				.then(() => exports.getUserSkills(uid))
		}
	})
};

exports.removeUserSkill = (id, uid) => {
	return db(TABLES.SKILLS).select('id').where('id', id).then(r => {
		if (r && r.length) {
			console.log(r)
			return db(TABLES.USER_SKILLS) 
				.del()
				.where({'user_id': uid, 'skill_id': id})
				.then(() => exports.getUserSkills(uid))
		}
	})
};

exports.getUserBy = (by) => {
    return db.select(['id', 'profile_id', 'password']).from(TABLES.USERS).where(by);
};

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
