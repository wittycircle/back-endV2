const { db, TABLES } = require('./index'),
	_ = require('lodash'),
	h = require('./helper');

exports.networkAllProfiles = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return Promise.all([np(name), nps(name), nl(name), ni(name)]).then(r => {
			return {
				profiles: r[0],
				skills: r[1],
				location: r[2],
				interests: r[3]
			};
		});
	});
};

exports.networkAllProjects = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return Promise.all([
			npr(name),
			npra(name),
			nprn(name),
			nprf(name)
		]).then(r => {
			return {
				projects: r[0],
				about: r[1],
				needs: r[2],
				follow: r[3]
			};
		});
	});
};

//			*** Profiles ***

np = exports.networkProfiles = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db
			.select([
				'u.username',
				'p.picture',
				'p.id',
				db.raw('CONCAT (p.first_name, " ", p.last_name) as fullName')
			])
			.from(TABLES.USERS + ' as u')
			.join(TABLES.PROFILES + ' as p', 'p.user_id', 'u.id')
			.join(TABLES.NETWORKS_LIST + ' as l', 'l.id', 'p.network_id')
			.whereRaw(`l.name LIKE "%${name}%"`);
	});
};

nps = exports.networkProfileSkills = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db
			.distinct('s.name', 's.category')
			.countDistinct('p.uid as count')
			.from(h.sub_profile)
			.join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.uid')
			.join(TABLES.SKILLS + ' as s', 'us.skill_id', 's.id')
			.join(TABLES.NETWORKS_LIST + ' as l', 'l.id', 'p.network_id')
			.whereRaw(`l.name LIKE "%${name}%"`)
			.groupBy('s.name')
			.orderByRaw('count DESC');
	});
};

nl = exports.networkLocation = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db
			.distinct('loc.country')
			.countDistinct('p.id as count')
			.from(TABLES.PROFILES + ' as p')
			.join(TABLES.LOCATION + ' as loc', 'p.loc_id', 'loc.id')
			.join(TABLES.NETWORKS_LIST + ' as l', 'l.id', 'p.network_id')
			.whereRaw(`l.name LIKE "%${name}%"`)
			.whereRaw('loc.country IS NOT NULL AND loc.country <> ""')
			.orderByRaw('count DESC')
			.groupBy('loc.country');
	});
};

ni = exports.networkInterests = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db
			.distinct('c.name')
			.from(h.sub_profile)
			.countDistinct('p.id as count')
			.join(TABLES.PROJECT_LIKES + ' as pl', 'p.uid', 'pl.user_id')
			.join(TABLES.PROJECTS + ' as pr', 'pr.id', 'pl.project_id')
			.join(TABLES.CATEGORIES + ' as c', 'pr.category_id', 'c.id')
			.join(TABLES.NETWORKS_LIST + ' as l', 'l.id', 'p.network_id')
			.whereRaw(`l.name LIKE "%${name}%"`)
			.orderByRaw('count DESC')
			.groupBy('c.name');
	});
};

//			*** Projects ***
npr = exports.networkProjects = name => {
	let test = db(TABLES.NETWORKS_INFO + ' as f')
		.join(TABLES.LOCATION + ' as loc', 'loc.id', 'f.loc_id')
		.join(TABLES.NETWORKS_LIST + ' as n', 'f.network_id', 'n.id')
		.distinct('loc.city', 'loc.state', 'loc.country', 'f.*', 'n.name')
		.where('n.name', name);

	console.log('TEST', test.toString());
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db(TABLES.PROJECTS + ' as pr')
			.countDistinct('pr.id as projects_count')
			.join(h.sub_profile, 'p.uid', 'pr.user_id')
			.join(TABLES.NETWORKS_LIST + ' as l', 'l.id', 'p.network_id')
			.whereRaw(`l.name LIKE "%${name}%"`)
			.then(r => {
				return test.then(rr => {
					r[0].network_data = rr;
					return r;
				});
			});
	});
};

