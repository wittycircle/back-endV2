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

const realStatus = status => {
  const projectToProfile = {
    'for help': ['to meet smart people', 'for part time collaboration'],
    'for feedback': [
      'to meet smart people',
      'for part time collaboration',
      'for a full time position',
      "to share what I'm working on",
      'for an internship'
    ],
    'to hire someone': [
      'for a full time position',
      'for part time collaboration'
    ],
    'to hire an intern': ['for an internship'],
    'for a cofounder': ['to meet smart people']
  };
  let x = [];
  status.forEach(s => {
    if (s in projectToProfile) x = x.concat(projectToProfile[s]);
  });
  return x.filter((item, pos, self) => self.indexOf(item) == pos);
};

const getMatchingProfiles = (
  status,
  neededSkills,
  alreadySugested,
  projectLocation = []
) => {
  alreadySugested[alreadySugested.length] = projectLocation[0].puid;

  const user_skills = db
    .select(
      'us.user_id as usid',
      db.raw(`GROUP_CONCAT(DISTINCT sk.name) as skills`)
    )
    .from(TABLES.USER_SKILLS + ' as us')
    .leftJoin(TABLES.SKILLS + ' as sk', 'sk.id', 'us.skill_id')
    .groupBy('us.user_id')
    .as('usk');

  let query = db
    .distinct(
      'p.*',
      'nl.name as network',
      'usk.skills',
      h.format_location
      // db.raw('GROUP_CONCAT(distinct us.skill_id) as skillId'),
      // db.raw('GROUP_CONCAT(DISTINCT s.name) as skillName')
    )
    .from(h.crea_profile())
    .join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.uid')
    .join(TABLES.SKILLS + ' as s', 's.id', 'us.skill_id')
    .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
    .join(TABLES.NETWORKS_LIST + ' as nl', 'nl.id', 'p.network_id')
    .leftJoin(user_skills, 'usk.usid', 'p.uid')
    .whereIn('skill_id', neededSkills)
    .whereIn('p.about', status)
    .whereNotIn('p.uid', alreadySugested)
    .groupBy('p.id')
    .orderByRaw(
      `field(loc.city, '${projectLocation[0].city}') desc,
		field(loc.state, '${projectLocation[0].state}') desc,
		field(loc.country, '${projectLocation[0].country}') desc`
    )
    .orderBy('p.creation_date', 'desc');

  return query;
};

const matchProfilesToProject = (module.exports.matchProfilesToProject = projectId => {
  return Promise.all([
    sh.skillsFromProjectId(projectId),
    sh.locationFromProjectId(projectId),
    alreadySuggestedProfiles(projectId)
  ]).then(r => {
    const neededSkills = r[0].skillId.split(',');
    const status = realStatus(r[0].openingStatus.split(','));
    const projectLocation = r[1];
    const alreadySugested = r[2];

    return getMatchingProfiles(
      status,
      neededSkills,
      alreadySugested,
      projectLocation
    ).then(r => {
      if (!r.length || r.length < 5) {
        return sh.expandedSkills(neededSkills).then(expandedNeeds => {
          return getMatchingProfiles(status, expandedNeeds, alreadySugested);
        });
      } else {
        return r;
      }
    });
  });
});
