const { db, TABLES } = require('../index'),
  h = require('../helper'),
  sh = require('./side_help');

const alreadySuggestedProjects = (module.exports.alreadySuggestedProjects = userId => {
  return db(TABLES.SUG_PROJECTS)
    .select('project_id')
    .where('user_id', userId)
    .map(e => e.project_id);
});

module.exports.suggestProjects = (userId, projects) => {
  let o = projects.map(e => ({ project_id: e, user_id: userId }));
  return db(TABLES.SUG_PROJECTS).insert(o);
};

const getMatchingProjects = (neededSkills, alreadySugested = []) => {
  console.log('AKEL');
  let query = db
    .select(
      'p.id',
      'p.title',
      'p.description as projectDescription',
      'ot.skill_id',
      'o.description as openingDescription'
    )
    .from(TABLES.PROJECTS + ' as p')
    .join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'p.id')
    .join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
    .whereIn('ot.skill_id', neededSkills)
    .whereNotIn('p.id', alreadySugested)
    .orderByRaw('LENGTH(o.description) desc');

  return query;
};

// module.exports.getMatchingProjects = getMatchingProjects;

module.exports.matchProjectsToProfile = userId => {
  return Promise.all([
    sh.skillsFromUserId(userId),
    alreadySuggestedProjects(userId)
  ]).then(([neededSkills, alreadySugested]) => {
    if (!neededSkills.length) {
      throw 'User has no registered skills';
    }
    return getMatchingProjects(neededSkills, alreadySugested).then(r => {
      if (!r.length || r.length < 3) {
        return sh.expandedSkills(neededSkills).then(expandedNeeds => {
          return getMatchingProjects(expandedNeeds, alreadySugested);
        });
      } else {
        return r;
      }
    });
  });
};
