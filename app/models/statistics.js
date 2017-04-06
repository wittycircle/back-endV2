const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');

exports.networkAllProfiles = (name) => {
	return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return Promise.all([np(name), nps(name), nl(name), ni(name)])
			.then(r => {
				return {
					profiles: r[0], 
					skills: r[1], 
					location: r[2], 
					interests: r[3]
				}
			  });
	})
};

exports.networkAllProjects = (name) => {
	return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return Promise.all([npr(name), npra(name), nprn(name), nprf(name)])
			.then(r => {
				return {
					projects: r[0], 
					about: r[1], 
					needs: r[2], 
					follow: r[3]
				}
			  });
	})
};

//			*** Profiles ***


np = exports.networkProfiles = (name) => {
	return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db.select(['u.username','p.profile_picture', 'p.id',
						db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName')])
				.from(TABLES.USERS + ' as u')
				.join(TABLES.USER_PROFILES + ' as p', 'p.id', 'u.profile_id')
				.whereRaw(`p.network LIKE "%${name}%"`)
	})
};

nps = exports.networkProfileSkills = (name) => {
	return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db.distinct('s.name', 's.category')
				.countDistinct('p.uid as count')
				.from(h.sub_profile)
				.join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.uid')
				.join(TABLES.SKILLS + ' as s', 'us.skill_id', 's.id')
				.whereRaw(`p.network LIKE "%${name}%"`)
				.groupBy('s.name')
				.orderByRaw('count DESC')
	})
};

nl = exports.networkLocation = (name) => {
	return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db.distinct('p.country')
				.countDistinct('p.id as count')
				.from(TABLES.USER_PROFILES + ' as p')
				.whereRaw(`p.network LIKE "%${name}%"`)
				.whereRaw('p.country IS NOT NULL AND p.country <> ""')
				.orderByRaw('count DESC')
				.groupBy('p.country')
	})
};

ni = exports.networkInterests = (name) => {
		return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db.distinct('c.name')
			.from(h.sub_profile)
			.countDistinct('p.id as count')
			.join(TABLES.PROJECT_LIKES + ' as pl', 'p.uid', 'pl.user_id')
			.join(TABLES.PROJECTS + ' as pr', 'pr.id', 'pl.project_id')
			.join(TABLES.CATEGORIES + ' as c', 'pr.category_id', 'c.id')
			.whereRaw(`p.network LIKE "%${name}%"`)
			.orderByRaw('count DESC')
			.groupBy('c.name')

	})
};

//			*** Projects ***
npr = exports.networkProjects = (name) => {
	let test = db(TABLES.NETWORKS_GROUP).select('*')
				.where('title', name)

	return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db(TABLES.PROJECTS + ' as pr')
				.count('pr.id as projects_count')
				.join(h.sub_profile, 'p.uid', 'pr.user_id')
				.whereRaw(`p.network LIKE "%${name}%"`)
				.then(r => {
					return test.then(rr => {
						r[0].network_data = rr
						return r
					})
				})
	})
};

npra = exports.networkProjectAbout = (name) => {
	return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db.distinct('c.name as category')
				.countDistinct('p.id as count')
				.from(TABLES.PROJECTS + ' as pr')
				.join(h.sub_profile, 'pr.user_id', 'p.uid')
				.join(TABLES.CATEGORIES + ' as c', 'c.id', 'pr.category_id')
				.whereRaw(`p.network LIKE "%${name}%"`)
				.groupBy('c.name')
				.orderByRaw('count DESC')
	})
};

nprn = exports.networkProjectNeeds = (name) => {
		return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db.distinct('ot.tag')
			.countDistinct('p.id as count')
			.from(TABLES.PROJECTS + ' as pr')
			.join(h.sub_profile, 'pr.user_id', 'p.uid')
			.join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'pr.id')
			.join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
			.whereRaw(`p.network LIKE "%${name}%"`)
			.groupBy('ot.tag')
			.orderByRaw('count DESC')
	})
};

nprf = exports.networkProjectFollow = (name) => {
		return h.exist(TABLES.USER_PROFILES, name, 'network').then(r => {
		if (!r.length)
			return "error"
		return db.distinct('pr.title')
				.countDistinct('l.user_id as count')
				.from(TABLES.PROJECTS + ' as pr')
				.join(h.sub_profile, 'pr.user_id', 'p.uid')
				.join(TABLES.PROJECT_LIKES + ' as l', 'l.project_id', 'pr.id')
				.whereRaw(`p.network LIKE "%${name}%"`)
				.groupBy('pr.id')
				.orderByRaw('count DESC')
		})
};


