const { db, TABLES } = require('./index');


// | id                       | int(11)      | NO   | PRI | NULL              | auto_increment |
// | user_id                  | int(11)      | NO   | MUL | NULL              |                |
// | follow_project_id        | int(11)      | NO   | MUL | NULL              |                |
// | creation_date            | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
 // .select(db.raw('GROUP_CONCAT(DISTINCT u2.username) as who'))
 //        .count('u.username as count')

const sub_profile = db(TABLES.USER_PROFILES)
					.select(['id', 'first_name',
						'last_name', 'profile_picture',
						'cover_picture', 'about', 'description'])
					// .groupBy('id')
					.as('sp')

exports.getProjectLikes = (project_id) => {
	let sub_user = db(TABLES.USERS).select(['id', 'profile_id']).as('su')

	// return db.select(db.raw('GROUP_CONCAT(CONCAT(sp.id, ",SEP,", sp.first_name, ",SEP,", sp.last_name) separator ";N_O;") as who'))
	return db.select('sp.*')
		.count('pl.user_id as count')
		.from(TABLES.PROJECT_LIKES + ' as pl')
		.join(TABLES.PROJECTS + ' as pj', 'pj.id', 'pl.follow_project_id')
		.join(sub_user, 'su.id', 'pl.user_id')
		.leftJoin(sub_profile, 'sp.id', 'su.profile_id')
		.where({'pj.public_id': project_id})
		// .groupBy('sp.id')
}

exports.likeProject = (uid, project_id) => {
	return db(TABLES.PROJECT_LIKES)
			.insert({user_id: uid, follow_project_id: project_id})
}

exports.getFromProjectNetwork = (need, cond) => {
	return db(TABLES.PROJECT_NETWORK)
		.select(need)
		.where(cond)
}

exports.updateProjectNetwork = (info, cond) => {
	return db(TABLES.PROJECT_NETWORK)
		.update(info)
		.where(cond)
}

