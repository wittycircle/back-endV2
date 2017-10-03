const { db, TABLES } = require('../index'),
h = require('../helper'),
sh = require('./side_help');

const alreadySuggestedProfiles = projectId => {
	return db(TABLES.SUG_PROFILES)
	.select('user_id')
	.where('project_id', projectId)
	.map(e => e.user_id);
};

module.exports.suggestProfiles = (projectId, profiles) => {
	let o = profiles.map(e => ({ user_id: e, project_id: projectId }));
	return db(TABLES.SUG_PROFILES).insert(o);
};

const getMatchingProfiles = (neededSkills, alreadySugested, projectLocation = []) => {

	alreadySugested[alreadySugested.length] = projectLocation[0].puid;

	const user_skills = db
	.select(
		'us.user_id as usid',
		db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`))
	.from((TABLES.USER_SKILLS) + ' as us')
	.leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
	.groupBy('us.user_id')
	.as('usk')

	let query = db
	.distinct(
		'p.*',
		'nl.name as network',
		'usk.skills',
		h.format_location
// db.raw('GROUP_CONCAT(distinct us.skill_id) as skillId'),
// db.raw('GROUP_CONCAT(DISTINCT s.name) as skillName')
	)
	.from(h.spe_profile({}))
	.join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.uid')
	.join(TABLES.SKILLS + ' as s', 's.id', 'us.skill_id')
	.join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
	.join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
	.leftJoin(user_skills, 'usk.usid', 'p.uid')
	.whereIn('skill_id', neededSkills)
	.whereNotIn('p.uid', alreadySugested)
	.groupBy('p.id')
	.orderByRaw(`field(loc.city, '${projectLocation[0].city}') desc, 
		field(loc.state, '${projectLocation[0].state}') desc,
		field(loc.country, '${projectLocation[0].country}') desc`);

	return query;
};

// module.exports.getMatchingProjects = getMatchingProjects;

const matchProfilesToProject = (module.exports.matchProfilesToProject) = projectId => {

	return Promise.all([
		sh.skillsFromProjectId(projectId),
		sh.locationFromProjectId(projectId),
		alreadySuggestedProfiles(projectId),
		]).then(r => {
			let neededSkills 	= r[0].skillId.split(',');
			let projectLocation = r[1];
			let alreadySugested = r[2];

			return getMatchingProfiles(neededSkills, alreadySugested, projectLocation).then(r => {
				if (!r.length || r.length < 5) {
					return sh.expandedSkills(neededSkills).then(expandedNeeds => {
						return getMatchingProfiles(expandedNeeds, alreadySugested);
					});
				} else {
					return r;
				}
			});
		});
	};

// matchProfilesToProject(3);