npra = exports.networkProjectAbout = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db
			.distinct('c.name as category')
			.countDistinct('p.id as count')
			.from(TABLES.PROJECTS + ' as pr')
			.join(h.sub_profile, 'pr.user_id', 'p.uid')
			.join(TABLES.CATEGORIES + ' as c', 'c.id', 'pr.category_id')
			.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
			.whereRaw(`nl.name LIKE "%${name}%"`)
			.groupBy('c.name')
			.orderByRaw('count DESC');
	});
};

// could be useful?
// let generic_q = () =>
//   db(TABLES.PROJECTS + ' as pr')
//     .join(h.sub_profile, 'pr.user_id', 'p.uid')
//     .join(TABLES.NETWORKS_LIST + ' as l', 'l.id', 'p.network_id')
//     .whereRaw(`l.name LIKE "%${name}%"`);

nprn = exports.networkProjectNeeds = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db
			.distinct('s.name')
			.countDistinct('p.id as count')
			.from(TABLES.PROJECTS + ' as pr')
			.join(h.sub_profile, 'pr.user_id', 'p.uid')
			.join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'pr.id')
			.join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
			.join(TABLES.SKILLS + ' as s', 's.id', 'ot.skill_id')
			.join(TABLES.NETWORKS_LIST + ' as l', 'l.id', 'p.network_id')
			.whereRaw(`l.name LIKE "%${name}%"`)
			.groupBy('s.name')
			.orderByRaw('count DESC');
	});
};

nprf = exports.networkProjectFollow = name => {
	return h.exist(TABLES.NETWORKS_LIST, name, 'name').then(r => {
		if (!r.length) return 'error';
		return db
			.distinct('pr.title')
			.countDistinct('l.user_id as count')
			.from(TABLES.PROJECTS + ' as pr')
			.join(h.sub_profile, 'pr.user_id', 'p.uid')
			.join(TABLES.PROJECT_LIKES + ' as l', 'l.project_id', 'pr.id')
			.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
			.whereRaw(`nl.name LIKE "%${name}%"`)
			.groupBy('pr.id')
			.orderByRaw('count DESC');
	});
};

// ------------------ Profiles statistics ------------------

const subInfoProfiles = id => {
	let name = n => db.raw(`CONCAT("${n}") as field`);

	let rank = db
		.distinct('rank as value', name('rank'))
		.where('user_id', id)
		.from(TABLES.RANK),
		started_projects = db
			.countDistinct('id')
			.distinct(name('started_projects'))
			.where('user_id', id)
			.from(TABLES.PROJECTS),
		invitation = db
			.countDistinct('id')
			.distinct(name('invitation'))
			.where('user_id', id)
			.where('status', 1)
			.from(TABLES.INVITATION),
		project_feedback = db
			.countDistinct('id')
			.distinct(name('project_feedback'))
			.where('user_id', id)
			.from(TABLES.DISCUSSION_MESSAGES),
		project_contrib = db
			.countDistinct('id')
			.distinct(name('project_contribution'))
			.where('user_id', id)
			.from(TABLES.PROJECT_MEMBERS),
		following = db
			.countDistinct('id')
			.distinct(name('following'))
			.where('user_id', id)
			.from(TABLES.USER_FOLLOWERS),
		follower = db
			.countDistinct('id')
			.distinct(name('followers'))
			.where('followed', id)
			.from(TABLES.USER_FOLLOWERS),
		upvoted_project = db
			.countDistinct('id')
			.distinct(name('upvoted_projects'))
			.where('user_id', id)
			.from(TABLES.PROJECT_LIKES),
		views = db
			.countDistinct('id')
			.distinct(name('views'))
			.where('viewed', id)
			.from(TABLES.VIEWS),
		messages = db(TABLES.MESSAGES + ' as m')
			.join(TABLES.ROOM_MEMBERS + ' as rm', 'rm.room_id', 'm.room_id')
			.where('rm.user_id', id)
			.andWhere('m.user_id', '<>', id)
			.countDistinct('m.message')
			.distinct(name('messages'));

	let test = [
		started_projects,
		invitation,
		project_feedback,
		project_contrib,
		following,
		follower,
		upvoted_project,
		views,
		messages
	];

	return rank.union(test);
};

