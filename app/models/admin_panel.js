const { db, TABLES } = require('./index'),
	_ = require('lodash'),
	h = require('./helper'),
	user = require('./users'),
	projects = require('./projects'),
	profiles = require('./profiles');


exports.projectsInvite = uid => {
	return h.admin(TABLES.USERS, uid, uid).then(r => {
		if (!r.length) throw 'Admin only';
		let sent = db.raw('IF (pi.accepted IS NOT NULL, true, false) as sent');
		return db(TABLES.PROJECTS + ' as p')
			.select([
				'p.id',
				'user_id',
				'username as creator',
				'title',
				h.format_location,
				'picture',
				'description',
				'picture',
				'public_id',
				sent
			])
			.join(TABLES.USERS + ' as u', 'u.id', 'p.user_id')
			.leftJoin(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
			.leftJoin(TABLES.PROJECT_INVITE + ' as pi', 'pi.project_id', 'p.id')
			.where('u.moderator', 1)
			.whereIn('u.id', [1, 9])
			.whereRaw('title <> "wittycircle"');
	});
};

exports.inviteProjects = (uid, project_id, token) => {
	return h.admin(TABLES.PROJECTS, project_id, uid).then(([r, r1]) => {
		if (!r.length || !r1.length)
			throw !r.length ? 'Bad project id' : 'Not an admin';
		return db(TABLES.PROJECT_INVITE).insert({ project_id, token });
	});
};

exports.updateCreator = (uid, token) => {
	return db(TABLES.PROJECT_INVITE)
		.first('project_id')
		.where('token', token)
		.then(r => {
			if (!r) throw 'Invalid token';
			return Promise.all([
				db(TABLES.PROJECTS).update('user_id', uid).where('id', r.project_id),
				db(TABLES.PROJECT_INVITE).update('accepted', 1).where('token', token)
			]);
		});
};

// *** University Campaign ***
exports.getAmbassadors = () => {
	return db.select(
			'u.id',
			'p.picture',
			h.fullname)
		.from(TABLES.USERS + ' as u')
		.join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
		.where('u.ambassador', 1)
		.then(r => {
			return r;
		})
};

exports.setAmbassador = (uid) => {
	return db(TABLES.USERS)
		.where('id', uid)
		.update('ambassador', 1)
};

exports.removeAmbassador = (uid) => {
	return db(TABLES.USERS)
		.where('id', uid)
		.update('ambassador', 0)
};

// *** Statistics ***
exports.getProjects = () => {
	return db.select(
			'title',
			'public_id',
			'creation_date')
		.from(TABLES.PROJECTS)
		.orderBy('creation_date', 'desc')
		.then(r => { return r })
};

exports.getUsers = () => {
	return db.select(
			'p.first_name',
			'p.last_name',
			'u.username',
			'u.creation_date'
		)
		.from(TABLES.USERS + ' as u')
		.join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
		.whereRaw('u.creation_date BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE()')
		.orderBy('u.creation_date', 'desc')
		.then(r => {
			return r 
		});
};


//PROJECTS && PROFILES ADDED BY ADMIN

/* Type = ['new_projects', 'hand_picked_projects', 'featured_projects', 'top_ranked_people', 'great_people', 'suggest_people'] */
exports.getPPAddByAdmin = (type) => {
	const types = ['new_projects', 'recently_projects', 'featured_projects', 'top_ranked_people', 'great_people'];

	return db(TABLES.SELECT_PP)
			.select('id', 'user_id', 'public_id')
			.where('type', type)
			.then(r => {
				if (types.indexOf(type) < 3 && types.indexOf(type) > -1) {
					r = r.map(el => { return el.public_id; });

					return projects.getProject(r)
				} else if (types.indexOf(type) >= 3) {
					r = r.map(el => { return el.user_id });

					return profiles.getProfilesBy(r)
				}
			});
};

exports.addPPByAdmin = (data, username) => {
	return user.fromUsername(username)
			.then(r => {
				if (r) {
					data.user_id 	= r.id;
					data.public_id 	= null;
				}

				return db.batchInsert(TABLES.SELECT_PP, [data])
					.then(r => r);
			});
};

exports.removePPAddByAdmin = (data, username) => {
	return 	user.fromUsername(username)
			.then(r => {
				if (r) {
					data.user_id	= r.id;
					data.public_id	= null;
				}  
				return db(TABLES.SELECT_PP)
					.where('user_id', data.user_id)
					.andWhere('public_id', data.public_id)
					.andWhere('type', data.type)
					.del();
			});
};









