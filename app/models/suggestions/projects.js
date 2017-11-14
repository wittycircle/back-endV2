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

const profileToProject = {
  'to meet smart people': ['for help', 'for feedback', 'for a cofounder'],
  'for a full time position': ['for feedback', 'to hire someone'],
  'for an internship': ['for feedback', 'to hire an intern'],
  'for part time collaboration': ['for help', 'for feedback', 'to hire someone'],
  "to share what I'm working on": ['for feedback']
};

const getMatchingProjects = (neededSkills, about, alreadySugested = []) => {
  let query = db
    .distinct(
      'p.id',
      'p.title',
      'p.status as project_status',
      'p.user_id as creatorId',
      'p.picture',
      'p.public_id',
      'p.description as projectDescription',
      'o.status as need_status',
      'loc.city',
      'loc.state',
      'loc.country',
      db.raw('GROUP_CONCAT(DISTINCT ot.skill_id) as skillId'),
      db.raw('GROUP_CONCAT(DISTINCT s.name) as skillName'),
      'o.description as openingDescription'
    )
    .from(TABLES.PROJECTS + ' as p')
    .join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'p.id')
    .join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
    .join(TABLES.SKILLS + ' as s', 's.id', 'ot.skill_id')
    .join(TABLES.LOCATION + ' as loc', 'loc.id', 'p.loc_id')
    .whereIn('ot.skill_id', neededSkills)
    .whereIn('o.status', profileToProject[about])
    .whereNotIn('p.id', alreadySugested)
    .orderBy('p.id', 'desc')
    .orderBy('o.creation_date', 'desc')
    .groupBy('p.id');

  return query;
};

module.exports.matchProjectsToProfile = (userId) => {
  const userAbout = db(TABLES.PROFILES)
    .select('about')
    .where('user_id', userId);

  return Promise.all([
    userAbout,
    sh.skillsFromUserId(userId),
    alreadySuggestedProjects(userId)
  ]).then(([about, neededSkills, alreadySugested]) => {
    return getMatchingProjects(neededSkills, about[0].about, alreadySugested).then(r => {
      if (!r.length || r.length < 3) {
        return sh.expandedSkills(neededSkills).then(expandedNeeds => {
          return getMatchingProjects(expandedNeeds, about[0].about, alreadySugested);
        });
      } else {
        return r;
      }
    });
  });
};