exports.infoProfiles = id => {
	return db(TABLES.PROFILES)
		.first('user_id')
		.where('id', id)
		.then(r => subInfoProfiles(id));
};

exports.getAllStatsAnalytic = () => {

	const count 		= db.raw('count(*) as number'),
		date 			= db.raw('DATE(creation_date) as date'),
		month 			= db.raw('MONTH(creation_date) as month'),
		interval4month 	= 'DATE(creation_date) >= curdate() - INTERVAL 4 MONTH GROUP BY MONTH(creation_date)',
		interval7day 	= 'DATE(creation_date) >= curdate() - INTERVAL 7 DAY GROUP BY DATE(creation_date)';

	// Users 
	const countUsers = db('users')
		.count('* as users'),

		countUsersByMonth = db('users')
		.select(
			month,
			count)
		.whereRaw(interval4month),
		
		countUsersByDay = db('users') // Last 7 days;
		.select(
			date,
			count)
		.whereRaw(interval7day),

		countUsersByAbout = db('profiles')
		.select(
			'about',
			date,
			count)
		.whereRaw(interval7day + ', about'),

	// Projects
		countProjects = db('projects')
			.count('* as projects'),

		countProjectsByMonth = db('projects')
		.select(
			month,
			count)
		.whereRaw(interval4month),

		countProjectsByDay = db('projects') // Last 7 days;
		.select(
			date,
			count)
		.whereRaw(interval7day),
	
		countProjectsByStatus = db('projects')
		.select(
			'status',
			date,
			count)
		.whereRaw(interval7day + ', status'),

		countProjectsWithNeed = db
			.select(db.raw('count(distinct(p.title)) as number'))
			.from('openings as o')
			.leftJoin('projects as p', 'p.id', 'o.project_id'),

	// Needs
		countNeeds = db('openings')
			.count('* as needs'),

		countNeedByStatus = db('openings')
			.select(
				'status',
				date,
				count)
			.whereRaw(interval7day + ', status'),
	
	// Messages
		countMessages = db('messages')
			.count('* as messages'),

		countConversations = db('rooms')
			.count('* as rooms'),

		countMessagesByDay = db('messages')
			.select(
				date,
				count)
			.whereRaw(interval7day),

		countMessagesByMonth = db('messages')
			.select(
				date,
				count)
			.whereRaw(interval4month),

		countConversationsByDay = db('rooms')
			.select(
				date,
				count)
			.whereRaw(interval7day),

		countConversationsByMonth = db('rooms')
			.select(
				date,
				count)
			.whereRaw(interval4month);	

	return Promise.all([
		// USERS
		countUsers,
		countUsersByMonth,
		countUsersByDay,
		countUsersByAbout,

		// PROJECTS
		countProjects,
		countProjectsByMonth,
		countProjectsByDay,
		countProjectsByStatus,
		countProjectsWithNeed,

		// NEEDS
		countNeeds,
		countNeedByStatus,

		// MESSAGES
		countMessages,
		countConversations,
		countMessagesByDay,
		countMessagesByMonth,
		countConversationsByDay,
		countConversationsByMonth
	]).then(r => {
		let object = {
			users 		: {
				allTime 	: r[0],
				lastMonth 	: r[1],
				lastDay 	: r[2],
				byAbout 	: r[3]
			},

			projects 	: {
				allTime 	: r[4],
				lastMonth 	: r[5],
				lastDay 	: r[6],
				byStatus 	: r[7],
				withNeed 	: r[8]
			},

			needs 		: {
				allTime 	: r[9],
				byStatus 	: r[10]
			},

			messages 	: {
				allTimeM 	: r[11],
				allTimeC 	: r[12],
				byDayM 		: r[13],
				byMonthM 	: r[14],
				byDayC 		: r[15],
				byMonthC 	: r[16]
			}
		};

		return object; 
	});
};


