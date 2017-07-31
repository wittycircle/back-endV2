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

const getMatchingProfiles = (neededSkills, alreadySugested = []) => {
  let query = db
    .distinct('p.*', 'us.skill_id as skillId', 's.name as skillName')
    .from(h.spe_profile({}))
    .join(TABLES.USER_SKILLS + ' as us', 'us.user_id', 'p.uid')
    .join(TABLES.SKILLS + ' as s', 's.id', 'us.skill_id')
    .whereIn('skill_id', neededSkills)
    .whereNotIn('p.user_id', alreadySugested);

  return query;
};

// module.exports.getMatchingProjects = getMatchingProjects;

module.exports.matchProfilesToProject = projectId => {
  return Promise.all([
    sh.skillsFromProjectId(projectId),
    alreadySuggestedProfiles(projectId)
  ]).then(r => {
    let neededSkills = r[0].skillId.split(',');
    let alreadySugested = r[1];
    return getMatchingProfiles(neededSkills, alreadySugested).then(r => {
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
